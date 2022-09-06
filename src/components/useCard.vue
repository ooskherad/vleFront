<template>
  <v-card class="mx-auto" max-width="300">
    <v-img
      :src="courseImg"
      height="190px"
    ></v-img>

    <v-card-title> {{courseTitle}} </v-card-title>

    <v-card-subtitle> {{courseSubtitle}} </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text @click="getCourseDetails()"> ثبت نام </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{courseDesc}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: ["courseImg", "courseTitle", "courseSubtitle", "courseDesc", "identifier"],
  data: () => ({
    show: false,
  }),
  methods : {
    getCourseDetails() {
        this.$router.push({name:"courseDetail", params:{"id":this.identifier}})
    }
  }
};
</script>

<style></style>
