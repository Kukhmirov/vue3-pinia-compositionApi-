<template>
    <div class="container">
        <the-header />
        <div class="tabs">
            <button
                class="btn"
                :class="{btn__green: moviesList.activeTabs === 1}"
                @click="setTab(1)"
            >
                Понравившиеся
            </button>
            <button
                class="btn"
                :class="{btn__green: moviesList.activeTabs === 2}"
                @click="setTab(2)"
            >
                Поиск
            </button>
        </div>
        <div
            v-if="moviesList.activeTabs === 1"
            class="movies"
        >
            <div>
                <h3>Избранные</h3>
                <movies-list
                    v-for="(movie, index) of moviesList.getWatchedMovies"
                    :key="index"
                    :movie="movie"
                />
            </div>
            <h3>Все фильмы (колличество: {{ moviesList.movies.length }})</h3>
            <movies-list
                v-for="movie of moviesList.movies"
                :key="movie.id"
                :movie="movie"
            />
        </div>
        <div
            v-else
            class="search"
        >
            <search-movie />
        </div>
    </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/header/TheHeader.vue";
import MoviesList from "@/components/MoviesList.vue";
import SearchMovie from "@/components/SearchMovie.vue";

import { useMovieStore } from "./stores/MovieStore";

const moviesList = useMovieStore();

const setTab = (id: number) => {
    moviesList.setActiveTab(id);
};

</script>

<style scoped lang="scss">
.container {
    padding: 0 300px;
}

.search {
    margin-top: 30px;
}
</style>
