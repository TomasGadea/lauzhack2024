import * as React from 'react';
import { StyleSheet } from 'react-native';

import { MicMove } from '@/components/MicMove';
import { SpeechInput } from '@/components/SpeechInput';
import RootLayout from '@/components/RootLayout';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
    const [text, setText] = React.useState<string>('');
    return (
        <RootLayout
            headerBackgroundColor={{ light: '#FFFFFF', dark: '#1D3D47' }}
        >
            <ThemedView style={styles.inputContainer}>
                <SpeechInput text={text} setText={setText} />
            </ThemedView>
        </RootLayout>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        gap: 8,
        marginBottom: 50,
    },
});
