<script setup>
import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";
import general from "../../store/modules/general.js";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  modalId: String,
  modalName: String,
  modalDescription: String,
  removeModal: Boolean,
  whatsMethod: Function,
  footer: Boolean
})

import { toRefs } from 'vue';

const { modalId, modalName, modalDescription, removeModal, whatsMethod, class_body, class_footer, footer } = toRefs(props);

const closeModal = (payload) => {
  console.log('closeModal', payload)
  store.commit("REMOVE_MODAL", payload)
}

</script>

<template>
    <TransitionRoot as="div" :show="general.state.currentModals.value.includes(modalId)">
      <Dialog as="div" class="relative z-10" @close="closeModal(modalId)">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <form @submit.prevent="whatsMethod">
                  <div class="space-y-12">

                    <!--MODAL BODY-->
                    <div :class="class_body">
                      <div class="flex justify-between items-center">
                        <div>
                          <h2 class="text-base font-semibold leading-7 text-gray-900">{{ modalName }}</h2>
                          <p class="mt-1 text-sm leading-6 text-gray-600">{{ modalDescription }}</p>
                        </div>

                        <div @click="closeModal" class="px-2 py-1 cursor-pointer">
                          <i class="fa-solid fa-x fa-sm text-slate-500 hover:text-slate-800 transition"></i>
                        </div>
                      </div>

                      <slot name="body"></slot>
                    </div>
                  </div>

                  <!--MODAL FOOTER-->
                  <div v-if="footer">
                    <div class="border-b border-gray-900/10 pb-12"></div>
                    <slot name="footer"></slot>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>
