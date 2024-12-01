import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ScrollingTextComponent({
    text,
    charsPerLine = 25,
    secondsPerLine = 1,
}: {
    text: string;
    charsPerLine?: number;
    secondsPerLine?: number;
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lines, setLines] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const splitTextIntoLines = (text: string) => {
            const segments = text.split("\n");
            const processedLines: string[] = [];

            segments.forEach((segment) => {
                const words = segment.split(" ");
                let currentLine = "";

                words.forEach((word) => {
                    if (currentLine.length + word.length + 1 <= charsPerLine) {
                        currentLine = currentLine
                            ? `${currentLine} ${word}`
                            : word;
                    } else {
                        processedLines.push(currentLine);
                        currentLine = word;
                    }
                });

                if (currentLine) {
                    processedLines.push(currentLine);
                }
            });

            return processedLines;
        };

        setLines(splitTextIntoLines(text));
    }, [text, charsPerLine]);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            if (currentIndex < lines.length) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            } else {
                clearInterval(interval);
            }
        }, secondsPerLine * 1000);

        return () => clearInterval(interval);
    }, [isRunning, currentIndex, lines]);

    const handleStart = () => setIsRunning(true);
    const handleRestart = () => {
        setIsRunning(false);
        setCurrentIndex(0);
    };

    return (
        <View style={[styles.container, { width: charsPerLine * 25 }]}>
            <Text style={[styles.text, styles.secondaryLine]}>
                {lines[currentIndex - 1] || ""}
            </Text>
            <Text style={[styles.text, styles.primaryLine]}>
                {lines[currentIndex] || ""}
            </Text>
            <Text style={[styles.text, styles.secondaryLine]}>
                {lines[currentIndex + 1] || ""}
            </Text>
            <Text style={[styles.text, styles.secondaryLine]}>
                {lines[currentIndex + 2] || ""}
            </Text>

            <View style={styles.buttonContainer}>
                <Button title="Start" onPress={handleStart} />
                <Button title="Restart" onPress={handleRestart} color="red" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    text: {
        fontFamily: "monospace",
        fontSize: 20,
        textAlign: "center",
        color: "black",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    primaryLine: {
        opacity: 1,
    },
    secondaryLine: {
        opacity: 0.5,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
    },
});