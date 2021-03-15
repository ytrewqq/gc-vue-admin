<template>
  <div class="personal-container">
    <el-form :model="personalForm" status-icon :rules="personalRules" ref="personalForm" label-width="100px" class="personal-form">
      <div class="title-container">
        <h3 class="title">个人中心</h3>
      </div>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="personalForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="personalForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idNo">
        <el-input v-model="personalForm.idNo"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="personalForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitpersonal('personalForm')">修改</el-button>
        <el-button @click="editpersonal('personalForm')">编辑</el-button>
        <el-button @click="cancelpersonal('personalForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {update} from "../../api/user";

    export default {
        name: "personal",
        data() {
            const checkPhone = (rule, value, callback) => {
                if (value === ''){
                    callback(new Error('请输入手机号码!'));
                } else {
                    callback();
                }
            };
            const checkUserName = (rule, value, callback) => {
                if (value === ''){
                    callback(new Error('请输入姓名!'));
                } else {
                    callback();
                }
            };
            const checkIdCard = (rule, value, callback) => {
                if (value === ''){
                    callback(new Error('请输入身份证号!'));
                } else {
                    callback();
                }
            };
            const checkSex = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择性别!'));
                } else {
                    callback();
                }
            };
            return {
                personalForm: {
                    userName: '',
                    idNo: '',
                    phone: '',
                    sex: ''
                },
                personalRules: {
                    userName: [
                        { validator: checkUserName, trigger: 'blur' }
                    ],
                    idNo: [
                        { validator: checkIdCard, trigger: 'blur' }
                    ],
                    phone: [
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                    sex: [
                        { validator: checkSex, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitpersonal(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let personalData = this.personalForm
                        update(personalData).then(response => {
                            if (response.code === '000000'){
                                this.$message({
                                    message: response.msg,
                                    type: "success"
                                });
                            } else {
                                this.$message({
                                    message: response.msg,
                                    type: "error"
                                });
                            }
                        })

                    } else {
                        this.$message({
                            message: '信息不全，请检查!!',
                            type: "error"
                        });

                    }
                });
            },
            cancelpersonal(formName) {
                this.$refs[formName].resetFields();
            },
            editpersonal(){

            }
        }
    }
</script>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .personal-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    color: aqua;

    .personal-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
