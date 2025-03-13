import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import MovieItem from "@/src/lib/components/MovieItem";
import { theme } from "./src/colors/theme";
const App = () => {
  //States
  const [movie, setMovies] = useState([]);

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

  //Render Item Function
  const Item = ({ item }) => {
    console.log("ITem", item);

    <Text style={styles.itemTitle}>{item.title}</Text>;
  };

  return (
    <View style={styles.container}>
      <FlatList data={movie} renderItem={MovieItem} />
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
});

export default App;
