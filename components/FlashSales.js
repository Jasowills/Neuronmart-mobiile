import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image, Animated } from "react-native";
import FlashSalesDeals from "./FlashSalesDeals";

const FlashSales = () => {
  const secondsInADay = 24 * 60 * 60;
  const initialCountdown = 6 * secondsInADay; // Initial countdown time in seconds (e.g., 6 days)

  const [countdown, setCountdown] = useState(initialCountdown);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [countdown]);

  const days = Math.floor(countdown / (24 * 60 * 60));
  const hours = Math.floor((countdown % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((countdown % (60 * 60)) / 60);
  const seconds = countdown % 60;

  const animatedFontSize = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [13, 15],
  });

  return (
    <View style={styles.container}>
      <View style={styles.flashSales}>
        <View style={styles.icon}>
          <Image
            source={require('../assets/2.png')}
            style={styles.image}
          />
          <Text style={styles.text}>Flash Sales</Text>
        </View>
        <Animated.Text style={[styles.countdown, { fontSize: animatedFontSize }]}>
          {` ${days}d ${hours}h ${minutes}m ${seconds}s`}
        </Animated.Text>
      </View>
      <FlashSalesDeals/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
  flashSales: {
    backgroundColor: "#C92A2A",
    padding: 5,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    width: 90,
  },
  text: {
    color: "#fff",
    marginLeft: -5,
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

export default FlashSales;
