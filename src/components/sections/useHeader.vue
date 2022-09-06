<template>
  <v-app-bar app color="white" flat>
    {{Authenticate()}}
    <v-container class="py-0 fill-height">
      <v-menu
      bottom
      origin="center center"
      v-if="isAuthenticated"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar class="mr-10" color="grey darken-1" size="32" v-bind="attrs"
          v-on="on"></v-avatar>
        <!-- <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Scale Transition
        </v-btn> -->
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title><v-btn @click="logout">خروج</v-btn></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

      <v-btn text href="/"> صفحه اصلی </v-btn>

      <v-btn text href="/"> دوره های آموزشی </v-btn>

      <v-btn text href="/accounts/login" v-if="!isAuthenticated">ورود </v-btn>

      <v-btn outlined color="black" href="/courses/create_course">
        بارگذاری ویدیو
      </v-btn>

      <!-- <v-btn text> داشبورد </v-btn> -->

      <v-spacer></v-spacer>

      <v-responsive max-width="260">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
          placeholder="جست و جو کنید"
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>
import { checkAuth } from "../../services/AuthService.js";

export default {
  name: "useHeader",
  // props: ['isAuthenticated'],
  data: () => ({
    resp: [],
    isAuthenticated: false,
    items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],

  }),
  methods: {
    Authenticate() {
      console.log(this.isAuthenticated)
      const userisAuthenticated = checkAuth();
      if (userisAuthenticated) {
        this.isAuthenticated = true
        return;
      }
    },
    logout(){
      localStorage.removeItem("token")
      window.location.reload()
    }
  },
  mounted (){
    this.Authenticate()
  }
};
</script>
