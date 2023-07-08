import { defineStore } from "pinia";
import { ref } from "vue";

import { useApi } from "@/api/index";
import { URL } from "@/data/urlData";
import { useMovieStore } from "@/stores/MovieStore";
import { Movie } from "@/types/Interface";


const restApi = useApi();
const urlApi = import.meta.env.VITE_MOVIE_URL_API;
const key = import.meta.env.VITE_API_KEY;

export const useSearchStore = defineStore("searchStore", () => {
    const isLoader = ref<Boolean>(false);
    const movies = ref<Movie[]>([]);

    const getMovies = async(search: String) => {
        isLoader.value = true;
        const url = `${urlApi}${URL.GET_SEARCH}${search}`;

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