import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { MicMove } from '@/components/MicMove';
import { SpeechInput } from '@/components/SpeechInput';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
    const [text, setText] = React.useState<string>('');
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#F0F8FF', dark: '#1D3D47' }}
        >
            <ThemedView style={styles.titleContainer}>
                <MicMove />
                <ThemedText type="title">Lirica</ThemedText>
                <MicMove />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <SpeechInput text={text} setText={setText} />
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
