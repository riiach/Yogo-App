import {FlatList, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import MessageBubble from '../component/MessageBubble'
import SearchBar from '../component/SearchBar'
import ShareAndSave from "../component/ShareAndSave";

const testMessages = [
    {
        id: "1",
        role: "system",
        text: "Hi! My name is Yogo. Let me find your logo."
    },
    {
        id: "2",
        role: "user",
        text: "thisIsTheLink.comthisIsTheLink.comthisIsTheLink.comthisIsTheLink.com",
        imageUri: "https://images.pexels.com/photos/10657974/pexels-photo-10657974.jpeg"
    },
    {
        id: "3",
        role: "system",
        text: "Yogo is detecting the logo..."
    },
    {
        id: "4",
        role: "system",
        text: "This is Nike.",
        link: "https://www.nike.gov.uk/",
        imageUri: "https://images.pexels.com/photos/34719406/pexels-photo-34719406.jpeg"
    },
    {
        id: "5",
        role: "user",
        text: "",
        imageUri: "https://images.pexels.com/photos/10657974/pexels-photo-10657974.jpeg"
    },
]

const ChatScreen = () => {
    const [message, setMessage] = React.useState(testMessages);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
            <ShareAndSave />
            <FlatList
                style={styles.chatContainer}
                contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 16,
                }}
                data={message}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <MessageBubble
                        role={item.role}
                        text={item.text}
                        imageUri={item.imageUri}
                        link={item.link}
                    />
                )}
            >
            </FlatList>
            <SearchBar
                onSubmitUrl={(url) => setMessage([
                    {
                        id: String(Date.now()),
                        role: "user",
                        text: url
                    },
                    {
                        id: String(Date.now() + 1),
                        role: "system",
                        text: "Yogo is detecting the logo..."
                    }
                ])}
                onPickImage={(asset) => setMessage([
                    {
                        id: String(Date.now()),
                        role: "user",
                        text: "",
                        imageUri: asset.uri,
                    },
                    {
                        id: String(Date.now() + 1),
                        role: "system",
                        text: "Yogo is detecting the logo..."
                    }
                ])}
            />
        </KeyboardAvoidingView>
    )
}
export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "transparent",
        padding: 8,
    },
    font: {
        fontSize: 16,
        color: "white",
    },
    chatContainer: {
        flex: 1,
        backgroundColor: "transparent",
        padding: 4,
    }
})
