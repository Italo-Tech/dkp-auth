<script setup>

const props = defineProps({
  session: String,
  subSession: String,

  iconSearch: String,
  iconSearchFunction: Function,

  iconCreate: String,
  iconCreateFunction: Function,

  iconDownload: String,
  iconDownloadFunction: Function,
})
</script>

<template>
  <div class="mb-14">
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ session }}</h2>
        </div>
        <span class="hidden sm:flex text-sm leading-7 text-slate-500">{{ subSession }}</span>
      </div>

      <div class="flex items-center justify-center gap-2">
        <!--Btn Search-->
        <i @click="iconSearchFunction" :class="iconSearch" title="Procurar"
           class="fa-lg px-2 sm:px-2 py-4 text-slate-500 hover:text-indigo-600 cursor-pointer transition"></i>
        <!--Btn Create-->
        <i @click="iconCreateFunction" :class="iconCreate" title="Novo registro"
           class="fa-lg px-2 sm:px-2 py-4 text-slate-500 hover:text-indigo-600 cursor-pointer transition"></i>
        <!--Btn Download-->
        <i @click="iconDownloadFunction" :class="iconDownload" title="Download"
           class="fa-lg px-2 sm:px-2 py-4 text-slate-500 hover:text-indigo-600 cursor-pointer transition"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
