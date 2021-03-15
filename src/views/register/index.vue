<template>
  <div class="register-container">
    <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="100px" class="register-form">
      <div class="title-container">
        <h3 class="title">垃圾分类系统注册</h3>
      </div>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="registerForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="idNo">
        <el-input v-model="registerForm.idNo"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="registerForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="registerForm.checkPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitRegister('registerForm')">提交</el-button>
        <el-button @click="resetRegister('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {register} from "../../api/user";

  export default {
        name: "Register",
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
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码!'));
                } else {
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码!'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerForm: {
                    userName: '',
                    idNo: '',
                    phone: '',
                    sex: '',
                    password: '',
                    checkPassword: ''
                },
                registerRules: {
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
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPassword: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitRegister(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let registerData = this.registerForm
                        register(registerData).then(response => {
                            if (response.code === '000000'){
                                this.$router.push('/login')
                            } else {
                                this.$message({
                                    message: response.msg,
                                    type: "success"
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
            resetRegister(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .register-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    color: aqua;

  .register-form {
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
