import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import jwt_decode from "jwt-decode";
import acList from './modules/acList';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
	modules: {
		acList,
	},
	state: {
		server: process.env.VUE_APP_SERVER_URL,
		nav: false,
		tour: false,
		token: localStorage.getItem("USER"),
		isLoggedIn: localStorage.getItem("USER") ? true : false,
		user: localStorage.getItem("USER")
			? jwt_decode(localStorage.getItem("USER"))
			: {},
		activePage: "images",
		colors: [
			"#00b4b4",
			"#f50057",
			"#aa00ff",
			"#311b92",
			"#304ffe",
			"#2962ff",
			"#0091ea",
			"#00897b",
			"#01579b",
			"#9e9e9e",
			"#616161",
			"#9e9e9e",
			"#455a64",
			"#1de9b6",
			"#9c27b0",
			"#651fff",
			"#880e4f",
		],
	},
	actions: {

	},

	mutations: {
		SET_USER(state, token) {
			const decoded = jwt_decode(token);
			state.user = decoded;
		},

		SET_TOKEN(state, token) {
			state.token = token;
		},

		DESTROY_USER(state) {
			state.user = {};
			state.images = [];
			state.state.pdfs = [];
			state.videos = [];
		},
		SET_LOGIN(state, val) {
			state.isLoggedIn = val;
		},

		setActivePage(state, name) {
			state.activePage = name;
		},

		showNavigation(state) {
			state.nav = true;
		},
		hideNavigation(state) {
			state.nav = false;
		},
		hideTour(state) {
			state.tour = false;
		},
		showTour(state) {
			state.tour = true;
		},
	},

	getters: {
		isLoggedIn: (state) => {
			return state.isLoggedIn;
		},
		token: (state) => state.token,

		getUser: (state) => {
			return state.user;
		},

		getColors: (state) => {
			return state.colors;
		},

		getActivePage: (state) => {
			return state.activePage;
		},
		getActivity: (state) => {
			return state.idleVue.isIdle;
		},
	},
});
