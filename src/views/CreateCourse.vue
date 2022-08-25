<template>
  <!-- Steps form -->
  <div class="card">
    <div class="card-body mb-4" dir="rtl">
      <h2 class="text-center font-weight-bold pt-4 pb-5">
        <strong> ایجاد دوره آموزشی</strong>
      </h2>

      <p>
        <strong>
          در این قسمت اطلاعات کلی دوره را وارد کنید و آن را ایجاد کنید. برای
          ویرایش بخش ها و محتوا برای این پروژه از پروفایل خود میتواید اقدام کنید
        </strong>
      </p>

      <hr class="mt-5" />

      <!-- Stepper -->
      <div class="steps-form" dir="ltr">
        <div class="steps-row setup-panel">
          <div class="steps-step">
            <a
              href="#step-9"
              type="button"
              class="btn btn-circle waves-effect waves-light btn-default btn-indigo"
              >1</a
            >
            <p>مرحله ۱</p>
          </div>
          <div class="steps-step">
            <a
              href="#step-10"
              type="button"
              class="btn btn-default btn-circle waves-effect waves-light"
              disabled="disabled"
              >2</a
            >
            <p>مرحله ۲</p>
          </div>
          <div class="steps-step">
            <a
              href="#step-11"
              type="button"
              class="btn btn-default btn-circle waves-effect waves-light"
              disabled="disabled"
              >3</a
            >
            <p>مرحله ۳</p>
          </div>
        </div>
      </div>

      <form role="form" action="" method="post" dir="rtl">
        <!-- First Step -->
        <div class="row setup-content" id="step-9">
          <div class="col-md-12">
            <h3 class="font-weight-bold pl-0 my-4">
              <strong>اطلاعات کلی دوره </strong>
            </h3>

            <div class="form-group md-form has-error">
              <label for="title" data-error="wrong" data-success="right"
                >عنوان
              </label>
              <input
                id="title"
                type="text"
                required="required"
                class="form-control validate has-error"
              />
            </div>

            <div class="form-group md-form mt-3">
              <label for="introdution" data-error="wrong" data-success="right"
                >معرفی دوره</label
              >
              <textarea
                id="introdution"
                type="text"
                required="required"
                rows="2"
                class="md-textarea validate form-control"
              ></textarea>
            </div>

            <div class="form-group md-form mt-3">
              <label for="level" data-error="wrong" data-success="right"
                >سطح دوره</label
              >
              <select
                id="level"
                class="form-select form-control"
                aria-label="Default select example"
              >
                <option selected></option>
                <option value="1">مبتدی</option>
                <option value="2">متوسط</option>
                <option value="3">پیشرفته</option>
              </select>
            </div>

            <div class="form-group md-form mt-3">
              <label for="formFileSm" data-error="wrong" data-success="right"
                >تصویر اصلی</label
              >
              <input
                class="form-control form-control-sm"
                id="formFileSm"
                type="file"
                dir="ltr"
              />
            </div>

            <button
              class="btn btn-indigo btn-rounded nextBtn float-right waves-effect waves-light"
              type="button"
            >
              Next
            </button>
          </div>
        </div>

        <!-- Second Step -->
        <div class="row setup-content" id="step-10">
          <div class="col-md-12">
            <h3 class="font-weight-bold pl-0 my-4"><strong>Step 2</strong></h3>
            <div class="form-group md-form">
              <label for="companyName" data-error="wrong" data-success="right"
                >Company Name</label
              >
              <select class="select" multiple data-mdb-filter="true">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
                <option value="6">Six</option>
                <option value="7">Seven</option>
                <option value="8">Eight</option>
                <option value="9">Nine</option>
                <option value="10">Ten</option>
              </select>
              
              <input
                id="companyName"
                type="text"
                required="required"
                class="form-control validate"
              />
            </div>
            <div class="form-group md-form mt-3">
              <label
                for="companyAddress"
                data-error="wrong"
                data-success="right"
                >Company Address</label
              >
              <input
                id="companyAddress"
                type="text"
                required="required"
                class="form-control validate"
              />
            </div>
            <button
              class="btn btn-indigo btn-rounded prevBtn float-left"
              type="button"
            >
              Previous
            </button>
            <button
              class="btn btn-indigo btn-rounded nextBtn float-right waves-effect waves-light"
              type="button"
            >
              Next
            </button>
          </div>
        </div>

        <!-- Third Step -->
        <div class="row setup-content" id="step-11">
          <div class="col-md-12">
            <h3 class="font-weight-bold pl-0 my-4"><strong>Step 3</strong></h3>
            <button
              class="btn btn-indigo btn-rounded prevBtn float-left"
              type="button"
            >
              Previous
            </button>
            <button
              class="btn btn-default btn-rounded float-right"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- Steps form -->
</template>

<script>
import $ from "jquery";

export default {
  mounted() {
    $(document).ready(function () {
      var navListItems = $("div.setup-panel div a"),
        navListLabels = $(".form-control"),
        allWells = $(".setup-content"),
        allNextBtn = $(".nextBtn"),
        allPrevBtn = $(".prevBtn");

      allWells.hide();

      navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr("href")),
          $item = $(this);

        if (!$item.hasClass("disabled")) {
          navListItems.removeClass("btn-indigo").addClass("btn-default");
          $item.addClass("btn-indigo");
          allWells.hide();
          $target.show();
          $target.find("input:eq(0)").focus();
        }
      });

      allPrevBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          prevStepSteps = $('div.setup-panel div a[href="#' + curStepBtn + '"]')
            .parent()
            .prev()
            .children("a");

        prevStepSteps.removeAttr("disabled").trigger("click");
      });

      allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $(
            'div.setup-panel div a[href="#' + curStepBtn + '"]'
          )
            .parent()
            .next()
            .children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
          if (!curInputs[i].validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
        }

        if (isValid) nextStepWizard.removeAttr("disabled").trigger("click");
      });

      navListLabels.click(function (i) {
        var n = t(i.target),
          l = !n.val(),
          o = !i.target.validity.badInput,
          a = void 0 === n.attr("placeholder");
        l &&
          o &&
          a &&
          (e.toggleActiveClass(n, "remove"),
          "date" == n.attr("type") && n.css("color", "transparent")),
          !l &&
            o &&
            a &&
            (n.siblings("i, .input-prefix").removeClass("active"),
            "date" == n.attr("type") && n.css("color", "#495057")),
          e.validateField(n);
      });

      navListLabels.click(function (i) {
        e.toggleActiveClass(t(i.target), "add"),
          "date" == t(i.target).attr("type") &&
            t(i.target).css("color", "#495057");
      });

      $("div.setup-panel div a.btn-indigo").trigger("click");
    });
  },
};
</script>

<style>
.steps-form {
  display: table;
  width: 100%;
  position: relative;
}
.steps-form .steps-row {
  display: table-row;
}
.steps-form .steps-row:before {
  top: 14px;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 100%;
  height: 1px;
  background-color: #ccc;
}
.steps-form .steps-row .steps-step {
  display: table-cell;
  text-align: center;
  position: relative;
}
.steps-form .steps-row .steps-step p {
  margin-top: 0.5rem;
}
.steps-form .steps-row .steps-step button[disabled] {
  opacity: 1 !important;
  filter: alpha(opacity=100) !important;
}
.steps-form .steps-row .steps-step .btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 15px;
  margin-top: 0;
}

.btn:hover,
.btn:focus,
.btn:active {
  outline: 0;
  -webkit-box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18),
    0 4px 15px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
}
a.waves-effect,
a.waves-light {
  display: inline-block;
}
a:hover {
  color: #0056b3;
  text-decoration: none;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.btn-indigo {
  color: #fff;
  background-color: #3f51b5 !important;
}
.btn-indigo:hover {
  color: #fff;
  background-color: #4d5ec1;
}
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.btn-default {
  color: #fff;
  background-color: #2bbbad !important;
}
btn {
  margin: 0.375rem;
  margin-top: 0.375rem;
  color: inherit;
  text-transform: uppercase;
  word-wrap: break-word;
  white-space: normal;
  cursor: pointer;
  border: 0;
  border-radius: 0.125rem;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  -webkit-transition: color 0.15s ease-in-out,
    background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  padding: 0.84rem 2.14rem;
  font-size: 0.81rem;
}
.btn-rounded {
  border-radius: 10em;
}
.waves-effect {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
a {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
body {
  /* font-family: "Roboto", "sans-serif"; */
  font-weight: 300;
}
button,
html [type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.md-form input:not([type]).valid,
.md-form input:not([type]):focus.valid,
.md-form input[type="text"]:not(.browser-default).valid,
.md-form input[type="text"]:not(.browser-default):focus.valid,
.md-form input[type="password"]:not(.browser-default).valid,
.md-form input[type="password"]:not(.browser-default):focus.valid,
.md-form input[type="email"]:not(.browser-default).valid,
.md-form input[type="email"]:not(.browser-default):focus.valid,
.md-form input[type="url"]:not(.browser-default).valid,
.md-form input[type="url"]:not(.browser-default):focus.valid,
.md-form input[type="time"]:not(.browser-default).valid,
.md-form input[type="time"]:not(.browser-default):focus.valid,
.md-form input[type="date"]:not(.browser-default).valid,
.md-form input[type="date"]:not(.browser-default):focus.valid,
.md-form input[type="datetime"]:not(.browser-default).valid,
.md-form input[type="datetime"]:not(.browser-default):focus.valid,
.md-form input[type="datetime-local"]:not(.browser-default).valid,
.md-form input[type="datetime-local"]:not(.browser-default):focus.valid,
.md-form input[type="tel"]:not(.browser-default).valid,
.md-form input[type="tel"]:not(.browser-default):focus.valid,
.md-form input[type="number"]:not(.browser-default).valid,
.md-form input[type="number"]:not(.browser-default):focus.valid,
.md-form input[type="search"]:not(.browser-default).valid,
.md-form input[type="search"]:not(.browser-default):focus.valid,
.md-form input[type="phone"]:not(.browser-default).valid,
.md-form input[type="phone"]:not(.browser-default):focus.valid,
.md-form input[type="search-md"].valid,
.md-form input[type="search-md"]:focus.valid,
.md-form textarea.md-textarea.valid,
.md-form textarea.md-textarea:focus.valid {
  border-bottom: 1px solid #00c851;
  -webkit-box-shadow: 0 1px 0 0 #00c851;
  box-shadow: 0 1px 0 0 #00c851;
}
.md-form input:not([type]):focus:not([readonly]),
.md-form input[type="text"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="password"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="email"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="url"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="time"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="date"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="datetime"]:not(.browser-default):focus:not([readonly]),
.md-form
  input[type="datetime-local"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="tel"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="number"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="search"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="phone"]:not(.browser-default):focus:not([readonly]),
.md-form input[type="search-md"]:focus:not([readonly]),
.md-form textarea.md-textarea:focus:not([readonly]) {
  border-bottom: 1px solid #4285f4;
  -webkit-box-shadow: 0 1px 0 0 #4285f4;
  box-shadow: 0 1px 0 0 #4285f4;
}
.md-form input:not([type]),
.md-form input[type="text"]:not(.browser-default),
.md-form input[type="password"]:not(.browser-default),
.md-form input[type="email"]:not(.browser-default),
.md-form input[type="url"]:not(.browser-default),
.md-form input[type="time"]:not(.browser-default),
.md-form input[type="date"]:not(.browser-default),
.md-form input[type="datetime"]:not(.browser-default),
.md-form input[type="datetime-local"]:not(.browser-default),
.md-form input[type="tel"]:not(.browser-default),
.md-form input[type="number"]:not(.browser-default),
.md-form input[type="search"]:not(.browser-default),
.md-form input[type="phone"]:not(.browser-default),
.md-form input[type="search-md"],
.md-form textarea.md-textarea {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  background-color: transparent;
  border: none;
  border-bottom-color: currentcolor;
  border-bottom-style: none;
  border-bottom-width: medium;
  border-bottom: 1px solid #ced4da;
  border-radius: 0;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}
.md-form .form-control:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
}
*/ .md-form .form-control {
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
}
.md-form .validate {
  margin-bottom: 2.5rem;
}
.md-form .form-control {
  height: auto;
  padding: 0.6rem 0 0.4rem 0;
  margin: 0 0 0.5rem 0;
  margin-bottom: 0.5rem;
  background-color: transparent;
  border-radius: 0;
}
.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
/* .form-control:focus-visible {
  color: transparent;
  text-shadow: 0 0 0 #495057;
} */
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
*,
::after,
::before {
  box-sizing: border-box;
}
.card {
  font-weight: 400;
}
.card {
  word-wrap: break-word;
}

.card .md-form label {
  font-weight: 300;
}
.md-form > label {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* .md-form label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1rem;
  color: #757575;
  cursor: text;
  -webkit-transition: color 0.2s ease-out, -webkit-transform 0.2s ease-out;
  transition: color 0.2s ease-out, -webkit-transform 0.2s ease-out;
  transition: transform 0.2s ease-out, color 0.2s ease-out;
  transition: transform 0.2s ease-out, color 0.2s ease-out,
    -webkit-transform 0.2s ease-out;
  -webkit-transform: translateY(12px);
  transform: translateY(12px);
  -webkit-transform-origin: 0% 100%;
  transform-origin: 0% 100%;
} */
.md-form label {
  font-size: 1rem;
}

.md-form label.active {
  -webkit-transform: translateY(-14px) scale(0.8);
  transform: translateY(-14px) scale(0.8);
}
.md-form label.active {
  font-size: 1rem;
}
</style>
