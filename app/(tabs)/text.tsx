import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Dimensions,
} from "react-native";

export default function ScrollingTextComponent() {
    const scrollAnim = useRef(new Animated.Value(0)).current;
    const [isScrolling, setIsScrolling] = useState(false);
    const { height } = Dimensions.get("window");

    const longText = `
Los Juegos Olímpicos de México 1968, oficialmente conocidos como los Juegos de la XIX Olimpiada, fueron un evento multideportivo internacional celebrado en la Ciudad de México, México, del 12 al 27 de octubre de 1968. Después de dos candidaturas infructuosas, se seleccionó a la capital mexicana como ciudad sede del evento en la 60.ª Sesión del Comité Olímpico Internacional. Desde ese momento se constituyó formalmente el Comité Organizador que se encargó, junto con diversas secretarías de Estado, de la organización de los juegos. A excepción de cuatro sedes y tres estadios de fútbol, todas las instalaciones deportivas se ubicaron dentro de los límites de la ciudad. Se construyeron dos villas olímpicas y se emplearon hoteles y apartamentos para hospedar a deportistas, jueces y entrenadores.
Participaron un total de 5516 atletas —4735 hombres y 781 mujeres— de 112 países, que compitieron en 172 eventos de veinte deportes —dieciocho del programa olímpico y dos de demostración—. Se prohibió la participación de Sudáfrica por sus políticas racistas, las Alemanias compitieron como países separados por primera vez y naciones como El Salvador, Honduras, Kuwait y Paraguay, entre otras, hicieron su debut en los Juegos Olímpicos de Verano. Esta fue la primera edición del evento organizada por un país en vías de desarrollo, por una nación hispanohablante y la primera realizada en América Latina. También fueron los terceros juegos celebrados en otoño, los primeros con controles antidopaje y pruebas de género e hizo su aparición la olimpiada cultural.

  `;

    const startScroll = () => {
        if (!isScrolling) {
            setIsScrolling(true);
            Animated.timing(scrollAnim, {
                toValue: -height, // Scroll to full height of the screen
                duration: 10000, // Adjust duration as needed
                useNativeDriver: true,
            }).start(() => {
                setIsScrolling(false);
            });
        }
    };

    const restartScroll = () => {
        // Reset to initial position
        scrollAnim.setValue(0);
        setIsScrolling(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Animated.Text
                    style={[
                        styles.scrollingText,
                        {
                            transform: [{ translateY: scrollAnim }],
                        },
                    ]}
                >
                    {longText}
                </Animated.Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={startScroll}
                    disabled={isScrolling}
                >
                    <Text style={styles.buttonText}>Start Scroll</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={restartScroll}>
                    <Text style={styles.buttonText}>Restart</Text>
                </TouchableOpacity>
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
    textContainer: {
        height: 200, // Fixed height for visible area
        overflow: "hidden",
        width: "100%",
    },
    scrollingText: {
        fontSize: 16,
        textAlign: "left",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
});
