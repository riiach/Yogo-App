import {StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import logo from '../../assets/images/yogo_logo.png'

const MessageBubble = ({role = "system", text, link, imageUri}) => {
    const isUser = role === "user";
    const hasText = !!text;
    const isResult = !!link;

    const imageStyle = isUser && !hasText
        ? styles.userImgPreview
        : isUser && hasText
        ? styles.userPreview
        : styles.systemPreview;

    return (
        <View
            style={[
                styles.container,
                isUser ? styles.userRow : styles.systemRow,
            ]}
        >
        {!isUser &&
                <Image
                    source={logo}
                    style={styles.logo}
                    resizeMode="cover"
                />
            }
            <View
                style={[
                    styles.bubble,
                    isUser ? styles.userBubble : styles.systemBubble
                ]}
            >
                {!!text &&
                    <Text
                        style={[
                            styles.text,
                            isUser
                                ? styles.userText
                                : styles.systemText,
                        ]}
                    >{text}</Text>
                }
                {!!link &&
                    <Text
                        style={[
                            styles.link,
                        ]}
                    >{link}</Text>
                }
                {!!imageUri &&
                    <Image
                        source={{ uri: imageUri }}
                        style={imageStyle}
                        resizeMode="cover"
                    />
                }
            </View>
        </View>
    )
}
export default MessageBubble
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: "flex-start",
    },
    userRow: {
        justifyContent: "flex-end",
    },

    systemRow: {
        justifyContent: "flex-start",
    },
    bubble: {
        maxWidth: "80%",
        borderRadius: 16,
        marginVertical: 6,
    },
    userBubble: {
        backgroundColor: "white",
        borderWidth: 0.3,
        borderColor: 'white',
        overflow: "hidden",
    },
    systemBubble: {
        backgroundColor: "black",
        borderWidth: 0.3,
        borderColor: 'grey',
        overflow: "hidden",
    },
    resultBubble: {

    },
    text: {
        color: "black",
        fontSize: 16,
        lineHeight: 16,
        margin: 12,
    },
    link: {
        color: "gray",
        fontSize: 16,
        lineHeight: 16,
        marginLeft: 12,
        marginBottom: 12,
        textDecorationLine: "underline",
    },
    userText: {
        color: "black"
    },
    systemText: {
        color: "white"
    },
    systemPreview: {
        width: 320,
        height: 240,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    userPreview: {
        width: 320,
        height: 80,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    userImgPreview: {
        width: 280,
        aspectRatio: 1,
        borderRadius: 16
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: 'grey',
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        backgroundColor: "black",
        padding: 8,
        marginTop: 2,
    }
});

