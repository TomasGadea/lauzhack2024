import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "./ThemedText";

const HEADER_HEIGHT = 60;

type Props = PropsWithChildren<{
    headerBackgroundColor: { dark: string; light: string };
}>;

export default function RootLayout({ children, headerBackgroundColor }: Props) {
    const colorScheme = useColorScheme() ?? "light";
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const bottom = useBottomTabOverflow();
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                    ),
                },
            ],
        };
    });

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                scrollIndicatorInsets={{ bottom }}
                contentContainerStyle={{ paddingBottom: bottom }}
            >
                <Animated.View
                    style={[
                        styles.header,
                        { backgroundColor: headerBackgroundColor[colorScheme] },
                        headerAnimatedStyle,
                    ]}
                >
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText style={styles.title}>Lirica</ThemedText>
                    </ThemedView>
                </Animated.View>
                <ThemedView style={styles.content}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "SixtyfourConvergence",
        fontSize: 20,
        lineHeight: 24,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        top: 40,
    },
    container: {
        flex: 1,
    },
    header: {
        height: HEADER_HEIGHT,
        overflow: "hidden",
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: "hidden",
    },
});
