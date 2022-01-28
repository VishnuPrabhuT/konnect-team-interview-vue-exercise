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
        setVisibleServices({ commit }, payload) {
            commit("setVisibleServices", payload);
        },
        search({ commit }, val) {
            if (val == "" || val == "<empty string>") {
                commit("resetServices");
                return;
            }

            let filteredItems = [];
            filteredItems = this.state.services.filter((item: any) => {
                return (
                    item.name.toLowerCase().includes(val.toLowerCase()) ||
                    item.description
                        .toLowerCase()
                        .includes(val.toLowerCase()) ||
                    item.versions.length == Number(val)
                );
            });

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
        setVisibleServices(state, payload) {
            state.visibleServices = payload;
        }
    },
    modules: {}
});
