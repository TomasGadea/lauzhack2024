import React, {
    useEffect,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import { View, Text, StyleSheet } from "react-native";

const ScrollingTextComponent = forwardRef(
    ({ text, charsPerLine = 25, secondsPerLine = 1 }, ref) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [lines, setLines] = useState([]);
        const [isRunning, setIsRunning] = useState(false);

        useEffect(() => {
            const splitTextIntoLines = (text) => {
                const segments = text.split("\n");
                const processedLines = [];

                segments.forEach((segment) => {
                    const words = segment.split(" ");
                    let currentLine = "";

                    words.forEach((word) => {
                        if (
                            currentLine.length + word.length + 1 <=
                            charsPerLine
                        ) {
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

        useImperativeHandle(ref, () => ({
            handleStart,
            handleRestart,
        }));

        return (
            <View style={[styles.container]}>
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
            </View>
        );
    },
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    text: {
        fontFamily: "monospace",
        fontSize: 40,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },
    primaryLine: {
        opacity: 1,
    },
    secondaryLine: {
        opacity: 0.5,
    },
});

export default ScrollingTextComponent;
