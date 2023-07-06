import { defineStore } from "pinia";
import { ref } from "vue";

import { useMovieStore } from "./MovieStore";

const apiKey = "9YX575P-GYR42AT-NP6MJEZ-QPDVCKK";

interface Movie {
    id: number;
    name: string;
    description: string;
    poster: string;
    year: string;
    isWatched: boolean;
}

export const useSearchStore = defineStore("searchStore", () => {
    const isLoader = ref<Boolean>(false);
    const movies = ref<Movie[]>([]);

    const getMovies = async(search: String) => {
        isLoader.value = true;
        const url = `https://api.kinopoisk.dev/v1.2/movie/search?page=1&limit=10&query=${search}`;
        const res = await fetch(url, {
            headers: {
                "X-API-KEY": apiKey,
                accept: "application/json",
            },
            mode: "cors",
        });
        const data = await res.json();
        movies.value = data.docs;
        isLoader.value = false;
    };

    const addToUserMovies = (movieData: Movie) => {
        const movieStore = useMovieStore();

        movieStore.movies.push(movieData);
        movieStore.activeTabs = 1;
    };

    return {
        isLoader, movies, getMovies, addToUserMovies,
    };
});