import { SafeAreaView } from "react-native-safe-area-context";
import ChatScreen from "./screens/ChatScreen";
import { StyleSheet, Image, View } from "react-native";

export default function Index() {
    return (
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
};

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
    }
});

