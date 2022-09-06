<template>
  <!-- <v-expansion-panels focusable hover multiple v-model="panels">
    <v-expansion-panel value="0">
      <v-expansion-panel-header>دوره ها</v-expansion-panel-header>
      <v-expansion-panel-content display="true"> -->
  <!-- <v-divider></v-divider> -->
  <v-card>
    <v-subheader align="right" dir="rtl">دوره ها </v-subheader>
    <v-divider></v-divider>
    <v-list two-line>
      <template>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> </v-list-item-title>
            <div class="cards">
              <course-card
                v-for="(course, index) in resp"
                :key="index"
                :course-img="course.courseImg"
                :course-title="course.courseTitle"
                :course-subtitle="course.courseSubtitle"
                :course-desc="course.courseDesc"
                :identifier="course.id"
              />
            </div>
          </v-list-item-content>
        </v-list-item>

        
      </template>
    </v-list>
  </v-card>

  <!-- </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels> -->
</template>

<script>
import courseCard from "../components/useCard.vue";

export default {
  components: {
    courseCard,
  },
  data: () => ({
    panels: [0],
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    resp: [],
  }),

  methods: {
    userFeed() {
      const axios = require("axios").default;
      axios
        .get("http://94.183.176.76:8000/api/course/user_feed")
        .then((resp) => {
          this.resp = resp.data;
          //
          for (let i = 0, len = resp.data.length; i < len; i++) {
            this.resp[i].id = resp.data[i].id;
            this.resp[i].courseTitle = resp.data[i].title;
            this.resp[i].courseImg = resp.data[i].image;
            this.resp[i].courseDesc = resp.data[i].about_course;
            this.resp[i].courseSubtitle = "level: " + resp.data[i].level;
          }
          console.log(this.resp);
          return resp.data;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    },
  },
  beforeMount() {
    this.userFeed();
  },
};
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
}
.main {
  display: grid;
}
/* .cards div {
  padding: 1em;
} */
</style>
