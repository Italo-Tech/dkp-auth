<script>
import { ref, reactive } from 'vue'
import { useStore } from "vuex";
import {useField} from "vee-validate";
import {validateEmptyAndLength3, validateEmptyAndUsername} from "../../utils/validators.js";

export default {
  setup() {
    const store = useStore();

    const { /*Lib https://vee-validate.logaretm.com/v3*/
      value: usernameValue,
      errorMessage: usernameErrorMessage
    } = useField('username', validateEmptyAndUsername)

    const { /*Lib https://vee-validate.logaretm.com/v3*/
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasError: false,
      isLoading: false,
      register_account: {
        username: {
          value: usernameValue,
          errorMessage: usernameErrorMessage
        },
        password: {
          value: passwordValue,
          errorMessage: passwordErrorMessage
        }
      },
    })

    async function register() {
      await store.dispatch("createUser", {
        username: state.register_account.username.value,
        password: state.register_account.password.value
      })
    }

    return {
      state,
      register
    }
  },
}
</script>

<template>
  <section class="bg-gray-50 relative">
    <img src="../../assets/images/bg-4.jpg" class="absolute top-o left-0 w-full h-full object-cover pointer-events-none brightness-75" alt="">

    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        OSESP
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Crie sua conta
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
              <input v-model="state.register_account.username.value"
                     type="email"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                     placeholder="Informe seu email">
              <span id="email-error" v-if="!!state.register_account.username.errorMessage" class="block font-medium text-sm text-red-400">
                {{ state.register_account.username.errorMessage }}
              </span>
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 ">Senha</label>
              <input v-model="state.register_account.password.value"
                     type="password"
                     placeholder="••••••••"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
              >
              <span id="email-error" v-if="!!state.register_account.username.errorMessage" class="block font-medium text-sm text-red-400">
                {{ state.register_account.password.errorMessage }}
              </span>
            </div>
            <button type="submit" class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Criar conta</button>
            <p class="text-sm font-light text-gray-500">
              Já possui uma conta? <a href="/login" class="font-medium text-indigo-600 hover:underline">Entrar</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
