<template>
    <form
        @submit.prevent="searchStore.getMovies(searchMovie)"
    >
        <input
            v-model="searchMovie"
            type="text"
            class="search-movie"
            placeholder="Поиск по фильмам"
        >
    </form>
    <the-loader v-if="searchStore.isLoader" />
    <template v-else>
        <movies-list
            v-for="movie of searchStore.movies"
            :key="movie.id"
            :movie="movie"
            :is-search="true"
        />
    </template>
</template>

<script setup lang="ts">
import { ref } from "vue";

import MoviesList from "@/components/MoviesList.vue";
import TheLoader from "@/components/TheLoader.vue";
import { useSearchStore } from "@/stores/SearchStore";

const searchStore = useSearchStore();

const searchMovie = ref();
</script>

<style scoped lang="scss">
.search-movie {
    width: 100%;
    height: 30px;
    border-radius: 10px;
}
</style>