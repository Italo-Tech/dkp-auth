<script setup>
import { useToast } from "vue-toastification";

const toast = useToast();
import HeaderSession from "../components/HeaderSession.vue";
import auth from "../store/modules/auth.js";
import {useStore} from "vuex";
import {onMounted, watch} from "vue";
import general from "../store/modules/general.js";

const store = useStore();

const products = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    href: '#',
    price: '$256',
    description: 'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    options: '8 colors',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  // More products...
]

const modalSearchUser = () => {
  store.commit("ADD_MODAL", 'modalSearchUser')
}
const modalCreateUser = () => {
  store.commit("ADD_MODAL", 'modalCreateUser')
}
const download = () => {
  console.log('download')
  toast.info("(Estático) - Fazendo download...", { timeout: 10000 });
}
</script>

<template>
    <section class="">
      <HeaderSession
          session="Usuários"
          sub-session="Gerenciamento de sua lista de usuários"
          :icon-search-function="modalSearchUser" icon-search="fa-solid fa-magnifying-glass"
          :icon-create-function="modalCreateUser" icon-create="fa-solid fa-plus"
          :icon-download-function="download" icon-download="fa-solid fa-download"
      />

      <!--      <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 bg-red-200">
        <div v-for="product in products" :key="product.id" class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
            <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center sm:h-full sm:w-full" />
          </div>
          <div class="flex flex-1 flex-col space-y-2 p-4">
            <h3 class="text-sm font-medium text-gray-900">
              <a :href="product.href">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ product.name }}
              </a>
            </h3>
            <p class="text-sm text-gray-500">{{ product.description }}</p>
            <div class="flex flex-1 flex-col justify-end">
              <p class="text-sm italic text-gray-500">{{ product.options }}</p>
              <p class="text-base font-medium text-gray-900">{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>-->
  </section>
</template>
