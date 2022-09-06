<template>
  <v-stepper v-model="e6" vertical align="right">
    <v-alert :type="alertType" v-model="alert" transition="fade-transition">{{
      alertMessage
    }}</v-alert>
    <v-stepper-step :complete="e6 > 1" step="1">
      تکمیل اطلاعات دوره
      <!-- <small>Summarize if needed</small> -->
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card class="mb-12" height="fit-content">
        <div class="card_content">
          <v-text-field
            label="عنوان اصلی دوره"
            :rules="titleRules"
            hide-details="auto"
            reverse
            outlined
            style="margin-bottom: 1em"
            v-model="courseData.title"
          ></v-text-field>

          <v-textarea
            :rules="rules"
            outlined
            label="توضیحات دوره"
            reverse
            auto-grow
            v-model="courseData.desc"
          ></v-textarea>

          <v-combobox
            v-model="courseData.categories"
            :items="items"
            label="دسته بندی"
            multiple
            chips
            reverse
            outlined
          ></v-combobox>
          <div>
            <v-text-field
              v-model="courseData.price"
              label="قیمت کل دوره"
              hide-details="auto"
              reverse
              outlined
              style="margin-bottom: 1em; float: inline-start; margin-left: 1em"
            ></v-text-field>
            <!-- <v-select
              v-model="courseData.level_id"
              outlined
              :items="items"
              label="سختی دوره"
              reverse
            ></v-select> -->
            <v-slider
              v-model="courseData.level_id"
              :max="levels.length - 1"
              :tick-labels="levels"
              style="margin-left: 30%; padding-bottom: 1em"
              color="gray"
            ></v-slider>
          </div>
          <v-file-input
            v-model="image"
            :rules="AvatarRules"
            accept="image/png, image/jpeg"
            placeholder="انتخاب کنید"
            prepend-icon="mdi-camera"
            label="تصویر اصلی"
            reverse
          ></v-file-input>
        </div>
      </v-card>
      <v-btn color="primary" @click="goSection2"> ادامه </v-btn>
    </v-stepper-content>

    <!-- ***************** step2 ********************* -->
    <v-stepper-step :complete="e6 > 2" step="2">
      ایجاد سرفصل ها
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card class="mb-12 overflow-auto" height="fit-content">
        <v-divider></v-divider>
        <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          @click="increaseSectionNumber"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
          @click="sectionNumbers--"
        >
          <v-icon dark> mdi-minus </v-icon>
        </v-btn>
        <label
          >برای اضافه کردن بخش جدید به دوره خود روی این دکمه کلیک کنید</label
        >
        <v-divider></v-divider>

        <v-expansion-panels focusable>
          <v-expansion-panel v-for="(item, i) in sectionNumbers" :key="i">
            <v-expansion-panel-header>{{
              courseSectionData[i].title
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-text-field
                label="عنوان بخش"
                :rules="titleRules"
                hide-details="auto"
                reverse
                outlined
                style="margin-bottom: 1em; margin-top: 1em"
                v-model="courseSectionData[i].title"
              ></v-text-field>

              <v-textarea
                :rules="rules"
                outlined
                label="توضیحات مختصری در مورد این بخش"
                reverse
                auto-grow
                v-model="courseSectionData[i].about_section"
              ></v-textarea>

              <!-- ***************** step2 subsections ********************* -->
              <v-divider></v-divider>
              <v-btn
                class="mx-2"
                fab
                dark
                color="#CD5C5C"
                @click="increaseSubSectionNumber"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="#F08080"
                @click="subSectionNumbers--"
              >
                <v-icon dark> mdi-minus </v-icon>
              </v-btn>
              <label
                >برای اضافه کردن زیرفصل جدید به این بخش روی این دکمه کلیک
                کنید</label
              >
              <v-divider></v-divider>
              <v-expansion-panels focusable>
                <v-expansion-panel
                  v-for="(item, ssi) in subSectionNumbers"
                  :key="ssi"
                >
                  <v-expansion-panel-header>{{
                    courseSubSectionData[ssi].title
                  }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div>
                      <v-text-field
                        label="عنوان زیرفصل"
                        :rules="titleRules"
                        hide-details="auto"
                        reverse
                        outlined
                        style="margin-bottom: 1em; margin-top: 1em"
                        v-model="courseSubSectionData[ssi].title"
                      ></v-text-field>

                      <v-text-field
                        label="مدت زمان حدودی برای خواندن این قسمت"
                        :rules="rules"
                        hide-details="auto"
                        reverse
                        outlined
                        style="margin-bottom: 1em; margin-top: 1em"
                        v-model="courseSubSectionData[ssi].time_duration"
                      ></v-text-field>
                      <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        color="basil"
                        grow
                      >
                        <v-tab> محتوای متنی </v-tab>
                        <v-tab> بارگذاری فایل </v-tab>
                      </v-tabs>
                      <v-tabs-items v-model="tab">
                        <v-tab-item>
                          <vue-editor
                            v-model="courseContent.content"
                          ></vue-editor>
                        </v-tab-item>
                        <v-tab-item>
                          <v-file-input
                            v-model="courseContent.file"
                            accept="image/png, image/jpeg, .pdf, .mp4"
                            placeholder="انتخاب کنید"
                            prepend-icon="mdi-camera"
                            label="فایل دوره"
                            reverse
                          ></v-file-input>
                        </v-tab-item>
                      </v-tabs-items>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
      <v-btn color="primary" @click="e6 = 3"> ادامه </v-btn>
      <v-btn color="normal" @click="e6 = 1"> بازگشت </v-btn>
      <!-- <v-btn text> Cancel </v-btn> -->
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3">
      تایید مشخصات و ایجاد دوره
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1" class="mb-12" height="200px">
        <v-card-subtitle>اضافه کردن مربی به دوره</v-card-subtitle>
        <v-card-subtitle>نمایش اطلاعات برای تایید </v-card-subtitle>
        <v-card-subtitle>قوانین</v-card-subtitle>
      </v-card>
      <v-btn color="primary" @click="createCourse"> ایجاد </v-btn>
      <v-btn color="normal" @click="e6 = 2"> بازگشت </v-btn>
    </v-stepper-content>
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          لطفا تا بارگذاری کامل مطالب منتظر بمانید
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-stepper>
</template>

<script>
import { VueEditor } from "vue2-editor";
const axios = require("axios").default;
const BaseUrl = "http://94.183.176.76:8000";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      e6: 1,
      tab: null,
      alert: false,
      alertType: null,
      alertMessage: "",
      dialog: false,

      sectionNumbers: 1,
      subSectionNumbers: 1,
      levels: ["مبتدی", "متوسط", "حرفه ای"],
      categories: [],
      items: [],

      image: null,
      courseData: {
        title: "test", //todo : set null after test
        desc: "test",
        categories: [],
        price: 0,
        level_id: 0,
      },
      courseSectionData: [
        {
          course: null,
          title: "courseSectionData title",
          about_section: "courseSectionData about",
        },
      ],
      content: "",
      file: null,
      courseSubSectionData: [
        {
          course_section: null,
          title: "course  SubSectionData title",
          time_duration: 2,
        },
      ],
      courseContent: [
        {
          content: null,
          file: null,
          content_type: null,
          course_sub_section_item: null,
        },
      ],
      // rules *****************
      rules: [(value) => !!value || "مقداری را وارد کنید"],
      titleRules: [
        (value) => !!value || "لطفا عنوان مناسبی را انتخاب نمایید.",
        (value) =>
          (value && value.length >= 5) ||
          "لطفا عنوان مناسبی را برای دوره انتخاب نمایید.",
      ],
      AvatarRules: [
        (value) =>
          !value || value.size < 2000000 || "تصویر باید کمتر از ۲ مگابایت باشد",
      ],
    };
  },
  methods: {
    increaseSectionNumber() {
      this.courseSectionData.push({
        course: null,
        title: null,
        time_duration: null,
      });
      this.sectionNumbers++;
    },
    increaseSubSectionNumber() {
      this.courseSubSectionData.push({
        course_section: null,
        title: null,
        time_duration: null,
      });
      this.courseContent.push({
        content: null,
        file: null,
        content_type: null,
        course_sub_section_item: null,
      });
      this.subSectionNumbers++;
    },
    goSection2(event) {
      if (
        this.courseData.title == null ||
        this.courseData.categories.length == 0 ||
        this.courseData.desc == null
      ) {
        this.alertType = "error";
        this.alertMessage = "لطفا تمامی فیلد هارا با دقت وارد نمایید";
        this.alert = true;
      } else {
        this.e6 = 2;
      }
    },
    hide_alert: function (event) {
      window.setInterval(() => {
        this.alert = false;
      }, 3500);
    },
    getCategories() {
      axios
        .get(BaseUrl + "/home/categories")
        .then((resp) => {
          for (let i = 0, len = resp.data.length; i < len; i++) {
            this.items.push(resp.data[i].title);
            this.categories.push({
              id: resp.data[i].id,
              title: resp.data[i].title,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createCourse() {
      this.dialog = true;
      console.log(this.courseContent.file.type)
      
      var body = Object.assign({}, this.courseData);
      var categories = [];
      this.categories.forEach((element) =>
        (function (formCategory) {
          if (formCategory.includes(element.title)) {
            categories.push({ category: element.id });
          }
        })(this.courseData.categories)
      );
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.courseData.title);
      formData.append("about_course", this.courseData.desc);
      formData.append("categories", JSON.stringify(categories));
      formData.append("level_id", this.courseData.level_id + 7);
      axios
        .post(BaseUrl + "/api/course/create_course", formData)
        .then((resp) => {
          console.log(resp.data.id);
          for (let i = 0; i < this.courseSectionData.length; i++) {
            this.courseSectionData[i].course = resp.data.id;
            axios
              .post(
                BaseUrl + "/api/course/create_section",
                this.courseSectionData[i]
              )
              .then((resp) => {
                for (let i = 0; i < this.courseSubSectionData.length; i++) {
                  this.courseSubSectionData[i].course_section = resp.data.id;
                  axios
                    .post(
                      BaseUrl + "/api/course/create_subsection",
                      this.courseSubSectionData[i]
                    )
                    .then((resp) => {
                      // contetn ********************************

                      for (let i = 0; i < this.courseContent.length; i++) {
                        let formData = new FormData();
                        formData.append(
                          "course_sub_section_item_id",
                          resp.data.id
                        );
                        formData.append("content", this.courseContent.content);
                        if (this.courseContent.file.type === "video/mp4"){
                          formData.append("content_type", 3);
                        }else if (this.courseContent.file.type === "image/jpeg" || this.courseContent.file.type === "image/png"){
                          formData.append("content_type", 4);
                        }else {
                          formData.append("content_type", 5);
                        }
                        
                        formData.append("file", this.courseContent.file);
                        axios
                          .post(
                            BaseUrl + "/api/course/create_item_content",
                            formData
                          )
                          .then((resp) => {
                            console.log(resp.data);
                            this.alertType = "success";
                            this.alertMessage = "دوره شما با موفقیت ایجاد شد";
                            this.alert = true;
                            this.dialog = false;
                          })
                          .catch((error) => {
                            this.dialog = false;
                            console.log(error);
                            return null;
                          });
                      }
                      //***************************
                    })
                    .catch((error) => {
                      console.log(error);
                      return null;
                    });
                }
              })
              .catch((error) => {
                console.log(error);
                return null;
              });
          }
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    },
  },
  mounted: function () {
    this.getCategories();

    if (alert) {
      this.hide_alert();
    }
  },
  // watch: {
  //     dialog (val) {
  //       if (!val) return

  //       setTimeout(() => (this.dialog = false), 4000)
  //     },
  //   },
};
</script>
<style scoped>
.card_content {
  margin: 1em;
}
/* .card_content.v-text-field {
  margin-bottom: 1em;
} */
</style>
