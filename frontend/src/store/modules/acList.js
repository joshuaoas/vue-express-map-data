import axios from "axios";

const state = {
    acList: [],
    ordermanageapi: process.env.VUE_APP_ORDER_MANAGE_API,
    token: localStorage.getItem("USER"),
};

const getters = {
    getACList: (state) => {
        return state.acList;
    }
};

const actions = {};

const mutations = {
    SET_ACLIST(state) {
        let axiosConfig = {
            headers: {
                Authorization: "Bearer " + state.token,
            },
        };
        return axios
            .get(process.env.VUE_APP_ORDER_MANAGE_API + '/aclist?active=true', axiosConfig)
            .then((response) => {
                const list = response.data.forEach(function (arrayItem) {
                    arrayItem.acName.toUpperCase();
                });
                const data = list;

                const low = data.filter(function (e) {
                    return e.acid < 210;
                });

                const mid = data.filter(function (e) {
                    return e.acid == 80069;
                });

                const high = data.filter(function (e) {
                    return e.acid > 800000 && e.acid < 800250;
                });

                const all = low.concat(high).concat(mid);
                const alph = all.sort((a, b) => (a.acName > b.acName) ? 1 : -1);

                state.acList = alph;
            });
    },
    UPDATE_ACLIST(state, data) {
        state.acList = data;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}