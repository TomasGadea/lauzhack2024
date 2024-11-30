import * as React from 'react';
import { View, TextInput, StyleSheet, type TextProps } from 'react-native';

export type SpeechInputProps = TextProps & {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
};

export function SpeechInput({ text, setText }: SpeechInputProps) {
    const [focused, setFocused] = React.useState(false);

    return (
        <View style={styles.container}>
            <TextInput
                value={text}
                onChangeText={setText}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={[
                    styles.textInput,
                    { fontSize: 16 },
                    focused ? styles.textInputFocused : null,
                ]}
                placeholder="Message to say during recording..."
                placeholderTextColor="#888"
                multiline={true}
                numberOfLines={4}
                maxLength={300}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    textInput: {
        minHeight: 150,
        maxHeight: 250,
        paddingTop: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        color: '#333',
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    //textInputFocused: {
    //    borderColor: '#007bff',
    //    shadowColor: '#007bff',
    //    shadowOffset: { width: 0, height: 4 },
    //    shadowOpacity: 0.2,
    //    shadowRadius: 1,
    //},
});
