import axios from "axios";

const state = {
    acList: [],
    ordermanageapi: process.env.VUE_APP_ORDER_MANAGE_API,
    token: localStorage.getItem("SSCUSER"),
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
        //console.log("started Vuex AC List");
        //console.log(process.env.VUE_APP_ORDER_MANAGE_API);
        return axios
            .get(process.env.VUE_APP_ORDER_MANAGE_API + '/aclist?active=true', axiosConfig)
            .then((response) => {
                //console.log(response);
                //console.log("finished Vuex acList " + response);
                //str.toUpperCase();
                const list = response.data.forEach(function (arrayItem) {
                    arrayItem.acName.toUpperCase();
                    //console.log(arrayItem.acName);
                });
                //alphabetical
                //list.sort((a, b) => (a.acName > b.acName) ? 1 : -1);
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


                // var filtered = list.filter(filter_acs);

                state.acList = alph;
            });
    },
    UPDATE_ACLIST(state, data) {
        //console.log('trying to update in vuex');
        //data.sort((a, b) => (a.acName > b.acName) ? 1 : -1);


        //var filtered = data.filter(filter_acs);
        state.acList = data;
        //console.log(state.acList)
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}