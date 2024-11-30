import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";


type Option = {
  emoji: string;
  value: number;
};

type PaceButtonsProps = {
  onSelect: (option: number) => void;
};

const PaceButtons: React.FC<PaceButtonsProps> = ({ onSelect }) => {
  const [secondsPerLine, setSecondsPerLine] = React.useState<number>(1.25);

  const options: Option[] = [
    { emoji: "🐢", value: 1.5 },
    { emoji: "🚶", value: 1.25},
    { emoji: "🐇", value: 1},
  ];

  const handlePress = (option: number) => {
    setSecondsPerLine(option);
    onSelect(option);
  };

  return (
    <View style={styles.buttonContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, secondsPerLine === option.value && styles.selectedButton]}
          onPress={() => handlePress(option.value)}
        >
          <Text style={styles.buttonText}>{option.emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#DDDDDD",
    borderRadius: 50,
    padding: 10,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    backgroundColor: "#ADADAD",
  },
  buttonText: {
    fontSize: 24,
  },
});

export default PaceButtons;
