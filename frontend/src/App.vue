<template>
  <div>
    <div id="mobileScrollTarget"></div>

    <div id="app" v-cloak>
      <div v-if="navigationState == true">
        <AutoLogout />
      </div>

      <div v-if="navigationState == true">
        <MainNavbar v-cloak></MainNavbar>
      </div>

      <div class="pages-inner">
        <transition
          name="fade"
          mode="out-in"
          @beforeLeave="beforeLeave"
          @enter="enter"
          @afterEnter="afterEnter"
        >
          <router-view />
        </transition>
      </div>

      <footer
        v-if="navigationState == true"
        class="footer-bs"
        style="
          min-height: 300px;
          background-size: cover;
          background-position: right;
          background-repeat: no-repeat;
        "
        :style="{
          backgroundImage: 'url(' + require('@/assets/footerbg.svg') + ')',
        }"
      >
        <div class="container">
          <div class="row">
            <div class="col-md-6 footer-social animated fadeIn">
              <h3>Tools & Resources</h3>
              <div class="row">
                <div class="col col-6 col-md-6 footer-social animated fadeIn">
                  <ul class="pages">
                    <li>
                      <span class="material-icons">home</span>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <span class="material-icons"> public </span>
                      <a href="/ac-list">AC Territories</a>
                    </li>
                  </ul>
                </div>
                <div
                  class="col col-6 col-md-6 footer-social animated fadeIn"
                ></div>
              </div>
            </div>
          </div>

          <hr style="border-top: solid 1px rgba(255, 255, 255, 0.1)" />
          <div class="text-center">
            <ul class="ls-none"></ul>
          </div>

          <div class="text-center copyright">
            <p>
              <small> Copyright © {{ getyear }} All Rights Reserved </small>
            </p>
          </div>
        </div>

        <!--	<div class="chat-box bounce">
				<i class="material-icons">sms</i>
			</div>
			-->
      </footer>
    </div>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import AutoLogout from "@/components/AutoLogout";

export default {
  name: "App",
  components: {
    MainNavbar,
    AutoLogout,
  },
  data() {
    return {
      prevHeight: 0,
    };
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
  },
  computed: {
    getyear() {
      return new Date().getFullYear();
    },
    navigationState() {
      return this.$store.state.nav;
    },
    activity() {
      return this.$store.state.idleVue.isIdle;
    },
  },

  mounted() {
    if (this.$store.state.isLoggedIn) {
      this.$store.commit("SET_EO_COUNT");
      this.$store.commit("SET_NEW_POST_COUNT");
    }
  },
  watch: {},
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
@import "@/assets/scss/main.scss";
.pages i {
  color: #b5b5b5;
  margin-right: 5px;
}
.pages button {
  color: #b5b5b5;
  list-style-type: none;
  padding: 0px;
  -webkit-appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 300 !important;
  transition: color 0.5s ease;
}
.pages button:hover {
  text-decoration: none;
  color: #fff;
}
.pages button:active {
  text-decoration: none;
  color: #fff;
}
.pages button:hover i {
  text-decoration: none !important;
}
.pages button:active i {
  text-decoration: none !important;
}

.pages span {
  color: #b5b5b5;
  margin-right: 5px;
}
.pages a {
  transition: color 0.5s ease;
}
.pages a:hover {
  color: #fff;
  text-decoration: none;
}
.pages a:active {
  color: #fff;
  text-decoration: none;
}
.pages a:hover {
  color: #fff;
  text-decoration: none;
}
.pages a:active {
  color: #fff;
  text-decoration: none;
}
.table-striped a:visited {
  color: #4d5967 !important;
}
footer h3 {
  color: #b5b5b5;
}
.terms a {
  color: #b5b5b5;
  transition: color 0.5s ease;
}
.terms a:hover {
  color: #fff;
  text-decoration: none;
}
.terms a:active {
  color: #b5b5b5;
  text-decoration: none;
}
.ls-none {
  list-style-type: none;
  padding-left: 0;
}
.ls-none li {
  display: inline-block;
  margin-right: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  padding-right: 20px;
  line-height: 1;
}
.ls-none li:last-child {
  border-right: none;
}
@media all and (max-width: 767px) {
  .ls-none li:nth-child(2) {
    border-right: none;
  }
}

@media all and (max-width: 552px) {
  .ls-none li {
    display: block;
    margin-right: 0px;
    border-right: none;
    margin-left: 0;
    padding-right: 0px;
    padding-left: 0;
    margin-bottom: 10px;
  }
}
/*
.ls-none li span {
    border-radius: 50%;
    border: 1px dashed black;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
    background-color: #fff;
    display: inline-block;
    position: relative;
    text-align: center;
}

.ls-none li:before {
    content: '';
    position: absolute;
    top: 0;
    width: 1px;
    height: 100%;
    left: 15px;
    background: #000;
    z-index: -1;
}

.ls-none li:last-child:before {
    display: none;
}
*/
/*
 * CKEditor 5 (v28.0.0) content styles.
 * Generated on Mon, 07 Jun 2021 06:33:15 GMT.
 * For more information, check out https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/content-styles.html
 */

:root {
  --ck-color-mention-background: hsla(341, 100%, 30%, 0.1);
  --ck-color-mention-text: hsl(341, 100%, 30%);
  --ck-color-table-caption-background: hsl(0, 0%, 97%);
  --ck-color-table-caption-text: hsl(0, 0%, 20%);
  --ck-highlight-marker-blue: hsl(201, 97%, 72%);
  --ck-highlight-marker-green: hsl(120, 93%, 68%);
  --ck-highlight-marker-pink: hsl(345, 96%, 73%);
  --ck-highlight-marker-yellow: hsl(60, 97%, 73%);
  --ck-highlight-pen-green: hsl(112, 100%, 27%);
  --ck-highlight-pen-red: hsl(0, 85%, 49%);
  --ck-image-style-spacing: 1.5em;
  --ck-todo-list-checkmark-size: 16px;
}

/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-yellow {
  background-color: var(--ck-highlight-marker-yellow);
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-green {
  background-color: var(--ck-highlight-marker-green);
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-pink {
  background-color: var(--ck-highlight-marker-pink);
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-blue {
  background-color: var(--ck-highlight-marker-blue);
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .pen-red {
  color: var(--ck-highlight-pen-red);
  background-color: transparent;
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .pen-green {
  color: var(--ck-highlight-pen-green);
  background-color: transparent;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-tiny {
  font-size: 0.7em;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-small {
  font-size: 0.85em;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-big {
  font-size: 1.4em;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-huge {
  font-size: 1.8em;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-side {
  float: right;
  margin-left: var(--ck-image-style-spacing);
  max-width: 50%;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-left {
  float: left;
  margin-right: var(--ck-image-style-spacing);
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-center {
  margin-left: auto;
  margin-right: auto;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-right {
  float: right;
  margin-left: var(--ck-image-style-spacing);
}
/* ckeditor5-image/theme/image.css */
.ck-content .image {
  display: table;
  clear: both;
  text-align: center;
  margin: 1em auto;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  min-width: 50px;
}
/* ckeditor5-image/theme/imagecaption.css */
.ck-content .image > figcaption {
  display: table-caption;
  caption-side: bottom;
  word-break: break-word;
  color: hsl(0, 0%, 20%);
  background-color: hsl(0, 0%, 97%);
  padding: 0.6em;
  font-size: 0.75em;
  outline-offset: -1px;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized {
  max-width: 100%;
  display: block;
  box-sizing: border-box;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized img {
  width: 100%;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized > figcaption {
  display: block;
}
/* ckeditor5-language/theme/language.css */
.ck-content span[lang] {
  font-style: italic;
}
/* ckeditor5-code-block/theme/codeblock.css */
.ck-content pre {
  padding: 1em;
  color: hsl(0, 0%, 20.8%);
  background: hsla(0, 0%, 78%, 0.3);
  border: 1px solid hsl(0, 0%, 77%);
  border-radius: 2px;
  text-align: left;
  direction: ltr;
  tab-size: 4;
  white-space: pre-wrap;
  font-style: normal;
  min-width: 200px;
}
/* ckeditor5-code-block/theme/codeblock.css */
.ck-content pre code {
  background: unset;
  padding: 0;
  border-radius: 0;
}
/* ckeditor5-horizontal-line/theme/horizontalline.css */
.ck-content hr {
  margin: 15px 0;
  height: 4px;
  background: hsl(0, 0%, 87%);
  border: 0;
}
/* ckeditor5-html-embed/theme/htmlembed.css */
.ck-content .raw-html-embed {
  margin: 1em auto;
  min-width: 15em;
  font-style: normal;
}
/* ckeditor5-block-quote/theme/blockquote.css */
.ck-content blockquote {
  overflow: hidden;
  padding-right: 1.5em;
  padding-left: 1.5em;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  border-left: solid 5px hsl(0, 0%, 80%);
}
/* ckeditor5-block-quote/theme/blockquote.css */
.ck-content[dir="rtl"] blockquote {
  border-left: 0;
  border-right: solid 5px hsl(0, 0%, 80%);
}
/* ckeditor5-basic-styles/theme/code.css */
.ck-content code {
  background-color: hsla(0, 0%, 78%, 0.3);
  padding: 0.15em;
  border-radius: 2px;
}
/* ckeditor5-table/theme/table.css */
.ck-content .table {
  margin: 1em auto;
  display: table;
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  height: 100%;
  border: 1px double hsl(0, 0%, 70%);
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table td,
.ck-content .table table th {
  min-width: 2em;
  padding: 0.4em;
  border: 1px solid hsl(0, 0%, 75%);
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table th {
  font-weight: bold;
  background: hsla(0, 0%, 0%, 5%);
}
/* ckeditor5-table/theme/table.css */
.ck-content[dir="rtl"] .table th {
  text-align: right;
}
/* ckeditor5-table/theme/table.css */
.ck-content[dir="ltr"] .table th {
  text-align: left;
}
/* ckeditor5-table/theme/tablecaption.css */
.ck-content .table > figcaption {
  display: table-caption;
  caption-side: top;
  word-break: break-word;
  text-align: center;
  color: var(--ck-color-table-caption-text);
  background-color: var(--ck-color-table-caption-background);
  padding: 0.6em;
  font-size: 0.75em;
  outline-offset: -1px;
}
/* ckeditor5-page-break/theme/pagebreak.css */
.ck-content .page-break {
  position: relative;
  clear: both;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* ckeditor5-page-break/theme/pagebreak.css */
.ck-content .page-break::after {
  content: "";
  position: absolute;
  border-bottom: 2px dashed hsl(0, 0%, 77%);
  width: 100%;
}
/* ckeditor5-page-break/theme/pagebreak.css */
.ck-content .page-break__label {
  position: relative;
  z-index: 1;
  padding: 0.3em 0.6em;
  display: block;
  text-transform: uppercase;
  border: 1px solid hsl(0, 0%, 77%);
  border-radius: 2px;
  font-family: Helvetica, Arial, Tahoma, Verdana, Sans-Serif;
  font-size: 0.75em;
  font-weight: bold;
  color: hsl(0, 0%, 20%);
  background: hsl(0, 0%, 100%);
  box-shadow: 2px 2px 1px hsla(0, 0%, 0%, 0.15);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* ckeditor5-media-embed/theme/mediaembed.css */
.ck-content .media {
  clear: both;
  margin: 1em 0;
  display: block;
  min-width: 15em;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list {
  list-style: none;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list li {
  margin-bottom: 5px;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list li .todo-list {
  margin-top: 5px;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input {
  -webkit-appearance: none;
  display: inline-block;
  position: relative;
  width: var(--ck-todo-list-checkmark-size);
  height: var(--ck-todo-list-checkmark-size);
  vertical-align: middle;
  border: 0;
  left: -25px;
  margin-right: -15px;
  right: 0;
  margin-left: 0;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input::before {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  border: 1px solid hsl(0, 0%, 20%);
  border-radius: 2px;
  transition: 250ms ease-in-out box-shadow, 250ms ease-in-out background,
    250ms ease-in-out border;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input::after {
  display: block;
  position: absolute;
  box-sizing: content-box;
  pointer-events: none;
  content: "";
  left: calc(var(--ck-todo-list-checkmark-size) / 3);
  top: calc(var(--ck-todo-list-checkmark-size) / 5.3);
  width: calc(var(--ck-todo-list-checkmark-size) / 5.3);
  height: calc(var(--ck-todo-list-checkmark-size) / 2.6);
  border-style: solid;
  border-color: transparent;
  border-width: 0 calc(var(--ck-todo-list-checkmark-size) / 8)
    calc(var(--ck-todo-list-checkmark-size) / 8) 0;
  transform: rotate(45deg);
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input[checked]::before {
  background: hsl(126, 64%, 41%);
  border-color: hsl(126, 64%, 41%);
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input[checked]::after {
  border-color: hsl(0, 0%, 100%);
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label .todo-list__label__description {
  vertical-align: middle;
}
/* ckeditor5-mention/theme/mention.css */
.ck-content .mention {
  background: var(--ck-color-mention-background);
  color: var(--ck-color-mention-text);
}
@media print {
  /* ckeditor5-page-break/theme/pagebreak.css */
  .ck-content .page-break {
    padding: 0;
  }
  /* ckeditor5-page-break/theme/pagebreak.css */
  .ck-content .page-break::after {
    display: none;
  }
}
</style>
