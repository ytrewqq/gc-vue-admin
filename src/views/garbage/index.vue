<template>
  <div class="classify-container">
    <el-row type="flex" class="row-bg">
      <el-form :inline="true" :model="garbageQueryForm" class="dialog-form">
        <el-form-item label="垃圾名称">
          <el-input v-model="garbageQueryForm.garbageName" placeholder="垃圾名称"></el-input>
        </el-form-item>
        <el-form-item label="垃圾分类">
          <el-input v-model="garbageQueryForm.classification" placeholder="垃圾分类"></el-input>
        </el-form-item>
        <el-form-item label="处理方式">
          <el-input v-model="garbageQueryForm.disposalMethod" placeholder="处理方式"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitQueryGarbage">垃圾查询</el-button>
          <el-button type="primary" @click="gotoAddGarbage">新增垃圾</el-button>
          <el-dialog
            title="新增垃圾"
            :visible.sync="addGarbageDialogVisible"
            width="50%"
            fullscreen
            center>
            <el-form ref="form" :model="garbageAddForm" label-width="80px">
              <el-form-item label="垃圾名称" class="dialog-form-item">
                <el-input class="dialog-input" v-model="garbageAddForm.garbageName" wi></el-input>
              </el-form-item>
              <el-form-item label="垃圾分类" class="dialog-form-item">
                <el-input class="dialog-input" v-model="garbageAddForm.classification"></el-input>
              </el-form-item>
              <el-form-item label="处理方法" class="dialog-form-item">
                <el-input class="dialog-input" v-model="garbageAddForm.disposalMethod"></el-input>
              </el-form-item>
              <el-form-item label="垃圾描述" class="dialog-form-item">
                <el-input rows="3" class="dialog-input" type="textarea" placeholder="请输入内容" :rows="2"
                          v-model="garbageAddForm.garbageDesc"></el-input>
              </el-form-item>
              <el-form-item label="处理方法简述" class="dialog-form-item">
                <el-input rows="3" class="dialog-input" type="textarea" placeholder="请输入内容" :rows="2"
                          v-model="garbageAddForm.disposalDesc"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addGarbageDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGarbageSubmit">确 定</el-button>
          </span>
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-table
        :data="garbages"
        fit
        highlight-current-row
        align="center">
        <el-table-column
          label="垃圾名称"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.garbageName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="垃圾分类"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.classification }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处理方法"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.disposalMethod }}</span>
          </template>
        </el-table-column>
        <el-table-column
        label="垃圾描述"
        width="400">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.garbageDesc }}</span>
        </template>
      </el-table-column>
        <el-table-column
          label="处理方法描述"
          width="400">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.disposalDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-dialog
              title="编辑垃圾信息"
              :visible.sync="editGarbageDialogVisible"
              width="50%"
              fullscreen
              center>
              <el-form ref="form" :model="scope.row" label-width="80px">
                <el-form-item label="垃圾名称" class="edit-form-item">
                  <el-input class="dialog-input" v-model="scope.row.garbageName" wi></el-input>
                </el-form-item>
                <el-form-item label="垃圾分类" class="edit-form-item">
                  <el-input class="dialog-input" v-model="scope.row.classification"></el-input>
                </el-form-item>
                <el-form-item label="处理方法" class="edit-form-item">
                  <el-input class="dialog-input" v-model="scope.row.disposalMethod"></el-input>
                </el-form-item>
                <el-form-item label="垃圾描述" class="edit-form-item">
                  <el-input class="dialog-input" type="textarea" placeholder="请输入内容" :rows="3"
                            v-model="scope.row.garbageDesc"></el-input>
                </el-form-item>
                <el-form-item label="处理方法描述" class="edit-form-item">
                  <el-input class="dialog-input" type="textarea" placeholder="请输入内容" :rows="3"
                            v-model="scope.row.disposalDesc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
            <el-button @click="editGarbageDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editGarbageSubmit(scope.row)">确定</el-button>
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
    import {getGarbages, addGarbage, updateGarbage,delGarbage} from '@/api/garbageClassify'

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
                garbageQueryForm: {
                    garbageName: "",
                    classification: "",
                    disposalMethod: ""
                },
                garbages: [],
                garbageAddForm: {
                    garbageName: "",
                    classification: "",
                    disposalMethod: "",
                    garbageDesc: "",
                    disposalDesc: ""
                },
                listLoading: true,
                totalPage: 0,
                currentPage: 1,
                pageSize: 10,
                addGarbageDialogVisible: false,
                editGarbageDialogVisible: false
            }
        },
        created() {
            this.onSubmitQueryGarbage()
        },
        methods: {
            addGarbageSubmit() {
                const addGarbageFrom = this.garbageAddForm
                addGarbage(addGarbageFrom).then(response => {
                    if (response.code === '000000') {
                        this.addGarbageDialogVisible = false
                        this.$message({
                            message: "新增成功",
                            type: "success"
                        });
                        this.onSubmitQueryGarbage();
                        this.garbageAddForm = {
                            garbageName: "",
                            classification: "",
                            disposalMethod: ""
                        };
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                })
            },
            editGarbageSubmit(row) {
                const editForm = {
                    id: row.id,
                    garbageName: row.garbageName,
                    classification: row.classification,
                    disposalMethod: row.disposalMethod,
                    garbageDesc: row.garbageDesc,
                    disposaldesc: row.disposaldesc
                }
                updateGarbage(editForm).then(response => {
                    if (response.code === '000000') {
                        this.editGarbageDialogVisible = false
                        this.$message({
                            message: "保存成功",
                            type: "success"
                        });
                        this.onSubmitQueryGarbage();
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                })
            },
            onSubmitQueryGarbage() {
                this.listLoading = true
                const queryForm = {
                    garbageName: this.garbageQueryForm.garbageName,
                    classification: this.garbageQueryForm.classification,
                    disposalMethod: this.garbageQueryForm.disposalMethod,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                }
                getGarbages(queryForm).then(response => {
                    if (response.code === '000000'){
                        this.garbages = response.data.list
                        this.listLoading = false
                        this.totalPage = response.data.total
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                    this.garbageQueryForm = {
                        garbageName: "",
                        classification: "",
                        disposalMethond: ""
                    }

                })
            },
            gotoAddGarbage() {
                this.addGarbageDialogVisible = true
            },
            handleEdit(index, row) {
                this.editGarbageDialogVisible = true
            },
            handleDelete(index, row) {
                const editForm = {
                    id: row.id,
                    garbageName: row.garbageName,
                    classification: row.classification,
                }
                delGarbage(editForm).then(response => {
                    if (response.code === '000000') {
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.onSubmitQueryGarbage();
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
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
  .classify-container {
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
