import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import MovieItem from "@/src/lib/components/MovieItem";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState();

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      const { data: movie } = await supabase
        .from("movie_table")
        .select("*")
        .eq("id", id)
        .single();

      if (movie) setMovie(movie);
    };
    fetchMovie();
  });

  //Fetch Similar Movies Based on Embeddings
  useEffect(() => {
    console.log("Movies Embeddings")
    if (!movie?.embedding)
       
      {return;}

    const fetchSimilarMovies = async () => {
      const { data } = await supabase.rpc("match_movies", {
        query_embedding: movie.embedding,
        match_threshold: 0.78, // Choose an appropriate threshold for your data
        match_count: 5, // Choose the number of matches
      });
      setSimilarMovies(data);
    };
    fetchSimilarMovies();
  }, [movie?.embedding]);

  if (!movie) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie?.title}</Text>
      <Text style={styles.subtitle}>{movie?.tagline}</Text>
      <Text style={styles.overview}>{movie?.overview}</Text>

      <Text style={styles.similar}>Similar Movies</Text>

      <FlatList
      data={similarMovies}
      renderItem={MovieItem}
      />
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gainsboro",
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gainsboro",
    marginVertical: 5,
  },

  overview: {
    color: "gainsboro",
    marginTop: 20,
    lineHeight: 20,
    fontSize: 16,
  },

  similar: {
    color: "gainsboro",
    marginTop: 20,
    fontSize: 16,
  },
});
