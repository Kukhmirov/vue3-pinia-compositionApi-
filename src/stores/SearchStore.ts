import { defineStore } from "pinia";
import { ref } from "vue";

import { useApi } from "@/api/index";
import { useMovieStore } from "@/stores/MovieStore";


interface Movie {
    id: number;
    name: string;
    description: string;
    poster: string;
    year: string;
    isWatched: boolean;
}

const restApi = useApi();
const urlApi = import.meta.env.VITE_MOVIE_URL_API;
const key = import.meta.env.VITE_API_KEY;
const get = "v1.2/movie/search?page=1&limit=10&query=";

export const useSearchStore = defineStore("searchStore", () => {
    const isLoader = ref<Boolean>(false);
    const movies = ref<Movie[]>([]);

    const getMovies = async(search: String) => {
        isLoader.value = true;
        const url = `${urlApi}${get}${search}`;

        const res = await restApi.get(url, {
            headers: {
                "X-API-KEY": key,
                accept: "application/json",
            },
        });
        const data = await res.data;

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