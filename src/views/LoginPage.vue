<template>
  <div class="containter">
    <!-- Pills navs -->
    <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
      <li class="nav-item" role="presentation">
        <a
          class="nav-link"
          id="tab-register"
          data-mdb-toggle="pill"
          href="#pills-register"
          role="tab"
          aria-controls="pills-register"
          aria-selected="false"
          >ثبت نام</a
        >
      </li>
      <li class="nav-item" role="presentation">
        <a
          class="nav-link active"
          id="tab-login"
          data-mdb-toggle="pill"
          href="#pills-login"
          role="tab"
          aria-controls="pills-login"
          aria-selected="true"
          >ورود</a
        >
      </li>
    </ul>
    <!-- Pills navs -->

    <!-- Pills content -->
    <div class="tab-content">
      <div
        class="tab-pane fade show active"
        id="pills-login"
        role="tabpanel"
        aria-labelledby="tab-login"
      >
        <form @submit.prevent="login" dir="rtl">
          <div class="text-center mb-3">
            <p>ورود با : </p>
            <button type="button" class="btn btn-link btn-floating mx-1">
              <i class="fab fa-facebook-f"></i>
            </button>

            <button type="button" class="btn btn-link btn-floating mx-1">
              <i class="fab fa-google"></i>
            </button>

            <button type="button" class="btn btn-link btn-floating mx-1">
              <i class="fab fa-twitter"></i>
            </button>

            <button type="button" class="btn btn-link btn-floating mx-1">
              <i class="fab fa-github"></i>
            </button>
          </div>


          <!-- Email input -->
          <div class="form-outline mb-4">
            <input
              type="text"
              id="loginName"
              class="form-control"
              required
              v-model="userName"
            />
            <label class="form-label" for="loginName">نام کاربری</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-4">
            <input
              type="password"
              id="loginPassword"
              class="form-control"
              required
              v-model="password"
            />
            <label class="form-label" for="loginPassword">رمز عبور</label>
          </div>

          <!-- 2 column grid layout -->
          <div class="row mb-4">
            <div class="col-md-6 d-flex justify-content-center">
              <!-- Checkbox -->
              <label class="form-check-label" for="loginCheck" >
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
          <button type="submit" class="btn btn-primary btn-block mb-4 btn-strech">
            ورود
          </button>

        </form>
      </div>
      <div
        class="tab-pane fade"
        id="pills-register"
        role="tabpanel"
        aria-labelledby="tab-register"
      >
        <form>
          <div class="text-center mb-3">
            <p>Sign up with:</p>
            <button type="button" class="btn btn-link btn-floating mx-1">
              <i class="fab fa-facebook-f"></i>
            </button>

            <button type="button" class="btn btn-link btn-floating mx-1">
              <i class="fab fa-google"></i>
            </button>

            <button type="button" class="btn btn-link btn-floating mx-1">
              <i class="fab fa-twitter"></i>
            </button>

            <button type="button" class="btn btn-link btn-floating mx-1">
              <i class="fab fa-github"></i>
            </button>
          </div>

          <p class="text-center">or:</p>

          <!-- Name input -->
          <div class="form-outline mb-4">
            <input type="text" id="registerName" class="form-control" />
            <label class="form-label" for="registerName">Name</label>
          </div>

          <!-- Username input -->
          <div class="form-outline mb-4">
            <input type="text" id="registerUsername" class="form-control" />
            <label class="form-label" for="registerUsername">Username</label>
          </div>

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" id="registerEmail" class="form-control" />
            <label class="form-label" for="registerEmail">Email</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-4">
            <input type="password" id="registerPassword" class="form-control" />
            <label class="form-label" for="registerPassword">Password</label>
          </div>

          <!-- Repeat Password input -->
          <div class="form-outline mb-4">
            <input
              type="password"
              id="registerRepeatPassword"
              class="form-control"
            />
            <label class="form-label" for="registerRepeatPassword"
              >Repeat password</label
            >
          </div>

          <!-- Checkbox -->
          <div class="form-check d-flex justify-content-center mb-4">
            <input
              class="form-check-input me-2"
              type="checkbox"
              value=""
              id="registerCheck"
              checked
              aria-describedby="registerCheckHelpText"
            />
            <label class="form-check-label" for="registerCheck">
              I have read and agree to the terms
            </label>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="btn btn-primary btn-block mb-3"
            @click="login"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
    <!-- Pills content -->
  </div>
</template>

<script>
import { useRouter } from "vue-router";
// import { axios } from "axios";
import { ref } from "@vue/reactivity";
import { setAuthToken } from "../services/AuthService.js";

export default {
  setup() {
    const axios = require("axios").default;
    const router = useRouter();
    const userName = ref("");
    const password = ref("");

    function login() {
      const body = {
        mobile: userName.value,

        password: password.value,
      };
      console.log(body);
      axios

        .post("http://127.0.0.1:8000/accounts/login", body)

        .then((resp) => {
          const token = resp.data.token;

          setAuthToken(token);

          router.push({ name: "home" });
        })

        .catch((error) => {
          console.log(error);
        });
    }

    return { login, userName, password };
  },
};
</script>

<style>
.containter {
  margin-left: 10%;
  margin-right: 10%;
}
.btn-strech {
    min-width: -moz-available;
    background-color: dimgray;
    border-color: dimgray;
}
</style>
