import React, { useState, useRef } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
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
import { shareAsync } from "expo-sharing";
import Icon from "react-native-vector-icons/FontAwesome";

type RouteParams = {
    text: string;
    secondsPerLine: number;
};

export default function CameraComponent() {
    let cameraRef = useRef();
    let scrollerRef = useRef();

    const [facing, setFacing] = useState("front");
    const [CameraPermission, requestCameraPermission] = useCameraPermissions();
    const [recording, setRecording] = useState(false);
    const [video, setVideo] = useState();
    const [pauseHappened, setPauseHappened] = useState(false);

    const navigation = useNavigation();
    const handleCameraRestart = () => {
        setRecording(false);
        setVideo(undefined);
        setPauseHappened(false);

    };
    const onBack = () => {
        scrollerRef.current?.handleRestart();
        handleCameraRestart();
        navigation.navigate("index");
    };
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
        scrollerRef.current?.handleStart();
        cameraRef.current?.recordAsync(options).then((recordedVideo) => {
            setVideo(recordedVideo);
            setRecording(false);
        });
    };

    let stopRecording = () => {
        setRecording(false);
        scrollerRef.current?.handleRestart();
        cameraRef.current?.stopRecording();
    };

    const onPause = () => {
        setRecording(false);
        scrollerRef.current?.handleStop();
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
                    resizeMode="cover"
                    isLooping
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonSecond}
                        onPress={() => setVideo(undefined)}
                    >
                        <Icon name={"trash"} size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonSecond}
                        onPress={shareVideo}
                    >
                        <Icon name={"share"} size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
    // BUG: record some video + back + camera + toggle sets video despite handling restart
    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                ref={cameraRef}
                mode="video"
            >
                <ScrollingTextComponent
                    text={text}
                    secondsPerLine={secondsPerLine}
                    ref={scrollerRef}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onBack}>
                        <Icon name="arrow-left" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={recording ? stopRecording : recordVideo}
                    >
                        <Icon
                            name={recording ? "stop-circle" : "video-camera"}
                            size={30}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
    style={styles.button}
    onPress={() => {
        if (recording) {
            setPauseHappened(true);
            onPause();
        } else if (!pauseHappened) {
            toggleCameraFacing();
        }
    }}
>
    {recording ? (
        <Icon name="pause" size={30} color="white" />
    ) : !pauseHappened ? (
        <Icon name="refresh" size={30} color="white" />
    ) : null}
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
    buttonSecond: {
        flex: 1,
        alignItems: "center",
        top: 75,
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
        width: "100%",
        height: "100%",
        aspectRatio: 0.75,
        borderRadius: 20,
        overflow: 'hidden',
        top: 75,
    },
    discardButton: {
        flex: 1,
        marginBottom: 0,
    },
});
