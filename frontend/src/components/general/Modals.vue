<script>

import ModalCreateUser from "../Modals/ModalCreateUser.vue";
import ModalSearchUser from "../Modals/ModalSearchUser.vue";

export default {
  components: {ModalSearchUser, ModalCreateUser}
}
</script>

<template>
  <section>
    <ModalCreateUser />
    <ModalSearchUser />
  </section>
</template>
