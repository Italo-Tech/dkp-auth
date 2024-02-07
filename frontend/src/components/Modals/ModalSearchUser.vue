<script setup>
import ModalDefault from "../general/ModalDefault.vue";
import {useStore} from "vuex";

const store = useStore();

const searchUser = () => {
  console.log('Button searchUser')
}

const closeModal = (payload) => {
  store.commit("REMOVE_MODAL", payload)
}

</script>

<template>
  <ModalDefault modal-id="modalSearchUser"
                modal-name="Procurar por usuário"
                modal-description="Descrição procurar por usuário"
                :whats-method="searchUser"
                :footer="true">
    <!--Body-->
    <template v-slot:body>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <!--Modelo-->
        <div class="sm:col-span-12">
          <label class="block text-sm font-medium leading-6 text-gray-900">Modelo</label>
          <div class="mt-2">
            <input type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
      </div>
    </template>

    <!--Footer-->
    <template v-slot:footer>
      <div class="mt-4 flex items-center justify-end gap-x-6">
        <button @click="closeModal('modalSearchUser')" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
        <button class="rounded-sm bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition">Procurar</button>
      </div>
    </template>
  </ModalDefault>
</template>

<style scoped>

</style>
