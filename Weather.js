import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

const weatherOptions = {
    Haze: {
        iconName: "weather-hail"
    },
    Clear: {
        iconName: "weather-cloudy",
        gradient: ["#5433FF","#20BDFF","#A5FECB"],
        title: "Clear Weather!!!",
        subtitle: "Go outside"
    }
}

export default function Weather({ temp, condition }) {
    return (
        <LinearGradient colors={weatherOptions[condition].gradient} style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.halfContainer}>
                <MaterialCommunityIcons name={weatherOptions[condition].iconName} size={124} color="white" />
                <Text style={styles.temp}> {temp}℃ </Text>
                <Text style={styles.condition}> {condition} </Text>
            </View>
            <View style={{...styles.halfContainer, ...styles.textContainer}}>
                <Text style={styles.title}> {weatherOptions[condition].title} </Text>
                <Text style={styles.subtitle}> {weatherOptions[condition].subtitle}</Text>
            </View>
        </LinearGradient>
    );
}

// proptype 이 사용됨
Weather.PropTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf(
        ["Thunderstorm", "Drizzle", "Rain", "Snow", "Atmosphere", "Clear", "Clouds", "Haze", "Dust", "Mist", "Drizzle"]).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        //alignContent: "center",
        alignItems: "center"
    },
    temp: {
        fontSize: 36,
        color: "white"
    },
    condition: {
        fontSize: 24,
        color: "white"
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 38,
        fontWeight: "300",
        color: "white",
        marginBottom: 10
    }, 
    subtitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "white"
    },
    textContainer: {
        paddingHorizontal: 30,
        alignItems: "flex-start"
    }
})