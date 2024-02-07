<script>
import { UserCircleIcon } from '@heroicons/vue/24/solid';
import HeaderSession from "../components/HeaderSession.vue";
import {useStore} from "vuex";
import {onMounted} from "vue";
import auth from "../store/modules/auth.js";

const store = useStore();

export default {
  computed: {
    auth() {
      return auth
    }
  },
  components: {HeaderSession, UserCircleIcon},

  setup() {
    onMounted(() => {

    })

    return {

    }
  }
}



// Lógica específica do componente vai aqui, se necessário

</script>

<template>
  <section>
    <HeaderSession
        session="Perfil"
        sub-session="Essas informações serão exibidas publicamente, portanto, tome cuidado com o que você compartilha."
    />

    {{ auth.state }}

    <form>
      <div class="space-y-12 ">
        <div class="border-b border-gray-900/10 pb-12">
          <div class="col-span-full">
            <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Foto</label>
            <div class="mt-2 flex items-center gap-x-3">
              <UserCircleIcon class="h-12 w-12 text-gray-300" aria-hidden="true" />
              <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Escolher</button>
            </div>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nome</label>
              <div class="mt-2">
                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Sobrenome</label>
              <div class="mt-2">
                <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Endereço de Email</label>
              <div class="mt-2">
                <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Tipo de usuário</label>
              <select disabled id="location" name="location" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option selected="">Administrador</option>
                <option>Usuário</option>
                <option>Operador</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Salvar</button>
      </div>
    </form>
  </section>
</template>
