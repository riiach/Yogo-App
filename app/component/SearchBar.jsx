import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import * as ImagePicker from "expo-image-picker"
import { COLORS } from "../colors"
import galleryIcon from "../../assets/images/openGallery.png"
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SearchBar = ({
    placeholder = "Paste an image URL...",
    onSubmitUrl,
    onPickImage,
    disabled
}) => {
    const [value, setValue] = React.useState("")

    const handleSubmit = () => {
        const text = value.trim();
        if (!text || disabled) return;
        onSubmitUrl?.(text);
        setValue("");
    };

    const handlePickImage = async () => {
        if (disabled) return;

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access photos is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            onPickImage?.(result.assets[0]);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeholder}
                    placeholderTextColor="gray"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="url"
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                    editable={!disabled}
                />
                <TouchableOpacity
                    style={[styles.button, disabled && { opacity: 0.5 }]}
                    onPress={handleSubmit}
                    disabled={disabled}
                    activeOpacity={0.8}
                >
                    <FontAwesome name="send" size={20} color={disabled ? "gray" : "white"} />
                </TouchableOpacity>
            </View>
            <View style={styles.openGallery}>
                <TouchableOpacity
                    style={styles.uploadBtn}
                    onPress={handlePickImage}
                    activeOpacity={0.8}
                    disabled={disabled}
                >
                    <Image
                        source={galleryIcon}
                        style={styles.galleryIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default SearchBar
const styles = StyleSheet.create({
    container: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
    },
    searchBar: {
        flex: 14,
        flexDirection: 'row',
        gap: 6,
        justifyContent: "center"
    },
    openGallery: {
        flex: 2,
    },
    input: {
        width: 270,
        height: 50,
        backgroundColor: COLORS.buttonBackground,
        borderWidth: 0.3,
        borderColor: 'gray',
        borderRadius: 25,
        paddingLeft: 20,
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.buttonBackground,
        borderWidth: 0.3,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    uploadBtn: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.buttonBackground,
        borderWidth: 0.3,
        borderColor: "gray",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    galleryIcon: {
        width: 40,
        height: 40,
    }
})
