<template>
    <div class="movie">
        <img
            :src="movie.poster"
            :alt="movie.name"
            class="movie__img"
        >
        <div>
            <div class="movie__name">
                {{ movie.name }} ({{ movie.year }}год)
            </div>
            <span class="movie__overview">{{ movie.description }}</span>
            <div
                v-if="!isSearch"
                class="movie__buttons"
            >
                <button
                    class="btn movie__buttons-watched"
                    @click="toggleWatched(movie.id)"
                >
                    <span v-if="!movie.isWatched">Watched</span>
                    <span v-else>Unwatched</span>
                </button>
                <button
                    class="btn movie__buttons-delete"
                    @click="deleteMovie(movie.id)"
                >
                    Delete
                </button>
            </div>
            <div
                v-else
                class="movie__buttons"
            >
                <button
                    class="btn btn__green"
                    @click="saveMovie(movie)"
                >
                    Добавить
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMovieStore } from "@/stores/MovieStore";
import { useSearchStore } from "@/stores/SearchStore";
import { Movie } from "@/types/Interface";


const props = defineProps({
    movie: {
        type: Object as () => Movie,
        required: true,
    },
    isSearch: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const moviesStore = useMovieStore();
const searchStore = useSearchStore();

const toggleWatched = (id: number) => {
    moviesStore.togleWatchedMovie(id);
};

const deleteMovie = (id: number) => {
    moviesStore.deleteMovie(id);
};

const saveMovie = (movie: Movie) => {
    const movieData = {
        id: movie.id,
        name: movie.name,
        description: movie.description,
        poster: movie.poster,
        year: movie.year,
        isWatched: false,
    };
    
    searchStore.addToUserMovies(movieData);
};

</script>

<style scoped lang="scss">
.movie {
    display: grid;
    grid-template-columns: 200px 1fr;
    column-gap: 30px;
    margin-bottom: 20px;
    border: 2px solid #efefef;
    padding: 10px;
    border-radius: 10px;
    &__img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 50%;
    }
    &__name {
        display: flex;
        align-items: center;
        font-size: 20px;
        margin-bottom: 20px;
    }
    &__overview {
        display: block;
        margin-bottom: 20px;
    }
    &__buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &__buttons-watched {
        color: #fff;
        background: #1eb4c3;
    }
    &__buttons-delete {
        color: #fff;
        background: #ff2a2a;
    }
}

.movie-buttons-watched__icon {
  width: 15px;
  margin-left: 10px;
}
</style>