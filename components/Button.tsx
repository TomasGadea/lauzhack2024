import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export type ButtonProps = {
    onPress: () => void;
};

export default function Button({ onPress }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Record</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});
