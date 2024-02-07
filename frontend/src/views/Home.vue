<script setup>

import HeaderSession from "../components/HeaderSession.vue";
import auth from "../store/modules/auth.js";
</script>

<template>
<div>
  <HeaderSession session="Dashboard" sub-session="Visão geral de dados e informações"/>

  {{ auth.state }}
</div>
</template>

<style scoped>

</style>
