<template>
  <div>
    <transition name="menu-popover" v-if="xlPreview.length">
      <div v-if="xlPreview" class="lightbox" style="z-index: 10003">
        <h2 class="closeX" @click="closeLightbox()">
          <a>&#215;</a>
        </h2>
        <iframe
          :src="
            'https://view.officeapps.live.com/op/embed.aspx?src=' + xlPreview
          "
          width="50%"
          height="50%"
          frameborder="0"
        >
        </iframe>
      </div>
    </transition>

    <!-- Mobile Header -->
    <div class="wsmobileheader clearfix" style="position: relative">
      <a class="wsanimated-arrow" @click="bodyToggleNew()">
        <span></span>
      </a>

      <span class="smllogo">
        <router-link
          to="/"
          :class="{ active: activeNav === 'home' }"
          class="no-dropdown"
        >
          <img src="@/assets/spacenet-logo.svg" width="80" alt />
        </router-link>
      </span>
    </div>
    <!-- Mobile Header -->

    <div class="wsmainfull clearfix" style="position: relative">
      <div class="wsmainwp clearfix">
        <div class="desktoplogo">
          <router-link
            to="/"
            :class="{ active: activeNav === 'home' }"
            class="no-dropdown"
          >
            <img src="@/assets/spacenet-logo.svg" alt style="max-width: 50px" />
          </router-link>
        </div>

        <nav class="wsmenu clearfix">
          <ul class="wsmenu-list">
            <li class="home-btn-link">
              <router-link
                to="/home"
                :class="{ active: activeNav === 'home' }"
                class="no-dropdown"
              >
                <!-- <i class="material-icons">help</i> -->
                Home
              </router-link>
            </li>

            <li id="v-step-3" aria-haspopup="true">
              <a href="#" :class="{ active: activeNav === 'tools' }">
                Tools
                <span class="wsarrow"></span>
              </a>
              <ul class="sub-menu">
                <li aria-haspopup="true">
                  <router-link
                    to="/ac-list"
                    :class="{ active: activeNav === 'tools' }"
                    class="d-flex"
                  >
                    <i class="material-icons">keyboard_arrow_right</i> AC
                    LOCATOR
                  </router-link>
                </li>
              </ul>
            </li>

            <li id="v-step-5" aria-haspopup="true">
              <a href="#" :class="{ active: activeNav === 'user' }">
                User Name
                <span
                  v-if="
                    this.$store.state.expeditedOrderCount !== null &&
                    this.$store.state.newPostCount !== 0 &&
                    this.$store.state.collaborateView != true &&
                    !this.$store.getters.hideOrders &&
                    this.$store.getters.isExpeditedOrders
                  "
                  class="badge badge-dark"
                  style="margin-left: 5px"
                  >{{
                    this.$store.state.expeditedOrderCount +
                    this.$store.state.newPostCount
                  }}</span
                >

                <span
                  v-else-if="
                    this.$store.state.expeditedOrderCount !== null &&
                    this.$store.state.collaborateView != true &&
                    !this.$store.getters.hideOrders &&
                    this.$store.getters.isExpeditedOrders
                  "
                  class="badge badge-dark"
                  style="margin-left: 5px"
                  >{{ this.$store.state.expeditedOrderCount }}</span
                >

                <span
                  v-else-if="this.$store.state.newPostCount !== 0"
                  class="badge badge-dark"
                  style="margin-left: 5px"
                  >{{ this.$store.state.newPostCount }}</span
                >
                <span v-else style="margin-left: 5px"></span>

                <span class="wsarrow"></span>
              </a>
              <ul class="sub-menu notification-dropdown">
                <li
                  v-if="this.$store.state.tour"
                  @click="hideHelp"
                  aria-haspopup="true"
                  style="cursor: pointer"
                  class="tourBtns"
                >
                  <a> <i class="material-icons">help_outline</i> Hide Help </a>
                </li>

                <li
                  v-else
                  @click="showHelp"
                  aria-haspopup="true"
                  style="cursor: pointer"
                  class="tourBtns"
                >
                  <a> <i class="material-icons">help_outline</i> Show Help </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- main full -->
  </div>
</template>
<script>
import md5 from "md5";
import $ from "jquery";
import "@/assets/js/nav.js";

export default {
  name: "MainNavbar",
  components: {},
  data() {
    return {
      open: false,
      showMenu: false,
      extraNavClasses: "",
      currentScrollValue: 0,
      widensecret: process.env.VUE_APP_WIDEN_SECRET,
      widenaddress: process.env.VUE_APP_WIDEN_ADDRESS,
      computedURL: "",
      alerts: 0,
      xlPreview: "",
    };
  },
  computed: {
    activeNav() {
      return this.$store.state.activePage;
    },
  },
  methods: {
    firstLoad: function () {},
    showHelp: function () {
      this.$store.commit("showTour");
      this.$noty.success(
        "The help tour has been enabled, you can disable it by clicking 'Skip tour' or 'Hide Help' in the menu under your name!"
      );
    },
    hideHelp: function () {
      this.$store.commit("hideTour");
      this.$noty.success(
        "The help tour has been disabled, if you need it again, you can enable it in the top menu under your name!"
      );
    },
    bodyToggleNew() {
      const el = document.body;
      if (el.classList.contains("wsactive")) {
        el.classList.remove("wsactive");
      } else {
        el.classList.add("wsactive");
      }
    },
    bodyRemove() {
      const el = document.body;
      el.classList.remove("wsactive");
    },
    toggleBodyClass(addRemoveClass, className) {
      const el = document.body;
      if (addRemoveClass === "addClass") {
        el.classList.add(className);
        this.open = true;
      } else {
        el.classList.remove(className);
        this.open = false;
      }
    },
  },
  mounted() {
    this.toggleBodyClass("removeClass", "wsactive");
    this.computedURL = this.calcURL();
    /* global jQuery */
    /* global document */

    jQuery(
      (function () {
        "use strict";

        document.addEventListener("touchstart", function () {}, false);
        jQuery(function () {
          jQuery("body").wrapInner('<div class="wsmenucontainer" />');
          jQuery('<div class="overlapblackbg"></div>').prependTo(".wsmenu");

          jQuery(".overlapblackbg").click(function () {
            jQuery("body").removeClass("wsactive");
          });

          jQuery(".wsmenu > .wsmenu-list > li")
            .has(".sub-menu")
            .prepend(
              '<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>'
            );
          jQuery(".wsmenu > .wsmenu-list > li")
            .has(".wsmegamenu")
            .prepend(
              '<span class="wsmenu-click"><i class="wsmenu-arrow fa fa-angle-down"></i></span>'
            );

          jQuery(".wsmenu-click").click(function () {
            jQuery(this)
              .toggleClass("ws-activearrow")
              .parent()
              .siblings()
              .children()
              .removeClass("ws-activearrow");
            jQuery(".wsmenu > .wsmenu-list > li > .sub-menu, .wsmegamenu")
              .not(
                jQuery(this).siblings(
                  ".wsmenu > .wsmenu-list > li > .sub-menu, .wsmegamenu"
                )
              )
              .slideUp("fast");
            jQuery(this).siblings(".sub-menu").slideToggle("fast");
            jQuery(this).siblings(".wsmegamenu").slideToggle("fast");
          });

          jQuery(".wsmenu > .wsmenu-list > li > ul > li")
            .has(".sub-menu")
            .prepend(
              '<span class="wsmenu-click02"><i class="wsmenu-arrow fa fa-angle-down"></i></span>'
            );
          jQuery(".wsmenu > .wsmenu-list > li > ul > li > ul > li")
            .has(".sub-menu")
            .prepend(
              '<span class="wsmenu-click02"><i class="wsmenu-arrow fa fa-angle-down"></i></span>'
            );

          //close the nav on click
          jQuery(".sub-menu > li > a").click(function () {
            jQuery("body").removeClass("wsactive");
            jQuery(".wsmenu-list > li > span").removeClass("ws-activearrow");
            //jQuery(".wsmenu-list > li > span").removeClass("wsmenu-click");
          });

          //close the nav on click
          jQuery(".no-dropdown").click(function () {
            jQuery("body").removeClass("wsactive");
            jQuery(".wsmenu-list > li > span").removeClass("ws-activearrow");
            //jQuery(".wsmenu-list > li > span").removeClass("wsmenu-click");
          });

          jQuery(".wsmenu-click02").click(function () {
            jQuery(this).children(".wsmenu-arrow").toggleClass("wsmenu-rotate");
            jQuery(this).siblings("li > .sub-menu").slideToggle("slow");
          });

          jQuery(window).on("resize", function () {
            if (jQuery(window).outerWidth() < 992) {
              jQuery(".wsmenu").css("height", jQuery(this).height() + "px");
              jQuery(".wsmenucontainer").css(
                "min-width",
                jQuery(this).width() + "px"
              );
            } else {
              jQuery(".wsmenu").removeAttr("style");
              jQuery(".wsmenucontainer").removeAttr("style");
              jQuery("body").removeClass("wsactive");
              jQuery(
                ".wsmenu > .wsmenu-list > li > .wsmegamenu, .wsmenu > .wsmenu-list > li > ul.sub-menu, .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu, .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li > ul.sub-menu"
              ).removeAttr("style");
              jQuery(".wsmenu-click").removeClass("ws-activearrow");
              jQuery(".wsmenu-click02 > i").removeClass("wsmenu-rotate");
            }
          });

          jQuery(window).trigger("resize");
        });

        /* Top Fixed */

        jQuery(window).scroll(function () {
          var sticky = jQuery(".wsmainfull"),
            scroll = jQuery(window).scrollTop();
          if (scroll >= 5) sticky.addClass("wsfixed");
          else sticky.removeClass("wsfixed");
        });

        /* End Top Fixed */
      })()
    );
  },
  beforeDestroy() {},
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
};
</script>
<style>
/*start whole styles */
/* begin main menu styles */
/* ================== Desktop Base CSS  ================== */
.wsmenu html,
.wsmenu body,
.wsmenu iframe,
.wsmenu h1,
.wsmenu h2,
.wsmenu h3,
.wsmenu h4,
.wsmenu h5,
.wsmenu h6 {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  font-family: Helvetica, sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  font-smooth: antialiased;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-font-smoothing: subpixel-antialiased;
  font-smooth: subpixel-antialiased;
}

.wsmenu .cl {
  clear: both;
}

.wsmenu img,
object,
embed,
video {
  border: 0 none;
  max-width: 100%;
}

.wsmenu a:focus {
  outline: none;
}

.wsmenu:before,
.wsmenu:after {
  content: "";
  display: table;
}

.wsmenu:after {
  clear: both;
}

/* ================== Desktop Main Menu CSS ================== */
/* Top Fixed Effects */
.wsmainfull.wsfixed {
  position: fixed;
  background-color: #fff;
  -webkit-transition: height 0.4s ease, opacity 0.3s ease;
  -o-transition: height 0.4s ease, opacity 0.3s ease;
  transition: height 0.4s ease, opacity 0.3s ease;
  border-bottom: none;
  top: 0;
  z-index: 1000;
}

.wsmainfull.wsfixed .wsmenu > .wsmenu-list > li > a {
  padding-top: 7px;
  padding-bottom: 6px;
  line-height: 37px;
  -webkit-transition: margin 0.4s ease, padding 0.4s ease;
  -o-transition: margin 0.4s ease, padding 0.4s ease;
  transition: margin 0.4s ease, padding 0.4s ease;
}

.wsmainfull.wsfixed .desktoplogo {
  width: 110px;
  padding: 10px 0px;
  -webkit-transition: margin 0.4s ease, padding 0.4s ease;
  -o-transition: margin 0.4s ease, padding 0.4s ease;
  transition: margin 0.4s ease, padding 0.4s ease;
  -webkit-transition: margin 0.4s ease, padding 0.4s ease;
  -o-transition: margin 0.4s ease, padding 0.4s ease;
  transition: margin 0.4s ease, padding 0.4s ease;
}

.wsmainfull.wsfixed .wsmenu > .wsmenu-list > li > a .wsarrow:after {
  top: 23px;
  border-top-color: #d5d5d5;
}

.wsmainfull.wsfixed .wsmenu > .wsmenu-list > li.rightmenu > .topmenusearch {
  margin-top: 7px;
}

.wsmainfull.wsfixed .wsmenu > .wsmenu-list > li.carticon em.roundpoint {
  top: 9px;
}

.wsmainfull.wsfixed .wsmenu > .wsmenu-list > li > ul.sub-menu {
  top: 52px;
}

.wsmainfull.wsfixed .wsmenu > .wsmenu-list > li > .wsmegamenu {
  top: 52px;
}

.wsmainfull.wsfixed .wssearch {
  padding-top: 17px;
  padding-bottom: 17px;
}

.wsmainfull.wsfixed .wssearch .wssearchform {
  padding-top: 10px;
  padding-bottom: 10px;
}

.wsmainfull.wsfixed .wssearch .wssearchform input {
  height: 35px;
}

.wsmainfull.wsfixed .wssearchform form:before {
  height: 36px;
  line-height: 34px;
}

.wsmainfull.wsfixed .wssearch.wsopensearch .fa-times {
  font-size: 21px;
}

.wsmainfull.wsfixed .wssearch .fa {
  font-size: 19px;
}

.wsmainfull.wsfixed .wssearch .fa.fa-search {
  padding-top: 0px;
}

.wsmainfull.wsfixed .wssearch .fa-times {
  font-size: 16px;
}

/* Top Fixed Effects */
.wsmenucontainer {
  background-size: cover;
  /*background-image: url(../images/bg01.jpg);*/
  overflow: hidden;
  background-attachment: fixed;
  background-position: 50% 0;
  background-repeat: no-repeat;
}

.wsmainfull {
  width: 100%;
}

.wsmainwp {
  margin: 0 auto;
  padding: 0px 10px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.desktoplogo {
  padding: 12px 0px 0px 0px;
  margin: 0;
  float: left;
  margin-left: 17px;
}

.desktoplogo img {
  width: 100%;
}

.wsmenu {
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  font-size: 14px;
  padding: 0;
  float: right;
  display: block;
  position: relative;
}

.wsmenu > .wsmenu-list {
  text-align: left;
  margin: 0 auto 0 auto;
  width: 100%;
  display: block;
  padding: 0;
}

.wsmenu > .wsmenu-list > li {
  text-align: center;
  display: block;
  padding: 0;
  margin: 0;
  float: left;
}

.wsmenu > .wsmenu-list > li > a {
  display: block;
  padding: 11px 22px 11px 22px;
  line-height: 50px;
  text-decoration: none;
  position: relative;
  border-bottom: solid 3px #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wsmenu > .wsmenu-list > li > a > .wsarrow {
  padding: 0px 0px 0px 14px;
  display: inline-block;
}

.wsmenu > .wsmenu-list > li:last-child > a {
  border-right: 0px;
  cursor: pointer;
}

.wsmenu > .wsmenu-list > li a.menuhomeicon {
  padding-left: 29px;
  padding-right: 29px;
}

.wsmenu > .wsmenu-list > li.carticon a {
  padding: 11px 15px 11px 23px;
  text-align: center;
}

.wsmenu > .wsmenu-list > li.carticon a .fa {
  font-size: 16px;
}

.wsmenu > .wsmenu-list > li.carticon em.roundpoint {
  position: absolute;
  top: 22px;
  width: 16px;
  height: 16px;
  background-color: #da4b38;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  font-size: 9px;
  text-align: center;
  font-style: normal;
  line-height: 16px;
  color: #fff;
  right: 18px;
}

.wsmenu > .wsmenu-list > li.carticon > a > .mobiletext {
  display: none;
}

.wsmenu > .wsmenu-list > li > a .fa {
  display: inline-block;
  font-size: 15px;
  line-height: inherit;
  margin-right: 12px;
  vertical-align: top;
}

.wsmenu > .wsmenu-list > li > a .fa.fa-phone {
  font-size: 18px;
}

.wsmenu > .wsmenu-list > li > a .mobiletext {
  display: none;
}

.wsmenu > .wsmenu-list > li > a .fa.fa-home {
  margin-right: 0px;
  font-size: 17px;
}

.wsmenu > .wsmenu-list > li > a .wsarrow:after {
  border-left: 4px solid rgba(0, 0, 0, 0);
  border-right: 4px solid rgba(0, 0, 0, 0);
  border-top: 4px solid;
  content: "";
  float: right;
  right: 17px;
  height: 0;
  margin: 0 0 0 14px;
  position: absolute;
  text-align: right;
  top: 33px;
  width: 0;
}

/* Desktop Search Bar */
.wssearch {
  background-color: transparent;
  float: right;
  padding: 22px 25px 28px 25px;
  cursor: pointer;
}

.wssearch .fa {
  font-size: 19px;
  color: #727272;
  float: right;
}

.wssearch .fa.fa-search {
  padding-top: 5px;
}

.wssearch .fa.fa-times {
  padding-top: 3px;
}

.wssearchform {
  display: none;
  position: absolute;
  width: 100%;
  line-height: 44px;
  top: 0px;
  left: 0;
  padding: 14px 15px;
  cursor: default;
}

.wssearch.wsopensearch {
  width: 100%;
  background-color: #ddd;
}

.wssearch.wsopensearch .wssearchform {
  display: block;
}

.wssearchform form {
  width: calc((100% - 10px) - 45px);
  display: block;
  position: relative;
}

.wssearchform form:before {
  content: "\f002";
  font-family: FontAwesome;
  left: 12px;
  position: absolute;
  top: 0;
  color: #777777;
  height: 47px;
  line-height: 46px;
}

.wssearchform input {
  width: 100%;
  height: 47px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  border: solid 0px;
  text-indent: 33px;
  margin: 0px;
  line-height: 18px;
  padding: 0px;
  display: block;
}

.wssearch.wsopensearch {
  left: 0px;
  right: auto;
  top: 0;
  width: 100%;
  position: absolute;
  z-index: 1000;
}

.wssearch .fa-times {
  display: none;
}

.wssearch.wsopensearch .fa-times {
  display: inline-block;
  /*float: right;*/
  margin-top: 0;
  font-size: 25px;
  cursor: pointer;
}

.wssearch.wsopensearch .fa-search {
  display: none;
}

/* End Desktop Search Bar */
/* ================== Desktop Drop Down Menu CSS ================== */
.wsmenu > .wsmenu-list > li > ul.sub-menu {
  position: absolute;
  top: 75px;
  z-index: 1000;
  margin: 0px;
  padding: 0px;
  min-width: 190px;
  background-color: #fff;
  border: solid 1px #eeeeee;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li {
  position: relative;
  margin: 0px;
  padding: 0px;
  display: block;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > a {
  background-image: none;
  color: #666666;
  border-right: 0 none;
  text-align: left;
  display: block;
  line-height: 22px;
  padding: 8px 12px;
  text-transform: none;
  font-size: 13px;
  letter-spacing: normal;
  border-right: 0px solid;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > a:hover {
  text-decoration: none;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > a > .fa {
  margin-right: 9px;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu {
  min-width: 220px;
  position: absolute;
  left: 100%;
  top: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border: solid 1px #eeeeee;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li {
  position: relative;
  margin: 0px;
  padding: 0px;
  display: block;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li > a {
  background-image: none;
  color: #666666;
  border-right: 0 none;
  text-align: left;
  display: block;
  line-height: 22px;
  padding: 8px 12px;
  text-transform: none;
  font-size: 13px;
  letter-spacing: normal;
  border-right: 0px solid;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li > a:hover {
  text-decoration: none;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li > a > .fa {
  margin-right: 9px;
}

.wsmenu
  > .wsmenu-list
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu {
  min-width: 220px;
  position: absolute;
  left: 100%;
  top: 0;
  margin: 0px;
  list-style: none;
  padding: 0px;
  background-color: #fff;
  border: solid 1px #eeeeee;
}

.wsmenu
  > .wsmenu-list
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li {
  position: relative;
  margin: 0px;
  padding: 0px;
  display: block;
}

.wsmenu
  > .wsmenu-list
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li
  > a {
  background-image: none;
  color: #666666;
  border-right: 0 none;
  text-align: left;
  display: block;
  line-height: 22px;
  padding: 8px 12px;
  text-transform: none;
  font-size: 13px;
  letter-spacing: normal;
  border-right: 0px solid;
}

.wsmenu
  > .wsmenu-list
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li
  > a:hover {
  text-decoration: none;
}

.wsmenu
  > .wsmenu-list
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li
  > a
  > .fa {
  margin-right: 9px;
}

/* ================== Desktop Mega Menus CSS  ================== */
.wsmenu > .wsmenu-list > li > .wsmegamenu {
  width: 100%;
  left: 0px;
  position: absolute;
  top: 75px;
  color: #000;
  z-index: 1000;
  margin: 0px;
  text-align: left;
  padding: 14px 5px;
  font-size: 15px;
  border: solid 1px #eeeeee;
  background-color: #fff;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .title {
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  padding: 9px 5px 9px 0px;
  font-size: 17px;
  color: #424242;
  margin: 0px 0px 7px 0px;
  text-align: left;
  height: 39px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .link-list li {
  display: block;
  text-align: center;
  white-space: nowrap;
  text-align: left;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .link-list li a {
  line-height: 18px;
  border-right: none;
  text-align: left;
  padding: 6px 0px;
  background: #fff;
  background-image: none;
  color: #666666;
  border-right: 0 none;
  display: block;
  background-color: #fff;
  color: #424242;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu li .fa {
  margin-right: 5px;
  text-align: center;
  width: 18px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu li a:hover {
  background: transparent;
  text-decoration: underline;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .link-list li .fa {
  font-size: 11px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu li .fa {
  margin-right: 5px;
  text-align: center;
  width: 18px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .mrgtop {
  margin-top: 15px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .show-grid div {
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: #dbdbdb;
  border: 1px solid #e7e7e7;
  color: #6a6a6a;
  margin: 2px 0px;
  font-size: 13px;
}

/*= Desktop Half Menu CSS =*/
.wsmenu > .wsmenu-list > li > .wsmegamenu.halfmenu {
  width: 40%;
  right: auto;
  left: auto;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu.halfdiv {
  width: 35%;
  right: auto;
  left: auto;
}

/*= Desktop HTML Form Menu CSS =*/
.wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form {
  width: 100%;
  display: block;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form input[type="text"] {
  width: 100%;
  border: 1px solid #e2e2e2;
  color: #000;
  font-size: 13px;
  padding: 8px 5px;
  margin-bottom: 8px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form textarea {
  width: 100%;
  border: 1px solid #e2e2e2;
  color: #000;
  font-size: 13px;
  padding: 8px 5px;
  margin-bottom: 8px;
  min-height: 122px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form input[type="submit"] {
  width: 25%;
  display: block;
  height: 32px;
  float: right;
  border: none;
  margin-right: 15px;
  cursor: pointer;
  background-color: #e1e1e1;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form input[type="button"] {
  width: 25%;
  display: block;
  height: 32px;
  float: right;
  border: none;
  cursor: pointer;
  background-color: #e1e1e1;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .carousel-inner .item img {
  width: 100%;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .carousel-caption {
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 13px;
  height: 31px;
  left: 0;
  padding: 7px 0;
  right: 0;
  width: 100%;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .typography-text {
  padding: 0px 0px;
  font-size: 14px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .typography-text ul {
  padding: 0px 0px;
  margin: 0px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .typography-text p {
  text-align: justify;
  line-height: 24px;
  color: #656565;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .typography-text ul li {
  display: block;
  padding: 2px 0px;
  line-height: 22px;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .typography-text ul li a {
  color: #656565;
}

/* ================== Desktop Extra CSS ================== */
.wsmobileheader {
  display: none;
}

.overlapblackbg {
  opacity: 0;
  visibility: hidden;
}

.wsmenu .wsmenu-click {
  display: none;
}

.wsmenu .wsmenu-click02 {
  display: none;
}

.hometext {
  display: none;
}

/*==============================================================================
                              Start Mobile CSS
===============================================================================*/
/* ================== Mobile Menu Change Brake Point ================== */
@media only screen and (max-width: 991px) {
  /* ================== Mobile Base CSS ================== */
  html {
    overflow: hidden;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }

  body {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  body.wsactive {
    overflow: hidden;
  }

  /* ================== Mobile Main Menu CSS ================== */
  .wssearch {
    padding: 12px 15px 17px 15px;
  }

  .wssearch.wssearchdesktop {
    display: none;
  }

  .wssearchform {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .wssearchform input {
    height: 34px;
  }

  .wssearchform form:before {
    height: 34px;
    line-height: 34px;
  }

  .wssearch.wsopensearch {
    height: 54px;
  }

  .wssearch.wsopensearch .fa-times {
    font-size: 21px;
  }

  .desktoplogo {
    display: none;
  }

  .wsmainfull {
    height: 0;
  }

  .wsactive .wsmenu > .wsmenu-list > li > a.active {
    border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  }

  .wsactive .wsmenu > .wsmenu-list > li:hover > a {
    border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  }

  .wsmenucontainer {
    background-attachment: local;
    background-position: 33% 0%;
  }

  .wsmenu {
    width: 100%;
    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
    left: 0;
    overflow-y: hidden;
    padding: 0;
    top: 0;
    visibility: hidden;
    position: fixed;
    margin: 0px;
  }

  .wsmenu > .wsmenu-list {
    height: auto;
    min-height: 100%;
    width: 240px;
    background: #fff;
    padding-bottom: 0;
    margin-left: -240px;
    display: block;
    text-align: center;
    -webkit-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }

  .wsmenu > .wsmenu-list > li {
    width: 100%;
    display: block;
    float: none;
    border-right: none;
    background-color: transparent;
    position: relative;
    white-space: inherit;
    clear: right;
  }

  .wsmenu > .wsmenu-list > li > a {
    padding: 12px 32px 12px 17px;
    font-size: 14px;
    text-align: left;
    border-right: solid 0px;
    background-color: transparent;
    color: #575757;
    line-height: 25px;
    border-bottom: 1px solid;
    border-bottom-color: rgba(0, 0, 0, 0.13);
    position: static;
  }

  .wsmenu > .wsmenu-list > li > a .fa.fa-home {
    display: none;
  }

  .wsmenu > .wsmenu-list > li.carticon > a > .mobiletext {
    display: inline-block;
  }

  .wsmenu > .wsmenu-list > li.carticon a {
    text-align: left;
    padding: 12px 32px 12px 17px;
  }

  .wsmenu > .wsmenu-list > li.carticon a .fa {
    font-size: 14px;
  }

  .wsmenu > .wsmenu-list > li.carticon em.roundpoint {
    top: 9px;
    right: auto;
    left: 23px;
    background-color: #424242;
  }

  .wsmenu > .wsmenu-list > li a.menuhomeicon {
    padding-left: 17px;
    padding-right: 32px;
  }

  .wsmenu > .wsmenu-list > li > a > .fa {
    font-size: 16px;
    color: #575757;
  }

  .wsmenu > .wsmenu-list > li > a .wsarrow:after {
    display: none;
  }

  .wsmenu > .wsmenu-list > li:hover > a {
    background-color: rgba(0, 0, 0, 0.08);
    text-decoration: none;
  }

  .wsmenu > .wsmenu-list > li > a > .hometext {
    display: inline-block;
  }

  /* ================== Mobile Slide Down Links CSS ================== */
  .wsmenu > .wsmenu-list > li > ul.sub-menu {
    display: none;
    position: relative;
    top: 0px;
    background-color: #fff;
    border: none;
    padding: 0px;
    opacity: 1;
    visibility: visible;
    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
    -webkit-transition: inherit;
    -moz-transition: inherit;
    transition: inherit;
    -webkit-transform-style: flat;
    transform-style: flat;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > a {
    line-height: 20px;
    font-size: 13px;
    padding: 10px 0px 10px 16px;
    padding: 8px 12px;
    color: #383838;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li span + a {
    padding-right: 30px;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > a > .fa {
    display: none;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu {
    width: 100%;
    position: static;
    left: 100%;
    top: 0;
    display: none;
    margin: 0px;
    padding: 0px;
    border: solid 0px;
    transform: none;
    opacity: 1;
    visibility: visible;
    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
    -webkit-transition: inherit;
    -moz-transition: inherit;
    transition: inherit;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li {
    margin: 0px 0px 0px 0px;
    padding: 0px;
    position: relative;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li > a {
    line-height: 20px;
    font-size: 13px;
    padding: 10px 0px 10px 26px;
    color: #383838;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li span + a {
    padding-right: 30px;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li > a > .fa {
    display: none;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li > a:hover {
    background-color: #e7e7e7;
    color: #666666;
    text-decoration: underline;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li > a.active {
    color: #000;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li:hover > a {
    color: #000;
  }

  .wsmenu
    > .wsmenu-list
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu {
    width: 100%;
    position: static;
    left: 100%;
    top: 0;
    display: none;
    margin: 0px;
    padding: 0px;
    border: solid 0px;
    transform: none;
    opacity: 1;
    visibility: visible;
    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
    -webkit-transition: inherit;
    -moz-transition: inherit;
    transition: inherit;
  }

  .wsmenu
    > .wsmenu-list
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li {
    margin: 0px 0px 0px 0px;
  }

  .wsmenu
    > .wsmenu-list
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > a {
    line-height: 20px;
    font-size: 13px;
    padding: 10px 0px 10px 34px;
    color: #383838;
  }

  .wsmenu
    > .wsmenu-list
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    span
    + a {
    padding-right: 30px;
  }

  .wsmenu
    > .wsmenu-list
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > a
    > .fa {
    display: none;
  }

  .wsmenu
    > .wsmenu-list
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > a:hover {
    background-color: #e7e7e7;
    color: #666666;
    text-decoration: underline;
  }

  .wsmenu
    > .wsmenu-list
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > a.active {
    color: #000;
  }

  /* ================== Mobile Mega Menus CSS  ================== */
  .wsmenu > .wsmenu-list > li > .wsmegamenu {
    color: #666666;
    display: none;
    position: relative;
    top: 0px;
    padding: 10px 0px;
    border: solid 0px;
    transform: none;
    opacity: 1;
    visibility: visible;
    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
    -webkit-transition: inherit;
    -moz-transition: inherit;
    transition: inherit;
    border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu.halfmenu {
    width: 100%;
    margin: 0px;
    padding: 5px 0px 10px 0px;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu .title {
    color: #666666;
    font-size: 15px;
    padding: 10px 8px 10px 0px;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu > ul {
    width: 100%;
    margin: 0px;
    padding: 0px;
    font-size: 13px;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu > ul > li > a {
    padding: 9px 14px;
    line-height: normal;
    font-size: 13px;
    background-color: #e7e7e7;
    color: #666666;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu > ul > li > a:hover {
    background-color: #000000;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu ul li.title {
    line-height: 26px;
    color: #666666;
    margin: 0px;
    font-size: 15px;
    padding: 7px 0px;
    background-color: transparent;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu.halfdiv {
    width: 100%;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form {
    padding: 5px 0px 62px 0px;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu .show-grid div {
    margin: 0px;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form input[type="button"] {
    width: 46%;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form input[type="submit"] {
    width: 46%;
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form textarea {
    min-height: 100px;
  }

  /* ================== Mobile Header CSS ================== */
  .wsmobileheader {
    width: 100%;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10002;
    height: 54px;
    background-color: #eaecf0;
    text-align: center;
    -webkit-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  }

  .wsactive .wsmobileheader {
    margin-left: 240px;
    -webkit-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }

  .wsmobileheader .smllogo {
    display: inline-block;
    margin-top: 12px;
  }

  /* Mobile Search Bar*/
  .wsmenu > .wsmenu-list > li.rightmenu > .topmenusearch {
    width: 86%;
    margin: 7% 7%;
    padding: 0px;
  }

  .wsmenu > .wsmenu-list > li.rightmenu > .topmenusearch input {
    border-radius: 50px;
  }

  .wsmenu > .wsmenu-list > li.rightmenu > .topmenusearch input:focus {
    width: 100%;
  }

  .callusbtn {
    color: #848080;
    font-size: 21px;
    position: absolute;
    right: 5px;
    top: 0px;
    transition: all 0.4s ease-in-out 0s;
    z-index: 102;
    padding: 11px 14px;
  }

  .callusbtn .fa {
    vertical-align: top;
    margin-top: 4px;
  }

  .callusbtn:hover .fa {
    color: #a9a9a9;
  }

  /* Mobile Toggle Menu icon (X ICON) */
  .wsanimated-arrow {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 102;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -ms-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }

  .wsanimated-arrow {
    cursor: pointer;
    padding: 14px 35px 16px 0px;
    margin: 7px 0 0 15px;
  }

  .wsanimated-arrow span,
  .wsanimated-arrow span:before,
  .wsanimated-arrow span:after {
    cursor: pointer;
    height: 2px;
    width: 17px;
    background: #848080;
    position: absolute;
    display: block;
    content: "";
  }

  .wsanimated-arrow span:before {
    top: -7px;
    width: 23px;
  }

  .wsanimated-arrow span:after {
    bottom: -7px;
    width: 17px;
  }

  .wsanimated-arrow span,
  .wsanimated-arrow span:before,
  .wsanimated-arrow span:after {
    transition: all 500ms ease-in-out;
  }

  .wsactive .wsanimated-arrow span:after {
    width: 23px;
  }

  .wsactive .wsanimated-arrow span {
    background-color: transparent;
  }

  .wsactive .wsanimated-arrow span:before,
  .wsactive .wsanimated-arrow.active span:after {
    top: 7px;
  }

  .wsactive .wsanimated-arrow span:before {
    transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    bottom: 0px;
  }

  .wsactive .wsanimated-arrow span:after {
    transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  /* ================== Mobile Overlay/Drawer CSS ================== */
  .overlapblackbg {
    right: 0;
    width: calc(100% - 240px);
    height: 100vh;
    min-height: 100%;
    position: fixed;
    top: 0;
    opacity: 0;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
  }

  .wsactive .wsmenu .overlapblackbg {
    opacity: 1;
    visibility: visible;
    -webkit-transition: opacity 1.5s ease-in-out;
    -moz-transition: opacity 1.5s ease-in-out;
    -ms-transition: opacity 1.5s ease-in-out;
    -o-transition: opacity 1.5s ease-in-out;
    transition: opacity 1.5s ease-in-out;
  }

  .wsmenucontainer {
    -webkit-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }

  .wsactive .wsmenucontainer {
    margin-left: 240px;
    -webkit-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }

  .wsactive .wsmenu {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    visibility: visible;
    z-index: 1000;
    top: 0;
  }

  .wsactive .wsmenu > .wsmenu-list {
    -webkit-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
    margin-left: 0;
  }

  /* ================== Mobile Sub Menu Expander Arrows  ================== */
  .wsmenu > .wsmenu-list > li > .wsmenu-click {
    height: 49px;
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    cursor: pointer;
    width: 100%;
  }

  .wsmenu > .wsmenu-list > li .wsmenu-click.ws-activearrow > i {
    transform: rotate(180deg);
  }

  .wsmenu > .wsmenu-list > li > .wsmenu-click > i {
    display: block;
    height: 23px;
    width: 25px;
    margin-top: 14px;
    margin-right: 10px;
    background-size: 25px;
    font-size: 21px;
    color: rgba(0, 0, 0, 0.5);
    float: right;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li .wsmenu-click02 {
    height: 41px;
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    cursor: pointer;
    width: 100%;
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li .wsmenu-click02 > i {
    display: block;
    height: 23px;
    width: 25px;
    margin: 8px 6px 8px 6px;
    background-size: 25px;
    font-size: 21px;
    color: rgba(0, 0, 0, 0.25);
    float: right;
  }

  .wsmenu
    > .wsmenu-list
    > li
    > ul.sub-menu
    > li
    .wsmenu-click02
    > i.wsmenu-rotate {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  /*End Media Query*/
}

/* Extra @Media Query*/
@media only screen and (min-width: 992px) and (max-width: 1162px) {
  .desktoplogo {
    margin-left: 12px;
  }

  .wsmenu > .wsmenu-list > li > a > .wsarrow {
    display: none;
  }

  .wsmenu > .wsmenu-list > li > a {
    padding-left: 12px;
    padding-right: 12px;
  }

  .wsmenu > .wsmenu-list > li a.menuhomeicon {
    padding-left: 22px;
    padding-right: 22px;
  }
}
/* end main menu styles */

/* Desktop Main Menu Color */

.wsmainfull {
  background-color: #fff;
}

.wsmenu > .wsmenu-list {
  background-color: #fff;
}

/* Mobile Header */

.wsmobileheader {
  background-color: rgba(255, 255, 255, 0.95);
}

.wsactive .wsmenu > .wsmenu-list > li > a {
  color: #333;
}

.wsactive .wsmenu > .wsmenu-list > li > a.active {
  color: #333;
}

.wsactive .wsmenu > .wsmenu-list > li:hover > a {
  color: #333;
}

.wsactive .wsmenu > .wsmenu-list > li > a > .fa {
  color: #333;
}

.wsmenu > .wsmenu-list > li > a {
  color: #333;
}

.wsmenu > .wsmenu-list > li > a .wsarrow:after {
  border-top-color: #939393;
}

.wsmenu > .wsmenu-list > li > a:hover .wsarrow:after {
  border-top-color: #939393;
}

.wsmenu > .wsmenu-list > li > a.active .wsarrow:after {
  border-top-color: #939393;
}

.wsmenu > .wsmenu-list > li:hover > a .wsarrow:after {
  border-top-color: #939393;
}

.wsmenu > .wsmenu-list > li > a > .fa {
  color: #333;
}

.wsmenu > .wsmenu-list > li > a.active .fa {
  color: #333;
}

.wsmenu > .wsmenu-list > li:hover > a > .fa {
  color: #333;
}

.wsmenu > .wsmenu-list > li > a:hover .fa {
  color: #333;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form input[type="submit"] {
  background-color: #ccc;
  color: #333;
}

.wsmenu > .wsmenu-list > li > .wsmegamenu .menu_form input[type="button"] {
  background-color: #ccc;
  color: #333;
}

.wsmenu > .wsmenu-list > li > a.active {
  color: #333;
  border-bottom: solid 3px #ccc;
}

.wsmenu > .wsmenu-list > li:hover > a {
  color: #333;
  border-bottom: solid 3px #ccc;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li:hover > a {
  background-color: #ccc;
  color: #fff;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu > li:hover > a {
  background-color: #ccc;
  color: #fff;
}

.wsmenu
  > .wsmenu-list
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li
  > ul.sub-menu
  > li:hover
  a {
  background-color: #ccc;
  color: #fff;
}

.wsmenu-list li {
  color: #575757;
  font-size: 12px;
  font-weight: inherit;
  /*padding-right: 14px !important;
  padding-left: 14px !important;*/
  text-transform: uppercase;
  letter-spacing: 0px;
}

.wsmenu-list li i {
  margin-right: 5px;
  font-size: 20px;
  color: #575757;
}

@media all and (max-width: 991px) {
  .wsmenu > .wsmenu-list > li > a {
    justify-content: left;
  }
}
/* end whole styles */
.wsactive .wsmenu-list {
  height: 100vh !important;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > a {
  display: flex;
  transition: background-color 300ms linear;
}
.storeBtn {
  -webkit-appearance: none;
  border: none;
  background: none;
  text-align: left;
  margin-left: 0;
  padding-left: 0;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > form {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: inherit;
  text-transform: uppercase;
  letter-spacing: 0px;
  cursor: pointer;
}
.wsmenu > .wsmenu-list > li > ul.sub-menu > li > form > button {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: inherit;
  text-transform: uppercase;
  letter-spacing: 0px;
  cursor: pointer;
  color: #666666;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > form > button:hover {
  color: #fff;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > form {
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > form {
  background-image: none;
  color: #666666;
  border-right: 0 none;
  text-align: left;
  display: block;
  line-height: 22px;
  padding: 8px 12px;
  text-transform: none;
  font-size: 13px;
  letter-spacing: normal;
  border-right: 0px solid;
  text-transform: uppercase;
  cursor: pointer;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li:hover > form {
  background-color: #ccc;
  color: #fff;
}

@media screen and (max-width: 991px) {
  .home-btn-link a {
    min-height: 54px;
  }
}
@media screen and (min-width: 992px) {
  .home-btn-link {
    display: none !important;
  }
}

.wsmenu > .wsmenu-list > li:active > ul.sub-menu {
  opacity: 1;
  visibility: visible;
  transform: rotateX(0deg);
  -o-transform: rotateX(0deg);
  -moz-transform: rotateX(0deg);
  -webkit-transform: rotateX(0deg);
}
.wsmenu > .wsmenu-list > .ws-activearrow + ul.sub-menu {
  opacity: 1 !important;
  visibility: visible !important;
  transform: rotateX(0deg) !important;
  -o-transform: rotateX(0deg) !important;
  -moz-transform: rotateX(0deg) !important;
  -webkit-transform: rotateX(0deg) !important;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu > li > a {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: inherit;
  text-transform: uppercase;
  letter-spacing: 0px;
}

/* weird issue
.wsmenu > .wsmenu-list > li:hover > ul.sub-menu {
	opacity: 1;
	visibility: visible;
	transform: rotateX(0deg);
	-o-transform: rotateX(0deg);
	-moz-transform: rotateX(0deg);
	-webkit-transform: rotateX(0deg);
}
.wsmenu > .wsmenu-list > li:active > ul.sub-menu {
	opacity: 1;
	visibility: visible;
	transform: rotateX(0deg);
	-o-transform: rotateX(0deg);
	-moz-transform: rotateX(0deg);
	-webkit-transform: rotateX(0deg);
}
*/

.wsmenu > .wsmenu-list > li:active > ul.sub-menu {
  opacity: 1;
  visibility: visible;
  transform: rotateX(0deg);
  -o-transform: rotateX(0deg);
  -moz-transform: rotateX(0deg);
  -webkit-transform: rotateX(0deg);
}

/* submenu hovers */
.wsmenu > .wsmenu-list > li > ul.sub-menu > li > a:hover {
  background-color: #efefef;
  color: #333;
  text-decoration: none;
}

.wsmenu > .wsmenu-list > li > ul.sub-menu li:hover > a {
  background-color: #efefef;
  color: #333;
}

@media screen and (min-width: 992px) {
  .wsmenu > .wsmenu-list > li:hover > ul.sub-menu {
    opacity: 1;
    visibility: visible;
    transform: rotateX(0deg);
    -o-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -webkit-transform: rotateX(0deg);
  }
  /* fade down */
  .wsmenu > .wsmenu-list > li > ul.sub-menu {
    opacity: 0;
    visibility: hidden;
    transform-origin: 0% 0%;
    -o-transform-origin: 0% 0%;
    -ms-transform-origin: 0% 0%;
    -moz-transform-origin: 0% 0%;
    -webkit-transform-origin: 0% 0%;
    -o-transition: -o-transform 0.3s, opacity 0.3s;
    -ms-transition: -ms-transform 0.3s, opacity 0.3s;
    -moz-transition: -moz-transform 0.3s, opacity 0.3s;
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
    transition: -webkit-transform 0.3s, opacity 0.3s;
    transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    transform: rotateX(-75deg);
    -o-transform: rotateX(-75deg);
    -moz-transform: rotateX(-75deg);
    -webkit-transform: rotateX(-75deg);
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li > ul.sub-menu {
    opacity: 0;
    visibility: hidden;
    transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    transform: rotateX(-75deg);
    -o-transform: rotateX(-75deg);
    -moz-transform: rotateX(-75deg);
    -webkit-transform: rotateX(-75deg);
  }

  .wsmenu > .wsmenu-list > li > ul.sub-menu > li:hover > ul.sub-menu {
    opacity: 1;
    visibility: visible;
    -o-transform-origin: 0% 0%;
    -ms-transform-origin: 0% 0%;
    -moz-transform-origin: 0% 0%;
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    transition: -o-transform 0.4s, opacity 0.4s;
    -o-transition: -o-transform 0.4s, opacity 0.4s;
    -ms-transition: -ms-transform 0.4s, opacity 0.4s;
    -moz-transition: -moz-transform 0.4s, opacity 0.4s;
    -webkit-transition: -webkit-transform 0.4s, opacity 0.4s;
    transform: rotateX(0deg);
    -o-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -webkit-transform: rotateX(0deg);
  }

  .wsmenu
    > .wsmenu-list
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu {
    opacity: 0;
    visibility: hidden;
    -o-transform-origin: 0% 0%;
    -ms-transform-origin: 0% 0%;
    -moz-transform-origin: 0% 0%;
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
    transition: -o-transform 0.4s, opacity 0.4s;
    -o-transition: -o-transform 0.4s, opacity 0.4s;
    -ms-transition: -ms-transform 0.4s, opacity 0.4s;
    -moz-transition: -moz-transform 0.4s, opacity 0.4s;
    -webkit-transition: -webkit-transform 0.4s, opacity 0.4s;
    transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    transform: rotateX(-75deg);
    -o-transform: rotateX(-75deg);
    -moz-transform: rotateX(-75deg);
    -webkit-transform: rotateX(-75deg);
  }

  .wsmenu
    > .wsmenu-list
    > li
    > ul.sub-menu
    > li
    > ul.sub-menu
    > li:hover
    > ul.sub-menu {
    opacity: 1;
    visibility: visible;
    transform: rotateX(0deg);
    -o-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -webkit-transform: rotateX(0deg);
  }

  .wsmenu > .wsmenu-list > li > .wsmegamenu {
    opacity: 0;
    visibility: hidden;
    transform-origin: 0% 0%;
    -o-transform-origin: 0% 0%;
    -ms-transform-origin: 0% 0%;
    -moz-transform-origin: 0% 0%;
    -webkit-transform-origin: 0% 0%;
    transition: -o-transform 0.3s, opacity 0.3s;
    -o-transition: -o-transform 0.3s, opacity 0.3s;
    -ms-transition: -ms-transform 0.3s, opacity 0.3s;
    -moz-transition: -moz-transform 0.3s, opacity 0.3s;
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
    transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    transform: rotateX(-75deg);
    -o-transform: rotateX(-75deg);
    -moz-transform: rotateX(-75deg);
    -webkit-transform: rotateX(-75deg);
  }

  .wsmenu > .wsmenu-list > li:hover > .wsmegamenu {
    opacity: 1;
    visibility: visible;
    transform: rotateX(0deg);
    -o-transform: rotateX(0deg);
    -moz-transform: rotateX(0deg);
    -webkit-transform: rotateX(0deg);
  }
  /* end fade down */
}
.sub-menu li a:hover {
  text-decoration: none !important;
}
@media only screen and (max-width: 991px) {
  .wsactive .wsmenucontainer {
    margin-left: 80px;
    quotes: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }
}
.badge-dark {
  background-color: #00b4b4;
  background-color: #3e4651;
  background-color: #e22658;
  background-color: #f16232;

  font-size: 1em;
  font-weight: 500;
}
.notification-dropdown {
  position: absolute;
  right: 0;
}
@media only screen and (max-width: 991px) {
  .tourBtns {
    display: none !important;
  }
}
.order-search {
  /*background: #5c6d7ee6;*/
  padding: 1rem 0;
}
.blue-bg {
  background: #4d5967;
  border-top-left-radius: 4px !important;
  border-top-right-radius: 4px !important;
  background-color: #4d5967;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cg fill-opacity='0.08'%3E%3Cpath transform='rotate(0 636 600)' d='M1324 485c-81-58-192-40-282-73a722 722 0 0 1-319-252C652 68 562-56 429-39l-5 1a185 185 0 0 0-155 200c5 46 19 91 23 137 10 115-73 172-172 203-61 19-124 37-172 82-57 56-74 143-59 221a573 573 0 0 0 413 419c120 25 247 3 341-74 108-88 221-175 351-229 108-45 264-67 346-159 64-72 67-218-16-277z' fill='%23343c45'/%3E%3Cpath transform='rotate(0 1212 210)' d='M1864 416c-32-58-99-107-112-174-11-58 24-111 58-153 85-104 95-218 3-298s-202-83-261-110c-76-35-125-91-189-141-62-47-139-79-217-53-76 26-124 121-145 193-25 83 18 169-2 252-21 86-92 121-158 168-68 49-144 85-206 142-47 43-134 138-112 208 23 76 93 129 160 164 92 49 201 77 302 52 112-28 243-24 293 73 45 88 112 189 218 201a382 382 0 0 0 409-329c6-67-9-136-41-195z' fill='%231d2125'/%3E%3Cpath transform='rotate(0 420 165)' d='M887-281c-175-247-488-265-666-89C31-181-453 618 24 803c231 90 338-283 709-346 370-63 328-490 154-738z' fill='%23000'/%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;
}
</style>
