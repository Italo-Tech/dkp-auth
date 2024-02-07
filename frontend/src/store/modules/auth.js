import {api} from "../../services";
import router from "../../router"
import { useToast } from "vue-toastification";

const toast = useToast();

const auth = {
  state: {
    authenticated: false,
    userAuthenticated: null
  },

  getters: {

  },

  mutations: {
    SET_AUTHENTICATED(state, payload) {
      state.authenticated =  payload
    },
    SET_USER_AUTHENTICATED(state, payload) {
      state.userAuthenticated =  payload
    },
  },

  actions: {
    loginUser({ commit }, payload) {
      api.post(`http://localhost:8080/api/auth/signin`, payload).then(response => {
        toast.success("Login efetuado !", { timeout: 2500 });
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER_AUTHENTICATED', response.data)
        if (response.data.accessToken) {
          window.localStorage.setItem('token', JSON.stringify(response.data.accessToken))
          window.localStorage.setItem('user_id', JSON.stringify(response.data.id))
        }
        setTimeout(() => {
          router.push({ name: 'Users' })
        }, 1500)
      }).catch(error => {
        console.log(error)
        if(error.response.status === 404) {
          toast.error('Usuário não encontrado')
        }
        if(error.response.status === 401) {
          toast.error('Usuário/senha inválidos')
        }
        if(error.response.status === 400) {
          toast.error('Ocorreu um erro ao fazer o login')
        }
      });
    },
    createUser(context, payload) {
      api.post(`http://localhost:8080/api/auth/signup`, payload).then(response => {
        toast.success("Usuário criado !", { timeout: 2500 });
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 1500)
      }).catch(error => {
        console.log('Erro ao criar usuário', error)
        if(error.request.status === 400) {
          toast.error("Usuário já em uso !", { timeout: 2500 });
        }
      });
    },
    logout(context) {
      if(localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        context.commit('SET_AUTHENTICATED', false)
        context.commit('SET_USER_AUTHENTICATED', null)
        toast.info("Saindo...", { timeout: 2500 });
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 1500)
      } else {
        toast.error("Você ainda não fez login...", { timeout: 2500 });
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 1500)
      }
    }
  }
}
export default auth;
