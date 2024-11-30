import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const longText = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. 
  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
  Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. 
  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
  Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. 
  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
  Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. 
  Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. 
  Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
  `;

export default function ScrollingTextComponent({
    text = longText,
    charsPerLine = 25,
    secondsPerLine = 1,
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
