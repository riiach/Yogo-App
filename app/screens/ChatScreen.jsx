import { FlatList, StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import MessageBubble from "../component/MessageBubble";
import SearchBar from "../component/SearchBar";
import ShareAndSave from "../component/ShareAndSave";
import { detectLogo } from "../api/logoDetection";

const ChatScreen = () => {
    const [message, setMessage] = React.useState([]);
    const flatListRef = React.useRef(null);

    React.useEffect(() => {
        if (message.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [message]);


    const latestLink = message
        .slice()
        .reverse()
        .find(item => item.link)?.link;

    function createMessage({ role, text = "", imageUri, link }) {
        return {
            id: String(Date.now() + Math.random()),
            role,
            text,
            imageUri,
            link,
        };
    }

    async function handleSubmitUrl(url) {
        const userMsg = createMessage({ role: "user", text: url });
        const loadingMsg = createMessage({
            role: "system",
            text: "Yogo is detecting the logo...",
        });

        setMessage(prev => [...prev, userMsg, loadingMsg]);

        try {
            const result = await detectLogo(url);
            const logo = result.logos?.[0];

            setMessage(prev => [
                ...prev.slice(0, -1),
                createMessage({
                    role: "system",
                    text: logo
                        ? `This looks like ${logo.description}.`
                        : "Yogo couldn't detect your logo.",
                    link: logo?.description
                        ? `https://www.google.com/search?q=${encodeURIComponent(
                            logo.description
                        )}`
                        : undefined,
                }),
            ]);
        } catch (err) {
            setMessage(prev => [
                ...prev.slice(0, -1),
                createMessage({
                    role: "system",
                    text: "Something went wrong. Please try again.",
                }),
            ]);
        }
    }

    async function handlePickImage(asset) {
        const userMsg = createMessage({ role: "user", imageUri: asset.uri });
        const loadingMsg = createMessage({ role: "system", text: "Yogo is detecting the logo..." });

        setMessage(prev => [...prev, userMsg, loadingMsg]);

        try {
            const result = await detectLogo(asset); // Use base64 now
            const logo = result.logos?.[0];

            setMessage(prev => [
                ...prev.slice(0, -1),
                createMessage({
                    role: "system",
                    text: logo ? `This looks like ${logo.description}.` : "I couldn’t detect a logo.",
                    link: logo?.description ? `https://www.google.com/search?q=${encodeURIComponent(logo.description)}` : undefined,
                }),
            ]);
        } catch (err) {
            setMessage(prev => [
                ...prev.slice(0, -1),
                createMessage({ role: "system", text: "Something went wrong. Please try again." }),
            ]);
        }
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
            <ShareAndSave link={latestLink} />

            <FlatList
                style={styles.chatContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16 }}
                ref={flatListRef}
                data={message}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <MessageBubble
                        role={item.role}
                        text={item.text}
                        imageUri={item.imageUri}
                        link={item.link}
                    />
                )}
            />

            <SearchBar
                onSubmitUrl={handleSubmitUrl}
                onPickImage={handlePickImage}
            />
        </KeyboardAvoidingView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    chatContainer: {
        flex: 1,
    },
});
