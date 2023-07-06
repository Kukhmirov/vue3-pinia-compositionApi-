/* eslint-disable max-len */
import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface Movie {
    id: number;
    name: string;
    description: string;
    poster: string;
    year: string;
    isWatched: boolean;
}

export const useMovieStore = defineStore("movieStore", () => {
    const movies = ref<Movie[]>([]);
    const activeTabs = ref<number>(2);

    const setActiveTab = (id: number) => {
        activeTabs.value = id;
    };

    const togleWatchedMovie = (id: number) => {
        const indexMovies = movies.value.findIndex((movie) => movie.id === id);
        movies.value[indexMovies].isWatched = !movies.value[indexMovies].isWatched;
    };

    const deleteMovie = (id: number) => {
        movies.value = movies.value.filter((movie) => movie.id !== id);
    };

    const getWatchedMovies = computed(() => {
        return movies.value.filter((movie) => movie.isWatched);
    });

    return {
        movies,
        activeTabs,
        getWatchedMovies,
        setActiveTab,
        togleWatchedMovie,
        deleteMovie,
    };
});

// export const useMovieStore = defineStore("movieStore", {
//     state: (): { movies: Movie[], activeTabs: Number } => ({
//         movies: [],
//         activeTabs: 1,
//     }),
//     getters: {
//         getWatchedMovies(): Movie[] {
//             return this.movies.filter((movie) => movie.isWatched);
//         },
//     },
//     actions: {
//         setActiveTab(id: number) {
//             this.activeTabs = id;
//         },
//         togleWatchedMovie(id: number) {
//             const indexMovies = this.movies.findIndex((movie) => movie.id === id);
//             this.movies[indexMovies].isWatched = !this.movies[indexMovies].isWatched;
//         },
//         deleteMovie(id: number) {
//             this.movies = this.movies.filter((movie) => movie.id !== id);
//         },
//     },
// });