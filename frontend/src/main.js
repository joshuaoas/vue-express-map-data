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
import VueClipboards from "vue-clipboards";
import VueCurrencyFilter from "vue-currency-filter";
import VuexRouterSync from "vuex-router-sync";
import VCalendar from "v-calendar";
import JsonCSV from "vue-json-csv";
import CKEditor from "ckeditor4-vue";
import VueTour from 'vue-tour'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueConfetti from 'vue-confetti';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)









require('vue-tour/dist/vue-tour.css')


Sentry.init({
	Vue,
	dsn: "https://3414fffc56e74876a55b2eed31155f4d@o556644.ingest.sentry.io/5687918",
	integrations: [new Integrations.BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
	tracingOptions: {
		trackComponents: true,
	},
});




//Vue.use(VueResource);
Vue.use(VueTour);
Vue.use(VueConfetti);


/*
VueTour.onSkip().then(() => {
	console.log("Skipped");
});
*/

Vue.use(VueSweetalert2);

Vue.use(CKEditor);
Vue.component("downloadCsv", JsonCSV);
Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0);
// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
	componentPrefix: "vc", // Use <vc-calendar /> instead of <v-calendar />
});

//import 'vuejs-noty/dist/vuejs-noty.css'

Vue.use(VueNoty, {
	timeout: 4000,
	//theme: 'metroui',
});

Vue.use(vuex);
Vue.use(VueClipboards);
VuexRouterSync.sync(store, router);

/*
Now, when we want to use axios inside our component, we can do this.$http and it will be like calling axios directly. We also set the Authorization on axios header to our token, so our requests can be processed if a token is required. This way, we do not have to set token anytime we want to make a request.

USE this.$http for POST requests
*/
Vue.prototype.$http = Axios;
Vue.prototype.moment = moment;

const token = localStorage.getItem("token");
if (token) {
	Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.config.productionTip = false;

Vue.use(VueCurrencyFilter, {
	symbol: "$",
	thousandsSeparator: ",",
	fractionCount: 2,
	fractionSeparator: ".",
	symbolPosition: "front",
	symbolSpacing: false,
});

/* eslint-disable no-new */
/*
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
*/

// apply interceptor on all axios responses
Axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		console.log(error);
		if (error.response) {
			if (error.response.status === 401) {
				//this.$noty.error("Oooops! Something went wrong");
				//console.log("401");
				// if you ever get an unauthorized, logout the user
				window.location = "/";
			}
		}
		return Promise.reject(error);
	}
);

new Vue({ el: "#app", router, store, render: (h) => h(App) });
