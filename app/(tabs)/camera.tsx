import React, { useState, useRef } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import { Video } from "expo-av";
import { CameraView, useCameraPermissions } from "expo-camera";
import ScrollingTextComponent from "@/components/ScrollingTextComponent";
import { shareAsync } from 'expo-sharing';

type RouteParams = {
    text: string;
    secondsPerLine: number;
};

export default function CameraComponent() {
    let cameraRef = useRef();
    const [facing, setFacing] = useState("back");
    const [CameraPermission, requestCameraPermission] = useCameraPermissions();
    const [recording, setRecording] = useState(false);
    const [video, setVideo] = useState();

    const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
    const { text, secondsPerLine } = route.params || {};

    if (!CameraPermission) {
        return <View />;
    }

    if (!CameraPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button
                    onPress={requestCameraPermission}
                    title="Grant Camera Permission"
                />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    let recordVideo = () => {
        setRecording(true);
        let options = {
            quality: "1080p",
            maxDuration: 60,
            mute: false,
        };

        cameraRef.current.recordAsync(options).then((recordedVideo) => {
            setVideo(recordedVideo);
            setRecording(false);
        });
    };
    let stopRecording = () => {
        setRecording(false);
        cameraRef.current.stopRecording();
    };

    if (video) {
            let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
            };

        return (
            <SafeAreaView style={styles.container}>
                <Video
                    style={styles.video}
                    source={{ uri: video.uri }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                />
                <TouchableOpacity
                    style={styles.discardButton}
                    onPress={() => setVideo(undefined)}
                >
                    <Text style={styles.text}> AAAAA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.discardButton}
                    onPress={shareVideo}
                >
                    <Text style={styles.text}> BBBBBB</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                ref={cameraRef}
                mode="video"
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraFacing}
                    >
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={recording ? stopRecording : recordVideo}
                    >
                        <Text style={styles.text}>
                            {recording ? "Stop" : "Record"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
        marginBottom: 30,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    video: {
        flex: 1,
        alignSelf: "center",
        width: "90%",
        marginbottom: 200,
    },
    discardButton: {
        flex: 1,
        marginBottom: 0,
    },
});
