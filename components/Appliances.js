import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FlashSalesDeals from "./FlashSalesDeals";
import ElectronicDeals from "./ElectronicDeals";
import ApplianceDeals from "./ApplianceDeals";
import { useNavigation } from "@react-navigation/native";
const Appliances = () => {
  const navigation = useNavigation();

  const handleSeeAllPress = () => {
    // Navigate to the categories page when "See All" is pressed
    navigation.navigate('Categories');
  };
  return (
    <View style={styles.container}>
      <View style={styles.flashSales}>
      <TouchableOpacity style={styles.icon} onPress={handleSeeAllPress}>
          <Text style={styles.text}>Electronic Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.text}>See All</Text>
        </TouchableOpacity>
      </View>
      <ApplianceDeals/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
  flashSales: {
    backgroundColor: "#003d29",
    padding: 10,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  text: {
    color: "#fff",
  },
  image: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },
  countdown: {
    color: "white",
    fontSize: 12
  },
});

export default Appliances;
