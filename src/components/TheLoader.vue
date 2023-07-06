<template>
    <div class="loader" />
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.loader {
    display: block;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    border-radius: 50%;
    border: 2px solid #2196f3;
    border-top-color: transparent;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>