<template>
  <div class="password-container">
    <el-form :model="passwordForm" status-icon :rules="passwordRules" ref="passwordForm" label-width="100px" class="password-form">
      <div class="title-container">
        <h3 class="title">修改密码</h3>
      </div>
      <el-form-item label="旧密码" prop="password">
        <el-input type="password" v-model="passwordForm.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="passwordForm.newPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="passwordForm.checkNewPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitpassword('passwordForm')">提交</el-button>
        <el-button @click="resetpassword('passwordForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {changePassword} from "../../api/user";

    export default {
        name: "password",
        data() {

            const validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码!'));
                } else {
                    callback();
                }
            };
            const validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码!'));
                } else {
                    callback();
                }
            };
            const validateCheckNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码!'));
                } else if (value !== this.passwordForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                passwordForm: {
                    oldPassword: '',
                    newPassword: '',
                    checkNewPassword: ''
                },
                passwordRules: {

                    oldPassword: [
                        { validator: validateOldPass, trigger: 'blur' }
                    ],
                    newPassword: [
                        { validator: validateNewPass, trigger: 'blur' }
                    ],
                    checkNewPassword: [
                        { validator: validateCheckNewPass, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitpassword(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let passwordData = this.passwordForm
                        changePassword(passwordData).then(response => {
                            if (response.code === '000000'){
                                this.$store.dispatch('user/resetToken')
                                this.$router.push('/login')
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
            resetpassword(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .password-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    color: aqua;

    .password-form {
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
