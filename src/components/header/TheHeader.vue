<template>
    <header>
        <img
            :src=logo
            alt="Логотоип сайта"
        >
        <h2>Мой список фильмов</h2>
    </header>
</template>

<script setup lang="ts">
import { logo } from "@/assets/images";
</script>

<style scoped lang="scss">
header {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 150px;
    }
    h2 {
        font-size: 26px;
        margin-left: 30px;
    }
}
</style>
