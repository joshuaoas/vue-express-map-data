import Vue from "vue";
import Router from "vue-router";
import store from "../store/";

const ACList = () => import("@/pages/ACLookup");
const NotFound = () => import("@/pages/404.vue");
import * as Sentry from "@sentry/vue";


Vue.use(Router);

let router = new Router({
	mode: "history",
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			const position = {}

			if (to.matched.some(m => m.meta.scrollToTop)) {
				position.x = 0
				position.y = 0
				document.getElementById('mobileScrollTarget').scrollIntoView();
			} else {
				return { x: 0, y: 0 };
			}

		}

	},
	routes: [
		{
			path: "/",
			name: "ACListHome",
			component: ACList,
		},
		{
			path: "/ac-list",
			name: "ACList",
			component: ACList,
			meta: {
				requiresAuth: false,
			},
		},
		{ path: "*", component: NotFound },
	],
});


router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.getters.isLoggedIn) {
			Sentry.setUser({ email: store.state.user.Email });
			next();
			return;
		}
		next({ name: "Login", query: { from: to.fullPath } });
		next();
	} else {
		next();
	}
});


router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {

		if (store.getters.isLoggedIn) {
			next();
			return;
		} else {
			next({
				path: '/',
				query: { redirect: to.fullPath }
			})
		}
	} else {
		next();
	}
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err
	});
}


export default router;
