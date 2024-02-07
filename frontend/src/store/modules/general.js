import {api} from "../../services";
import router from "../../router"
import { useToast } from "vue-toastification";
import {reactive, ref} from "vue";

const general = {
    state: {
        currentModals: ref([]),
    },

    getters: {
        // currentModalsTest: state => state.currentModals,
    },

    mutations: {
        ADD_MODAL(state, modal) {
            if(!state.currentModals.includes(modal)) {
                state.currentModals.push(modal);
            }
        },
        REMOVE_MODAL(state, modal) {
            state.currentModals.splice(modal, 1);
        },
    },

    actions: {
        showModal({commit}, payload) {
            console.log('ACTION showModal:', payload)
            commit('ADD_MODAL', payload)
            console.log('currentModals', general.state.currentModals)
        },
        closeModal({commit}, payload) {
            console.log('ACTION closeModal:', payload)
            commit('REMOVE_MODAL', payload)
        }
    }
}
export default general;
