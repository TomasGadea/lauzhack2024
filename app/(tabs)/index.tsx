import * as React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SpeechInput } from "@/components/SpeechInput";
import RootLayout from "@/components/RootLayout";
import { ThemedView } from "@/components/ThemedView";
import Button from "@/components/Button";
import PaceButtons from "@/components/PaceButtons";

export default function HomeScreen() {
    const navigation = useNavigation();
    const [text, setText] = React.useState<string>("");
    const [secondsPerLine, setSecondsPerLine] = React.useState<number>(1.25);

    const onPress = () => {
        navigation.navigate("camera", { text, secondsPerLine });
    };
    return (
        <RootLayout
            headerBackgroundColor={{ light: "#FFFFFF", dark: "#1D3D47" }}
        >
            <ThemedView style={styles.inputContainer}>
                <SpeechInput text={text} setText={setText} />
            </ThemedView>
            <ThemedView style={styles.paceButtonsContainer}>
                <PaceButtons onSelect={setSecondsPerLine} />
            </ThemedView>
            <ThemedView style={styles.recordButtonContainer}>
                <Button onPress={onPress} />
            </ThemedView>
        </RootLayout>
    );
}

const styles = StyleSheet.create({
    inputContainer: {},
    paceButtonsContainer: {
        bottom: 15,
    },
    recordButtonContainer: {
        paddingHorizontal: 100,
    },
});
