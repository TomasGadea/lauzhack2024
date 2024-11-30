import * as React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SpeechInput } from "@/components/SpeechInput";
import RootLayout from "@/components/RootLayout";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/Button";

export default function HomeScreen() {
    const navigation = useNavigation();
    const [text, setText] = React.useState<string>("");
    const onPress = () => navigation.navigate("camera");
    return (
        <RootLayout
            headerBackgroundColor={{ light: "#FFFFFF", dark: "#1D3D47" }}
        >
            <ThemedView style={styles.inputContainer}>
                <SpeechInput text={text} setText={setText} />
            </ThemedView>
            <ThemedView style={styles.recordButton}>
                <Button onPress={onPress} />
            </ThemedView>
        </RootLayout>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        gap: 8,
    },
    recordButton: {
        paddingHorizontal: 100,
    },
});
