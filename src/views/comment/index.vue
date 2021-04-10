
<template>
  <div class="comment-container">
    <el-row type="flex" class="row-bg">
      <el-form :inline="true" :model="commentQueryForm" class="dialog-form">
        <el-form-item label="订单号">
          <el-input v-model="commentQueryForm.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="回收站编号">
          <el-input v-model="commentQueryForm.shopId" placeholder="回收站编号"></el-input>
        </el-form-item>
        <el-form-item label="用户编号">
          <el-input v-model="commentQueryForm.userId" placeholder="用户编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitQueryComment">查询评论</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-table
        :data="commentlist"
        fit
        highlight-current-row
        align="center">
        <el-table-column
          label="订单号"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.orderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户编号"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="回收站编号"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shopId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="评分"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.socre}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="下单时间"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="评论信息"
          width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="200">
          <template slot-scope="scope">
            <el-button @click="handledel(scope.row)" type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalPage>
        </el-pagination>
      </div>
    </el-row>
  </div>

</template>

<script>
    import {getComments, delComment} from '@/api/comment'

    export default {
        data() {
            return {
                commentQueryForm: {
                    orderNo: "",
                    shopId: "",
                    userId: ""
                },
                commentlist: [],
                listLoading: true,
                totalPage: 0,
                currentPage: 1,
                pageSize: 10,
            }
        },
        created() {
            this.onSubmitQueryComment()
        },
        methods: {

            handledel(row) {
                const req = row
                delComment(req).then(response => {
                    if (response.code === '000000') {
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.onSubmitQueryComment();
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                })
            },
            onSubmitQueryComment() {
                this.listLoading = true
                const queryForm = {
                    orderNo: this.commentQueryForm.orderNo,
                    shopId: this.commentQueryForm.shopId,
                    userId: this.commentQueryForm.userId,
                    pageNum: 1,
                    pageSize: this.pageSize
                }
                getComments(queryForm).then(response => {
                    if (response.code === '000000'){
                        this.commentlist = response.data.list
                        this.listLoading = false
                        this.totalPage = response.data.total
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                    this.commentQueryForm = {
                        orderNo: "",
                        shopId: "",
                        userId: ""
                    }

                })
            },

            handleSizeChange(val) {
                this.pageSize = val
                this.onSubmitQueryGarbage();
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.onSubmitQueryGarbage();
            }
        }
    }
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .comment-container {
    padding: 0px;
    text-align: left;
  }
</style>
