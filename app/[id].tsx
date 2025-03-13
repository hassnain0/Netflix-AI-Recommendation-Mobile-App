import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/src/lib/supabase";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);

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

  if (!movie) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie?.title}</Text>
      <Text style={styles.subtitle}>{movie?.tagline}</Text>
      <Text style={styles.overview}>{movie?.overview}</Text>


      <Text style={styles.similar}>Similar Movies</Text>
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
