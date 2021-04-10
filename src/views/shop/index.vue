<template>
  <div class="shop-container">
    <el-row type="flex" class="row-bg">
      <el-form :inline="true" :model="shopQueryForm" class="dialog-form">
        <el-form-item label="回收站名称">
          <el-input v-model="shopQueryForm.shopName" placeholder="垃圾名称"></el-input>
        </el-form-item>
        <el-form-item label="回收站ID">
          <el-input v-model="shopQueryForm.shopId" placeholder="垃圾分类"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitQueryShop">查询</el-button>
          <el-button type="primary" @click="gotoAddShop">新增</el-button>
          <el-dialog
            title="新增回收站"
            :visible.sync="addShopDialogVisible"d
            width="50%"
            fullscreen
            center>
            <el-form ref="form" :model="shopAddForm" label-width="100px">
              <el-form-item label="回收站名称" class="dialog-form-item">
                <el-input class="dialog-input" v-model="shopAddForm.shopName" wi></el-input>
              </el-form-item>
              <el-form-item label="联系电话" class="dialog-form-item">
                <el-input class="dialog-input" v-model="shopAddForm.shopPhone"></el-input>
              </el-form-item>
              <el-form-item label="回收站地址" class="dialog-form-item">
                <el-input rows="3" class="dialog-input" type="textarea" placeholder="请输入内容" :rows="2"
                          v-model="shopAddForm.shopAddress"></el-input>
              </el-form-item>
              <el-form-item label="回收站简介" class="dialog-form-item">
                <el-input rows="3" class="dialog-input" type="textarea" placeholder="请输入内容" :rows="2"
                          v-model="shopAddForm.shopIntroduce"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addShopDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addShopSubmit">确 定</el-button>
          </span>
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-table
        :data="shops"
        fit
        highlight-current-row
        align="center">
        <el-table-column
          label="回收站编码"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shopId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="回收站名称"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shopName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="联系电话"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shopPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分数"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shopScore }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="回收站地址"
          width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shopAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="回收站简介"
          width="380">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shopIntroduce }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="300">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-dialog
              title="编辑垃圾信息"
              :visible.sync="editShopDialogVisible"
              width="50%"
              fullscreen
              center>
              <el-form ref="form" :model="scope.row" label-width="80px">
                <el-form-item label="回收站名称" class="edit-form-item">
                  <el-input class="dialog-input" v-model="scope.row.shopName" wi></el-input>
                </el-form-item>
                <el-form-item label="联系电话" class="edit-form-item">
                  <el-input class="dialog-input" v-model="scope.row.shopPhone"></el-input>
                </el-form-item>
                <el-form-item label="地址" class="edit-form-item">
                  <el-input class="dialog-input" type="textarea" placeholder="请输入内容" :rows="3"
                            v-model="scope.row.shopAddress"></el-input>
                </el-form-item>
                <el-form-item label="简介" class="edit-form-item">
                  <el-input class="dialog-input" type="textarea" placeholder="请输入内容" :rows="3"
                            v-model="scope.row.shopIntroduce"></el-input>
                </el-form-item>

              </el-form>
              <span slot="footer" class="dialog-footer">
            <el-button @click="editShopDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editShopSubmit(scope.row)">确定</el-button>
          </span>
            </el-dialog>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
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
    import {getShops, addShop, updateShop,delShop} from '@/api/shop'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                shopQueryForm: {
                    shopName: "",
                    shopId: ""
                },
                shops: [],
                shopAddForm: {
                    shopName: "",
                    shopPhone: "",
                    shopAddress: "",
                    shopScore: 5,
                    shopIntroduce: ""
                },
                listLoading: true,
                totalPage: 0,
                currentPage: 1,
                pageSize: 10,
                addShopDialogVisible: false,
                editShopDialogVisible: false
            }
        },
        created() {
            this.onSubmitQueryShop()
        },
        methods: {
            addShopSubmit() {
                const addFrom = this.shopAddForm
                addShop(addFrom).then(response => {
                    if (response.code === '000000') {
                        this.addShopDialogVisible = false
                        this.$message({
                            message: "新增成功",
                            type: "success"
                        });
                        this.onSubmitQueryShop();
                        this.shopAddForm = {
                            shopId: "",
                            shopName: ""
                        };
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                })
            },
            editShopSubmit(row) {
                const editForm = {
                    id: row.id,
                    shopId: row.shopId,
                    shopName: row.shopName,
                    shopPhone: row.shopPhone,
                    shopScore: row.shopScore,
                    shopAddress: row.shopAddress,
                    shopIntroduce: row.shopIntroduce
                }
                updateShop(editForm).then(response => {
                    if (response.code === '000000') {
                        this.editShopDialogVisible = false
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.onSubmitQueryShop();
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                })
            },
            onSubmitQueryShop() {
                this.listLoading = true
                const queryForm = {
                    shopId: this.shopQueryForm.shopId,
                    ShopName: this.shopQueryForm.shopName,
                    pageNum: 1,
                    pageSize: this.pageSize
                }
                getShops(queryForm).then(response => {
                    if (response.code === '000000'){
                        this.shops = response.data.list
                        this.listLoading = false
                        this.totalPage = response.data.total
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                    this.shopQueryForm = {
                        shopId: "",
                        shopName: ""
                    }

                })
            },
            gotoAddShop() {
                this.addShopDialogVisible = true
            },
            handleEdit(index, row) {
                this.editShopDialogVisible = true
            },
            handleDelete(index, row) {
                const editForm = {
                    id: row.id
                }
                delShop(editForm).then(response => {
                    if (response.code === '000000') {
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.onSubmitQueryShop();
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                })

            },
            fetchData() {
                this.listLoading = true
                const queryForm = {
                    shopId: "",
                    shopName: "",
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                }
                getShops(queryForm).then(response => {
                    this.shops = response.data.list
                    this.listLoading = false
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
  .shop-container {
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
