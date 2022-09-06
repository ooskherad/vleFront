<template>
  <div id="app">
    <v-app id="inspire">
      <Header />
      <!-- <v-navigation-drawer v-model="drawer" app>
        <v-sheet color="grey lighten-4" class="pa-4">
          <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

          <div>john@vuetifyjs.com</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
          <v-list-item v-for="[icon, text] in links" :key="icon" link>
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer> -->

      <v-main>
        <v-container class="py-8 px-6" fluid>
          <v-row>
            <v-col>
            <router-view></router-view>
              
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
    <!-- <v-main class="grey lighten-3 main">
         <v-container class="py-8 px-6"
        fluid>
          <v-row>
            <v-col cols="2">
              <v-sheet rounded="lg">
                <v-list color="transparent">
                  <v-list-item v-for="n in 5" :key="n" link>
                    <v-list-item-content>
                      <v-list-item-title> List Item {{ n }} </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider class="my-2"></v-divider>

                  <v-list-item link color="grey lighten-4">
                    <v-list-item-content>
                      <v-list-item-title> Refresh </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>

            <v-col>
              <v-sheet min-height="70vh" rounded="lg">
                <router-view></router-view>
              </v-sheet>
            </v-col>
          </v-row>
          </v-container>
      </v-main>

      <v-footer> dgs </v-footer>
    </v-app> -->
  </div>
</template>

<script>
import Header from "./components/sections/useHeader.vue";
import navigation from "./components/sections/navigationRight.vue";
import {setAuthToken} from "./services/AuthService.js"
export default {
  name: "App",
  components: {
    Header,
    navigation,
  },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
  }),
  mounted() {

    const token = localStorage.getItem("token");

    setAuthToken(token);

  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
