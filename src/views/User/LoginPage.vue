<template>
  <div class="containter">
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab> ورود </v-tab>
      <v-tab>ثبت نام </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-form v-model="valid">
          <v-container>
            <v-text-field
              v-model="loginData.mobile"
              :rules="phoneRules"
              label="شماره همراه"
              required
              reverse
            ></v-text-field>

            <v-text-field
              v-model="loginData.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required]"
              :type="show1 ? 'text' : 'password'"
              label="رمز عبور"
              counter
              @click:append="show1 = !show1"
              required
              reverse
            ></v-text-field>

            <div class="row mb-4">
              <div class="col-md-6 d-flex justify-content-center">
                <!-- Checkbox -->
                <label class="form-check-label" for="loginCheck">
                  مرا به یاد داشته باش
                </label>

                <div class="form-check mb-3 mb-md-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="loginCheck"
                    checked
                  />
                </div>
              </div>

              <div class="col-md-6 d-flex justify-content-center">
                <!-- Simple link -->
                <a href="#!">فراموشی رمز</a>
              </div>
            </div>

            <!-- Submit button -->
            <v-btn
              class="btn btn-primary btn-block mb-4 btn-strech"
              @click="login"
            >
              ورود
            </v-btn>
          </v-container>
        </v-form>
      </v-tab-item>

      <!-- register                        ************************                                        *************************** -->
      <v-tab-item>
        <v-form v-model="valid">
          <v-container v-show="registerForm">
            <v-text-field
              v-model="RegisterData.mobile"
              :rules="phoneRules"
              label="شماره همراه  *"
              required
              reverse
            ></v-text-field>

            <v-text-field
              v-model="RegisterData.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required]"
              :type="show1 ? 'text' : 'password'"
              label="رمز عبور  *"
              counter
              @click:append="show1 = !show1"
              required
              reverse
            ></v-text-field>
            <br /><br />

            <v-btn
              class="btn btn-primary btn-block mb-4 btn-strech"
              @click="register"
            >
              تایید شماره همراه
            </v-btn>
          </v-container>

          <v-container v-show="!registerForm">
            <div>
              <br /><br />
              <div align="center">
                <p>
                  ارسال کد تایید برای شماره : {{ RegisterData.mobile }}
                  <a
                    class="text-decoration-none text-decoration-underline"
                    @click="registerForm = true"
                    >تغییر شماره همراه
                  </a>
                </p>
              </div>
              <div class="ma-auto position-relative" style="max-width: 300px">
                <v-otp-input
                  v-model="otp"
                  length="4"
                  :disabled="loading"
                  @finish="onFinish"
                  reverse
                ></v-otp-input>
                <v-overlay absolute :value="loading">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-overlay>
              </div>
              <v-snackbar
                v-model="snackbar"
                :color="snackbarColor"
                :timeout="2000"
              >
                {{ text }}
              </v-snackbar>
            </div>
            <br />

            <br />
            <v-btn
              class="btn btn-primary btn-block mb-4 btn-strech"
              @click="onFinish"
            >
              ثبت نام
            </v-btn>
          </v-container>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000">
      {{ text }}
    </v-snackbar>
    <div><p v-text="error"></p></div>
  </div>
</template>

<script>
import { setAuthToken } from "../../services/AuthService.js";

const axios = require("axios").default;
const BaseUrl = "http://94.183.176.76:8000";

export default {
  data() {
    return {
      show1: false,
      tab: 1,
      valid: false,
      phoneRules: [
        (v) => !!v || "Name is required",
        (v) => /^09\d{9}$/.test(v) || "Name must be less than 10 characters",
      ],
      passwordRules: {
        required: (value) => !!value || "Required.",
        emailMatch: () => `The email and password you entered don't match`,
      },
      loginData: {
        mobile: null,
        password: null,
      },
      RegisterData: {
        mobile: null,
        password: null,
        code: null,
      },
      registerForm: true,
      otpForm: false,
      isAuthenticated: false,

      //otp data
      loading: false,
      snackbar: false,
      snackbarColor: "default",
      otp: "",
      text: "",
      error: "",
    };
  },

  methods: {
    register() {
      axios
        .post(BaseUrl + "/api/accounts/register", this.RegisterData)
        .then((resp) => {
          console.log(resp.data);
          this.registerForm = false;
        })

        .catch((error) => {
          this.error = error.response.data;
          this.snackbarColor = "erorr";
          this.text = `مشکلی رخ داد مجددا تلاش کنید `;
          this.snackbar = true;
          setTimeout(() => {
            this.error = error = "";
          }, 4000);
          console.log(error);
        });
    },
    onFinish(rsp) {
      this.loading = true;
      this.RegisterData.code = rsp;
      axios
        .post(BaseUrl + "/api/accounts/verify_otp", this.RegisterData)
        .then((resp) => {
          this.loading = false;
          this.snackbarColor =  "success" ;
          this.text = `ثبت نام با موفقیت انجام شد`;
          this.snackbar = true;
          const token = resp.data.token;
          setAuthToken(token);
          this.isAuthenticated = true;

          this.$router.push({
            name: "home",
            params: {
              isAuthenticated: this.isAuthenticated,
            },
          });
          
        })

        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        this.loading = false;
        this.snackbarColor = rsp === this.expectedOtp ? "success" : "warning";
        this.text = `Processed OTP with "${rsp}" (${this.snackbarColor})`;
        this.snackbar = true;
      }, 3500);
    },

    login() {
      axios
        .post(BaseUrl + "/accounts/login", this.loginData)
        .then((resp) => {
          const token = resp.data.token;
          setAuthToken(token);
          this.isAuthenticated = true;

          this.$router.push({
            name: "home",
            params: {
              isAuthenticated: this.isAuthenticated,
            },
          });
          window.location.reload()
        })

        .catch((error) => {
          this.error = error.response.data;
          this.snackbarColor = "erorr";
          this.text = `مشکلی رخ داد مجددا تلاش کنید `;
          this.snackbar = true;
          setTimeout(() => {
            this.error = error = "";
          }, 4000);
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.containter {
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10%;
}
.btn-strech {
  min-width: -moz-available;
  background-color: dimgray;
  border-color: dimgray;
}
.position-relative {
  position: relative;
}
</style>
