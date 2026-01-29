import {StyleSheet, Text, View, TouchableOpacity, Share, Alert } from 'react-native'
import React from 'react'
import { COLORS } from '../colors'
import EvilIcons from '@expo/vector-icons/EvilIcons';

const ShareAndSave = () => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'AI Detected Your Logo',
                url: "https://www.riachoi.com/",
                title: "Yogo",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    console.log('Shared successfully!');
                } else {
                    // shared
                    console.log('Shared successfully!');
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log("Dismissed!");
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.share}
                onPress={() => onShare()}
            >
                <EvilIcons name="share-apple" size={35} color="white" />
            </TouchableOpacity>
        </View>
    )
}
export default ShareAndSave
const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 5,
    },
    share: {
        width: 50,
        height: 40,
        backgroundColor: COLORS.buttonBackground,
        borderWidth: 0.3,
        borderColor: 'white',
        borderRadius: 25,
        alignItems:'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    }
})
