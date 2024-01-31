import {api} from "../../services";
import router from "../../router"
import { useToast } from "vue-toastification";

const toast = useToast();

const auth = {
  state: {
    isAuthenticated: false,
    error_login: {},
    login: {
      user: {
        email: null,
        password: null,
      },
    },
    data: [],
    user: {},
    register: {
      email: null,
      password: null,
    }
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
    getCars(context) {
      api.get('http://localhost:3000/api/cars').then(response => {
        console.log(response.data.result)
        context.commit("SET_CARS", response.data.result)
        // stop no loading
      }).catch(error => {
        if (error.response.status === 401) {
          // Fazer logout
        } else {
          //Toast de erro
          Toast.error('Erro ao obter carros')

        }
      });
    },
    loginUser(context, payload) {
      api.post(`http://localhost:3000/login`, payload).then(response => {
        toast.success("Login efetuado !", { timeout: 2500 });
        context.commit('SET_AUTHENTICATED', true)
        window.localStorage.setItem('token', response.data.token)
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
      api.post(`http://localhost:3000/register`, payload).then(response => {
        toast.success("Usuário criado !", { timeout: 2500 });
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 1500)
      }).catch(error => {
        console.log('Erro ao criar usuário', error)
      });
    },
    /*logoutUser(context) {
      console.log('logoutUser')
      api.post(`/logout`).then((response) => {
        window.localStorage.removeItem('token')
        context.commit('SET_AUTHENTICATED', false)
        router.push({ name: 'Login' })
      }).catch(error => {
        window.localStorage.clear()
      });
    },*/
  }
}
export default auth;
