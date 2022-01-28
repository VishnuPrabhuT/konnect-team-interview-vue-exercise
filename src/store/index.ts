import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: true,
        services: [],
        filteredServices: [],
        visibleServices: [],
        searchTerm: ""
    },

    actions: {
        async getServices({ commit }) {
            let res = await fetch("/api/service_packages");
            res = await res.json();
            commit("setServices", res);
        },
        search({ commit }, val) {
            console.log(val);
            if (val == "" || val == "<empty string>") {
                commit("resetServices");
                return;
            }

            let filteredItems = [];
            filteredItems = this.state.services.filter((item: any) => {
                return (
                    item.name.toLowerCase().includes(val) ||
                    item.description.toLowerCase().includes(val) ||
                    item.versions.length == Number(val)
                );
            });
            console.log(filteredItems);

            commit("setFilteredServices", filteredItems);
            this.state.searchTerm = val;
        }
    },
    mutations: {
        setServices(state, payload) {
            state.services = payload;
            state.filteredServices = payload;
            state.visibleServices = payload.slice(0, 12);
            state.loading = false;
        },
        setFilteredServices(state, payload) {
            state.visibleServices = payload.slice(0, 12);
            state.filteredServices = payload;
        },
        resetServices(state, payload) {
            state.filteredServices = state.services;
        },
        toggleLoading(state) {
            state.loading = !state.loading;
        }
    },
    modules: {}
});
