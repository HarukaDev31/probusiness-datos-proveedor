<template>
  <div>
    <slot />
    <!-- Session Expired Modal -->
    <SessionExpiredModal />
    <GlobalNotifications />

    <!-- Modal Container -->
    <ModalContainer />

    <!-- Global Spinner -->
    <GlobalSpinner />
  </div>
</template>

<script setup lang="ts">
import SessionExpiredModal from '../components/SessionExpiredModal.vue'

</script>