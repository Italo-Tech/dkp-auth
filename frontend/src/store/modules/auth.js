import {api} from "../../services";
import router from "../../router"
import { useToast } from "vue-toastification";

const toast = useToast();

const auth = {
  state: {
    isAuthenticated: false,
    data: [],
  },
  getters: {

  },
  mutations: {
    SET_ERROR(state, payload) {
      state.error_login = payload
    },
    SET_ME(state, payload) {
      state.data = payload
    },
    SET_AUTHENTICATED(state, payload) {
      state.isAuthenticated = payload
    },
  },
  actions: {
    loginUser(context, payload) {
      api.post(`http://localhost:8080/api/auth/signin`, payload).then(response => {
        toast.success("Login efetuado !", { timeout: 2500 });
        // context.commit('SET_AUTHENTICATED', true)
        if (response.data.accessToken) {
          window.localStorage.setItem('token', JSON.stringify(response.data.accessToken))
        }
        setTimeout(() => {
          router.push({ name: 'Users' })
        }, 1500)
      }).catch(error => {
        console.log(error)
        if(error.response.status === 404) {
          toast.error('E-mail não encontrado')
        }
        if(error.response.status === 401) {
          toast.error('E-mail/senha inválidos')
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
          toast.error("Email já em uso !", { timeout: 2500 });
        }
      });
    },
    logout() {
      if(localStorage.getItem('token')) {
        localStorage.removeItem('token');
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
