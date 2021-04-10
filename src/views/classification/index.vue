<template>
  <div class="classify-container">
    <el-row type="flex" class="row-bg">
      <el-form :inline="true" :model="calssificationQueryForm" class="dialog-form">
        <el-form-item label="类别">
          <el-input v-model="calssificationQueryForm.classification" placeholder="类别"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="calssificationQueryForm.classificationCode" placeholder="编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitQueryClassify">查询分类</el-button>
          <el-button type="primary" @click="gotoAddCalssify">新增分类</el-button>
          <el-dialog
            title="新增垃圾分类字典"
            :visible.sync="addCalssifyDialogVisible"
            width="50%"
            fullscreen
            center>
            <el-form ref="form" :model="calssificationAddForm" label-width="80px">
              <el-form-item label="分类名称" class="dialog-form-item">
                <el-input class="dialog-input" v-model="calssificationAddForm.classification" wi></el-input>
              </el-form-item>
              <el-form-item label="分类编号" class="dialog-form-item">
                <el-input class="dialog-input" v-model="calssificationAddForm.classificationCode"></el-input>
              </el-form-item>
              <el-form-item label="分类描述" class="dialog-form-item">
                <el-input rows="3" class="dialog-input" type="textarea" placeholder="请输入内容" :rows="5"
                          v-model="calssificationAddForm.classificationDesc"></el-input>
              </el-form-item>
              <el-form-item label="投放规则" class="dialog-form-item">
                <el-input rows="3" class="dialog-input" type="textarea" placeholder="请输入内容" :rows="5"
                          v-model="calssificationAddForm.disposalDesc"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addCalssifyDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCalssificationSubmit">确 定</el-button>
          </span>
          </el-dialog>

        </el-form-item>
      </el-form>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-table
        :data="garbageCalssifications"
        fit
        highlight-current-row
        align="center">
        <el-table-column
          label="编码"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.classificationCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="类别"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.classification }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分类描述"
          width="500">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.classificationDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="投放规则"
          width="500">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.disposalDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-dialog
              title="编辑垃圾分类字典"
              :visible.sync="editCalssifyDialogVisible"
              width="50%"
              fullscreen
              center>
              <el-form ref="form" :model="scope.row" label-width="80px">
                <el-form-item label="分类名称" class="edit-form-item">
                  <el-input class="dialog-input" v-model="scope.row.classification" wi></el-input>
                </el-form-item>
                <el-form-item label="分类编号" class="edit-form-item">
                  <el-input class="dialog-input" v-model="scope.row.classificationCode"></el-input>
                </el-form-item>
                <el-form-item label="分类描述" class="edit-form-item">
                  <el-input rows=3 class="dialog-input" type="textarea" placeholder="请输入内容" :rows="2"
                            v-model="scope.row.classificationDesc"></el-input>
                </el-form-item>
                <el-form-item label="投放规则" class="edit-form-item">
                  <el-input rows=3 class="dialog-input" type="textarea" placeholder="请输入内容" :rows="2"
                            v-model="scope.row.disposalDesc"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
            <el-button @click="editCalssifyDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editCalssificationSubmit(scope.row)">确 定</el-button>
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
    import {getClassificatios, addCalssification, updateCalssification,delCalssification} from '@/api/garbageClassify'

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
                calssificationQueryForm: {
                    classification: "",
                    classificationCode: ""
                },
                garbageCalssifications: [],
                calssificationAddForm: {
                    classification: "",
                    classificationCode: "",
                    classificationDesc: "",
                    disposalDesc:""
                },
                listLoading: true,
                totalPage: 0,
                currentPage: 1,
                pageSize: 10,
                addCalssifyDialogVisible: false,
                editCalssifyDialogVisible: false
            }
        },
        created() {
            this.onSubmitQueryClassify()
        },
        methods: {
            addCalssificationSubmit() {
                const addClassifyFrom = this.calssificationAddForm
                addCalssification(addClassifyFrom).then(response => {
                    if (response.code === '000000') {
                        this.addCalssifyDialogVisible = false
                        this.$message({
                            message: "新增成功",
                            type: "success"
                        });
                        this.onSubmitQueryClassify();
                        this.calssificationAddForm = {
                            classification: "",
                                classificationCode: "",
                                classificationDesc: ""
                        };
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                })
            },
            editCalssificationSubmit(row) {
              const editForm = {
                  id: row.id,
                  classification: row.classification,
                  classificationCode: row.classificationCode,
                  classificationDesc: row.classificationDesc,
                  disposalDesc: row.disposalDesc
              }
              updateCalssification(editForm).then(response => {
                  if (response.code === '000000') {
                      this.editCalssifyDialogVisible = false
                      this.$message({
                          message: "保存成功",
                          type: "success"
                      });
                      this.onSubmitQueryClassify();
                  } else {
                      this.$message({
                          message: response.msg,
                          type: "error"
                      });
                  }
              })
            },
            onSubmitQueryClassify() {
                this.listLoading = true
                const queryForm = {
                    classification: this.calssificationQueryForm.classification,
                    classificationCode: this.calssificationQueryForm.classificationCode,
                    pageNum: 1,
                    pageSize: this.pageSize
                }
                getClassificatios(queryForm).then(response => {
                    if (response.code === '000000'){
                        this.garbageCalssifications = response.data.list
                        this.listLoading = false
                        this.totalPage = response.data.total
                    } else {
                        this.$message({
                            message: response.msg,
                            type: "error"
                        });
                    }
                    this.calssificationQueryForm = {
                        classification: "",
                        classificationCode: ""
                    }

                })
            },
            gotoAddCalssify() {
                this.addCalssifyDialogVisible = true
            },
            handleEdit(index, row) {
                this.editCalssifyDialogVisible = true
            },
            handleDelete(index, row) {
                const editForm = {
                    id: row.id,
                    classification: row.classification,
                    classificationCode: row.classificationCode,
                    classificationDesc: row.classificationDesc
                }
                delCalssification(editForm).then(response => {
                    if (response.code === '000000') {
                        this.addCalssifyDialogVisible = false
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.onSubmitQueryClassify();
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
