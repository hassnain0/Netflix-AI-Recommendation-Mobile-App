import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import MovieItem from "@/src/lib/components/MovieItem";
import { theme } from "../src/colors/theme";

const index = () => {
  //States
  const [movie, setMovies] = useState([]);
  const [query, setQuery] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let { data: movie_table, error } = await supabase
        .from("movie_table")
        .select("*")
        .range(0, 25);

      if (movie_table) {
        setMovies(movie_table);
      }
    };
    fetchData();
  }, []);

  const onSearch = async () => {
    const {
      data: { embedding },
    } = await supabase.functions.invoke("embed", {
      body: { input: query },
    });

    const { data, error } = await supabase.rpc("match_movies", {
      query_embedding: embedding,
      match_threshold: 0.78,
      match_count: 10,
    });
    console.log("data", data, "Erorr", error);
    setMovies(data);
  };

  const onPress = async () => {
    const { data } = await supabase.functions.invoke("embed", {
      body: { input: query },
    });

    const { data: movies } = await supabase.rpc("match_movies", {
      query_embedding: data.embedding,
      match_threshold: 0.78, // Choose an appropriate threshold for your data
      match_count: 5, // Choose the number of matches
    });

    setMovies(movies);
    setQuery(" ");
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{}}>
          <TextInput
            placeholder="AI: Search for Movies"
            placeholderTextColor={"gray"}
            style={styles.input}
            onChangeText={(text) => setQuery(text)}
            value={query}
          ></TextInput>

          <Button color={"transparent"} onPress={onPress} title="Search" />
        </View>
        <FlatList data={movie} renderItem={MovieItem} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  itemTitle: {
    fontSize: 20,
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    padding: 15,
    borderColor: "gray",
    borderRadius: 10,
    color: "gainsboro",
    margin: 10,
  },
});

export default index;
