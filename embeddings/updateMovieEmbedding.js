import {
    generateEmbedding
} from "./generateEmbeddings.js";
import {
    supabase
} from "./supabase.js";

const getMovies = () => {
    return supabase.from('movie_table').select('*').is('embedding', null);
}


const addMovieEmbedding = async (movie) => {
    const embedding = await generateEmbedding(movie.overview);
    await supabase.from('movie_table').update({
        embedding
    }).eq('id', movie.id).then(() => console.log("Embedding Updated"));
}


const processAllMovies = async () => {
    const {
        data: movies
    } = await getMovies();

    if (!movies?.length) return;

    await Promise.all(movies.map(addMovieEmbedding))
    processAllMovies();
}

processAllMovies();