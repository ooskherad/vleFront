<template>
  <div>
    <!-- <v-navigation-drawer v-model="drawer" app width="400px">
      <v-sheet class="pa-4">
        <div>{{ courseData.title }}</div>
        <div>{{ courseData.price }}</div>
        <div>{{ courseData.level }}</div>
        <div>{{ courseData.categories }}</div>
        <div>{{ courseData.owners }}</div>
        <br /><br /><br />
      </v-sheet>

     <v-divider></v-divider>

      <v-card
        elevation="1"
        outlined
        v-for="(item, index) in sectionData"
        :key="index"
      >
        <v-subheader align="right" dir="rtl"> {{ item.title }} </v-subheader>
      </v-card>
    </v-navigation-drawer> -->

    <v-card
        elevation="1"
        outlined
        v-for="(item, index) in sectionData"
        :key="index"
      >
    <v-subheader align="right" dir="rtl">دوره ها </v-subheader>
    <v-divider></v-divider>
    <v-list two-line>
      <template>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> </v-list-item-title>
            <div class="cards" align="center">
              <videoPalyer v-if="item.content_type === 3" :videoURL="item.file" />
              <img :src="item.file" v-if="item.content_type === 4" >
              <br />
              <br />
              <br />
              <br />
              <div v-html="item.content" align="right"></div>
            </div>
            <div class="cards" v-if="item.content_type === 2">
              <videoPalyer v-if="item.content_type === 3" :videoURL="item.file" />
              <br />
              <div v-html="item.content" align="right"></div>
            </div>
          </v-list-item-content>
        </v-list-item>

        
      </template>
    </v-list>
  </v-card>

  </div>
</template>

<script>
  import videoPalyer from "../../components/videoPalyer.vue"
export default {
  components :{
    videoPalyer
  },
  data: () => ({
    panels: [0],
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    sectionData: [],
  }),
  methods: {
    getSubSectionItemsData() {
      const axios = require("axios").default;
      console.log(this.$route.params.id);
      axios
        .get(
          `http://94.183.176.76:8000/api/course/content?subSection=${this.$route.params.ssID}`
        )
        .then((resp) => {
          this.sectionData = resp.data;
          //

          console.log(this.sectionData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    this.getSubSectionItemsData();
  },
};
</script>

<style></style>
