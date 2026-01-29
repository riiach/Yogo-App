import { View, StyleSheet, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";

const DOT_COLORS = ["#FF6FA3", "#8A6FFF", "#3A8DFF"];

const ThinkingLoader = () => {
    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(anim, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            {DOT_COLORS.map((color, i) => {
                const opacity = anim.interpolate({
                    inputRange: [
                        (i - 1) / DOT_COLORS.length,
                        i / DOT_COLORS.length,
                        (i + 1) / DOT_COLORS.length,
                    ],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                });

                const scale = anim.interpolate({
                    inputRange: [
                        (i - 1) / DOT_COLORS.length,
                        i / DOT_COLORS.length,
                        (i + 1) / DOT_COLORS.length,
                    ],
                    outputRange: [0.8, 1.15, 0.8],
                    extrapolate: "clamp",
                });

                return (
                    <Animated.View
                        key={i}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: color,
                                opacity,
                                transform: [{ scale }],
                            },
                        ]}
                    />
                );
            })}
        </View>
    );
};

export default ThinkingLoader;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#1f2933",
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
});
