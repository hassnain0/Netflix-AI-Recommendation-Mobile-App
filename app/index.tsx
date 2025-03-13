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

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* <View style={{flexDirection:'row', alignItems:'center',}}> */}
        <TextInput
          placeholder="AI: Search for Movies"
          placeholderTextColor={"gray"}
          style={styles.input}
          onChangeText={(text) => setQuery(text)}
          value={query}
        ></TextInput>
        {/* <Button title="Search"></Button> */}
        {/* </View> */}
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
    margin:10,
  },
});

export default index;
