import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const WelcomeMessage = () => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.elastic(1.5), // Adjust the tension for the elastic effect
            useNativeDriver: true,
        }).start();
    }, []);

    const animatedStyles = {
        transform: [{ scale: scaleValue }],
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.text, animatedStyles]}>Welcome, what are you looking for?</Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
});

export default WelcomeMessage;
