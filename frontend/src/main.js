// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

import App from "./App";
import router from "./router";
import vuex from "vuex";
import store from "./store";
import Axios from "axios";
import VueNoty from "vuejs-noty";
import moment from "moment";
import VuexRouterSync from "vuex-router-sync";
import VueTour from 'vue-tour'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)









require('vue-tour/dist/vue-tour.css')







Vue.use(VueTour);


Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0);




Vue.use(VueNoty, {
	timeout: 4000,
	//theme: 'metroui',
});

Vue.use(vuex);

VuexRouterSync.sync(store, router);

Vue.prototype.$http = Axios;
Vue.prototype.moment = moment;

const token = localStorage.getItem("token");
if (token) {
	Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.config.productionTip = false;


// apply interceptor on all axios responses
Axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		console.log(error);
		if (error.response) {
			if (error.response.status === 401) {
				window.location = "/";
			}
		}
		return Promise.reject(error);
	}
);

new Vue({ el: "#app", router, store, render: (h) => h(App) });
