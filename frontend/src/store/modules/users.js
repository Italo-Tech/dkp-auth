// import {api} from "../../services";
// import router from "../../router"
import { useToast } from "vue-toastification";
import {api} from "../../services/index.js";

const toast = useToast();

const users = {
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        getUser(context, payload) {
            api.get(`http://localhost:8080/api/test/user`).then((response) => {
                console.log('getUser', response)
            })
        }
    }
}
export default users;
