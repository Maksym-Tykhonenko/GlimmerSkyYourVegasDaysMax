import React, { useEffect, useState } from 'react';
import {
    View as SagevVbox,
    Text,
    TouchableOpacity as YarouPrespat,
    ScrollView,
    Image,
    Switch,
    Linking,
    Share,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { merglirfontsays } from '../merglirfontsays';
import { useNavigation } from '@react-navigation/native';

const LIGHT_RED = '#A1000C';
const DARK_RED = '#6B1818';
const STORAGE_KEY = 'notificationsEnabled';

export default function GavrekSettings() {
    const { width: vesremwid, height: vesremhit } = require('react-native').Dimensions.get('window');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then(val => {
            if (val !== null) setNotificationsEnabled(val === 'true');
        });
    }, []);

    const toggleNotifications = async () => {
        const newVal = !notificationsEnabled;
        setNotificationsEnabled(newVal);
        await AsyncStorage.setItem(STORAGE_KEY, newVal ? 'true' : 'false');
    };

    const vegasrepl = useNavigation();

    return (
        <SagevVbox style={{
            flex: 1,
            alignItems: 'center',
            paddingBottom: vesremhit * 0.08,
            backgroundColor: 'transparent',
        }}>
            <ScrollView
                style={{ width: vesremwid }}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop: vesremhit * 0.019,
                    paddingBottom: vesremhit * 0.03,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Notifications */}
                <SagevVbox style={{
                    alignItems: 'center',
                    backgroundColor: LIGHT_RED,
                    width: vesremwid * 0.93,
                    borderRadius: vesremwid * 0.045,
                    marginBottom: vesremwid * 0.025,
                    justifyContent: 'space-between',
                    paddingVertical: vesremwid * 0.045,
                    flexDirection: 'row',
                    paddingHorizontal: vesremwid * 0.045,
                }}>
                    <Text style={{
                        color: '#fff',
                        fontFamily: merglirfontsays.glimontMedi,
                        fontSize: vesremwid * 0.045,
                    }}>Notifications</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={toggleNotifications}
                        trackColor={{ false: DARK_RED, true: '#FFEFEA' }}
                        thumbColor={notificationsEnabled ? LIGHT_RED : '#fff'}
                        style={{
                            transform: [{ scaleX: vesremwid / 400 }, { scaleY: vesremwid / 400 }],
                        }}
                    />
                </SagevVbox>

                {/* Reset all data */}
                <YarouPrespat
                    style={{
                        width: vesremwid * 0.93,
                        marginBottom: vesremwid * 0.025,
                        borderRadius: vesremwid * 0.045,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: LIGHT_RED,
                        paddingVertical: vesremwid * 0.045,
                        paddingHorizontal: vesremwid * 0.045,
                    }}
                    onPress={() => {
                        Alert.alert(
                            'Reset all data',
                            'Are you sure you want to reset all app data?',
                            [
                                { text: 'Cancel', style: 'cancel' },
                                { text: 'OK', onPress: () => {
                                    AsyncStorage.clear();
                                    setNotificationsEnabled(false);
                                    vegasrepl.replace('GlimmerSkyYourVegasDaysLoading');
                                }}
                            ]
                        );
                    }}
                    activeOpacity={0.8}
                >
                    <Text style={{
                        color: '#fff',
                        fontFamily: merglirfontsays.glimontMedi,
                        fontSize: vesremwid * 0.045,
                    }}>Reset all data</Text>
                    <Image
                        source={require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/resetApp.png')}
                        style={{
                            width: vesremwid * 0.055,
                            height: vesremwid * 0.055,
                            resizeMode: 'contain',
                        }}
                    />
                </YarouPrespat>

                {/* Share the app */}
                <YarouPrespat
                    style={{
                        flexDirection: 'row',
                        backgroundColor: LIGHT_RED,
                        borderRadius: vesremwid * 0.045,
                        marginBottom: vesremwid * 0.025,
                        width: vesremwid * 0.93,
                        justifyContent: 'space-between',
                        paddingVertical: vesremwid * 0.045,
                        alignItems: 'center',
                        paddingHorizontal: vesremwid * 0.045,
                    }}
                    onPress={() => {
                        Share.share({
                            message: `Do you want to explore the hidden gems of Las Vegas? Download "Glimmer Sky: Your Vegas Days" now and start your adventure!`
                        })
                    }}
                    activeOpacity={0.8}
                >
                    <Text style={{
                        color: '#fff',
                        fontFamily: merglirfontsays.glimontMedi,
                        fontSize: vesremwid * 0.045,
                    }}>Share the app</Text>
                    <Image
                        source={require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/share.png')}
                        style={{
                            width: vesremwid * 0.055,
                            height: vesremwid * 0.055,
                            resizeMode: 'contain',
                        }}
                    />
                </YarouPrespat>

                {/* Terms of Use */}
                <YarouPrespat
                    style={{
                        backgroundColor: LIGHT_RED,
                        borderRadius: vesremwid * 0.045,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginBottom: vesremwid * 0.025,
                        paddingVertical: vesremwid * 0.045,
                        paddingHorizontal: vesremwid * 0.045,
                        width: vesremwid * 0.93,
                    }}
                    onPress={() => {
                        Linking.openURL('https://www.termsfeed.com/live/bc4b5c5c-6481-4211-8ae6-554f5da4f090');
                    }}
                    activeOpacity={0.8}
                >
                    <Text style={{
                        color: '#fff',
                        fontFamily: merglirfontsays.glimontMedi,
                        fontSize: vesremwid * 0.045,
                    }}>Terms of Use</Text>
                </YarouPrespat>
            </ScrollView>
        </SagevVbox>
    );
}
