import { SafeAreaView } from "react-native-safe-area-context";
import ChatScreen from "./screens/ChatScreen";
import { StyleSheet, Image, View, Platform, useWindowDimensions } from "react-native";

export default function Index() {
    const { width } = useWindowDimensions();
    const isWeb = Platform.OS === 'web';
    const isDesktop = isWeb && width > 768;

    const content = (
        <SafeAreaView style={styles.container} edges={{}}>
            <Image
                source={require("../assets/images/yogo_logo.png")}
                style={styles.background}
                resizeMode="cover"
                blurRadius={8}
            />
            <View style={styles.content}>
                <ChatScreen />
            </View>
        </SafeAreaView>
    );

    // Wrap in desktop container if on web desktop
    if (isDesktop) {
        return (
            <View style={styles.desktopWrapper}>
                <View style={styles.phoneMockup}>
                    {content}
                </View>
            </View>
        );
    }

    return content;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    background: {
        width: 300,
        height: 300,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [
            { translateX: -150 },
            { translateY: -150 },
        ]
    },
    content: {
        flex: 1,
    },
    // Web-only styles for desktop
    desktopWrapper: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneMockup: {
        width: 390,
        height: 844,
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
        ...(Platform.OS === 'web' && {
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '12px solid #2a2a2a',
        }),
    },
    notch: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: [{ translateX: -75 }],
        width: 150,
        height: 30,
        backgroundColor: '#2a2a2a',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        zIndex: 1000,
    },
});