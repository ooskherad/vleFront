<template>
  <div align="center">
    <v-navigation-drawer v-model="drawer" app width="400px">
      <v-sheet class="pa-4">
        <!-- <div>{{ courseData.title }}</div>
        <div>{{ courseData.price }}</div>
        <div>{{ courseData.level }}</div>
        <div>{{ courseData.categories }}</div>
        <div>{{ courseData.owners }}</div> -->
        <br /><br /><br /><br />
      </v-sheet>

      <v-divider></v-divider>
      <v-rating
      v-model="rating"
      icon-label="custom icon label text {0} of {1}"
    ></v-rating>
      <div>{{ courseData.title }}</div>
      <div>{{ courseData.price }}</div>
      <div>{{ courseData.level }}</div>
      <div>{{ courseData.categories }}</div>
      <div>{{ courseData.owners }}</div>
    </v-navigation-drawer>
    <div class="header">
      <h1>{{ courseData.title }}</h1>
    </div>

    <img :src="courseData.image" />

    <v-divider></v-divider>
    <div align="right">
      {{ courseData.about_course }}
    </div>
    <v-divider></v-divider>

    <v-expansion-panels focusable multiple v-model="panels" dir="rtl">
      <v-expansion-panel
        v-for="(section, index) in courseData.sections"
        :key="index"
      >
        <v-expansion-panel-header>{{ section.title }}</v-expansion-panel-header>
        <v-expansion-panel-content display="true">
          {{ section.about_section }}
          <v-card
            elevation="1"
            outlined
            v-for="(sub_sections, index2) in section.sub_sections"
            :key="index2"
            @click="goCourseItemPage(sub_sections.id)"
          >
           
              <v-card-subtitle align="right">
                {{ sub_sections.title }}
              </v-card-subtitle>
          
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import navigation from "../../components/sections/navigationRight.vue";
export default {
  data: () => ({
    panels: [0],
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    courseData: [],
  }),
  components: {
    navigation,
  },
  methods: {
    getCourseData() {
      const axios = require("axios").default;
      console.log(this.$route.params.id);
      axios
        .get(
          `http://94.183.176.76:8000/api/course/sections?courseId=${this.$route.params.id}`
        )
        .then((resp) => {
          this.courseData = resp.data;
          //

          console.log(this.courseData);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    goCourseItemPage(subsectioId) {
      this.$router.push({
        name: "courseItems",
        params: { id: this.courseData.id, ssID: subsectioId},
      });
    },
  },
  beforeMount() {
    this.getCourseData();
  },
};
</script>

<style>
.header {
  padding: 1em;
  margin-bottom: 1em;
}
.v-card {
  margin-top: 5px;
}
.v-navigation-drawer__border {
  width: 0px;
}
</style>
