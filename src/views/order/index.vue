<template>
  <div class="order-container">
    <el-row type="flex" class="row-bg">
      <el-form :inline="true" :model="orderQueryForm" class="dialog-form">
        <el-form-item label="订单号">
          <el-input v-model="orderQueryForm.orderNo" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item label="回收站ID">
          <el-input v-model="orderQueryForm.shopId" placeholder="回收站ID"></el-input>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="orderQueryForm.userId" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="废品类型:">
          <el-select
            v-model="orderQueryForm.orderStatus"
            multiple
            collapse-tags
            placeholder="请选择">
            <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value=item.value>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitQueryOrder">查询订单</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-table
        :data="orders"
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
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="回收站编号"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shopId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单手机号"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.custPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="废品重量"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.garbageWeight + 'KG'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单金额"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount + '元'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="垃圾属性"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.garbageType}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="配送方式"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.delivery}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.orderStatus === 1" style="margin-left: 10px">已下单</span>
            <span v-if="scope.row.orderStatus === 2" style="margin-left: 10px">已接收</span>
            <span v-if="scope.row.orderStatus === 3" style="margin-left: 10px">取件中</span>
            <span v-if="scope.row.orderStatus === 4" style="margin-left: 10px">已收件</span>
            <span v-if="scope.row.orderStatus === 5" style="margin-left: 10px">已完成</span>
            <span v-if="scope.row.orderStatus === 6" style="margin-left: 10px">已取消</span>

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
          label="回收地址"
          width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.orderStatus === 1" @click="updateOrderClick(scope.row,2)" type="primary" size="small">接单</el-button>
            <el-button v-if="scope.row.orderStatus === 2" @click="updateOrderClick(scope.row,3)" type="primary" size="small">配送</el-button>
            <el-button v-if="scope.row.orderStatus === 3" @click="confirmOrder(scope.row)" type="primary" size="small">确认</el-button>
            <el-dialog
              title="新增垃圾"
              :visible.sync="confirmDialogVisible"
              width="20%"
              center>
              <el-form ref="form" :model="confirmFrom" label-width="80px">
                <el-form-item label="废品重量" class="dialog-form-item">
                  <el-input class="dialog-input" v-model="confirmFrom.garbageWeight"></el-input>
                </el-form-item>
                <el-form-item label="金额" class="dialog-form-item">
                  <el-input class="dialog-input" v-model="confirmFrom.amount"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
            <el-button @click="confirmDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmOrderSubmit()">确 定</el-button>
          </span>
            </el-dialog>
            <el-button v-if="scope.row.orderStatus === 4" @click="updateOrderClick(scope.row,5)" type="primary" size="small">完成</el-button>
            <el-button v-if="scope.row.orderStatus === 1" @click="updateOrderClick(scope.row,6)" type="primary" size="small">取消</el-button>
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
    import {getOrders, updateOrder} from '@/api/order'

    export default {
        data() {
            return {
                orderQueryForm: {
                    orderNo: "",
                    shopId: "",
                    userId: "",
                    orderStatus: 0
                },
                confirmDialogVisible: false,
                confirmFrom: {},
                statusOption: [
                    {
                        value: 1,
                        label: "已下单"
                    },
                    {
                        value: 2,
                        label: "已接收"
                    },
                    {
                        value: 3,
                        label: "取件中"
                    },
                    {
                        value: 4,
                        label: "已收件"
                    },
                    {
                        value: 5,
                        label: "已完成"
                    },
                    {
                        value: 6,
                        label: "已取消"
                    },
                ],
                orders: [],
                listLoading: true,
                totalPage: 0,
                currentPage: 1,
                pageSize: 10,
            }
        },
        created() {
            this.onSubmitQueryOrder()
        },
        methods: {
            confirmOrder(row){
                this.confirmDialogVisible = true
                this.confirmFrom = row
                this.confirmFrom.orderStatus = 4
            },
            confirmOrderSubmit(){
                updateOrder(this.confirmFrom).then(response => {
                    if (response.code === '000000') {
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.onSubmitQueryOrder();
                        this.confirmDialogVisible = false
                        this.confirmFrom = {}
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                })
            },
            updateOrderClick(row,status) {
                const req = row
                req.orderStatus = status
                updateOrder(req).then(response => {
                    if (response.code === '000000') {
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.onSubmitQueryOrder();
                        this.confirmDialogVisible = false
                        this.confirmFrom = {}
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                })
            },
            onSubmitQueryOrder() {
                this.listLoading = true
                const queryForm = {
                    orderNo: this.orderQueryForm.orderNo,
                    shopId: this.orderQueryForm.shopId,
                    userId: this.orderQueryForm.userId,
                    orderStatus: this.orderQueryForm.orderNo,
                    pageNum: 1,
                    pageSize: this.pageSize
                }
                getOrders(queryForm).then(response => {
                    if (response.code === '000000'){
                        this.orders = response.data.list
                        this.listLoading = false
                        this.totalPage = response.data.total
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                    this.orderQueryForm = {
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
  .order-container {
    padding: 0px;
    text-align: left;

    .dialog-form {
      position: relative;
      width: 100%;
      padding: 10px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      .dialog-form-item {
        width: 100%;
        text-align: center;
        padding: 20px 10px 0;
        margin: 0 auto;
      }

      .dialog-input {
        width: 500px;
      }
    }

    .edit-form {
      position: relative;
      width: 600px;
      padding: 10px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      .edit-form-item {
        width: 600px;
        text-align: center;
        padding: 20px 10px 0;
        margin: 0 auto;

        .dialog-input {
          width: 500px;
        }
      }

    }

  }
</style>
