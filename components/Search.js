// Search.js
import React, { useState } from "react";
import { TextInput, View, Button } from "react-native";

const Search = ({ onSearch, navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://neuron-mart-backend.onrender.com/products");
      const data = await response.json();

      const filteredResults = data.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Navigate to the SearchResults screen with the filtered results
      navigation.navigate("SearchResults", { results: filteredResults });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    fetchData();
  };

  return (
    <View style={{
      width: "80%",
    }}>
      <TextInput
        placeholder="Search Products, Brands and Categories..."
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 5,
          padding: 10,
          width: "100%",
          borderColor: "#003d29",
        }}
        onChangeText={handleSearchChange}
        value={searchTerm}
        onSubmitEditing={handleSearch} // Call handleSearch when Enter key is pressed
      />
    </View>
  );
};

export default Search;


// Todo: I want to improve the search accuracy, if theres any product that matches the exact letters for example, "Ps5" and "Ps5 " should still bring the same results despite the space difference

