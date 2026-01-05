import React, {  useState as glimRavState, useEffect as glimPullEff, } from 'react';
import {
    Image as VeygarImgRune,
    ScrollView as SkyRollField,
    Text as VyrTextRune,
    View as VyrlShellbox,
    TouchableOpacity as SkarFynTouch,
} from 'react-native';
import { merglirfontsays } from '../merglirfontsays';
import SkourgasDetails from './SkourgasDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import yourLocations from '../SkydaysData/yourLocations';
import GliyoveGradient from '../GlimmerSkyYourVegasDaysComponents/GliyoveGradient';

const SKYR_STASH_KEY = 'vegasDaySavedDeckRune';

export default function VeskyrSavedSpots({
    setSkymerTocofPage,
    setScreenPlaceDetailsMode
}: {
    setSkymerTocofPage: (section: string) => void,
    setScreenPlaceDetailsMode: (mode: 'main' | 'details') => void
}) {
    const { width: grimWid, height: grimHit } = require('react-native').Dimensions.get('window');

    const [stashArr, setStashArr] = glimRavState<any[]>([]);
    const [focusSlot, setFocusSlot] = glimRavState<any | null>(null);

    glimPullEff(() => {
        const fetchRunePack = async () => {
            try {
                const raw = await AsyncStorage.getItem(SKYR_STASH_KEY);
                if (raw) {
                    const names = JSON.parse(raw).map((loc: any) => loc.name);
                    setStashArr(yourLocations.filter((loc: any) => names.includes(loc.name)));
                } else {
                    setStashArr([]);
                }
            } catch {
                setStashArr([]);
            }
        };
        fetchRunePack();

        return () => {};
    }, [focusSlot]);

    const purgeFromStash = async (locName: string) => {
        try {
            const raw = await AsyncStorage.getItem(SKYR_STASH_KEY);
            let names = raw ? JSON.parse(raw).map((loc: any) => loc.name) : [];
            names = names.filter((n: string) => n !== locName);

            const newSaved = yourLocations.filter((loc: any) => names.includes(loc.name));
            await AsyncStorage.setItem(SKYR_STASH_KEY, JSON.stringify(newSaved));
            setStashArr(newSaved);
        } catch {}
    };

    if (focusSlot) {
        return (
            <SkourgasDetails
                location={focusSlot}
                onBack={() => {
                    setFocusSlot(null);
                    setScreenPlaceDetailsMode('main');
                }}
            />
        );
    }

    return (
        <VyrlShellbox style={{
                paddingBottom: grimHit * 0.08,
                alignItems: 'center',
                justifyContent: stashArr.length === 0 ? 'center' : undefined,
                flex: 1,
            }}
        >
            {stashArr.length === 0 ? (
                <>
                    <VyrTextRune style={{
                            marginBottom: grimHit * 0.04,
                            fontFamily: merglirfontsays.glimontSemi,
                            fontSize: grimWid * 0.055,
                            textAlign: 'center',
                            color: 'white',
                            marginHorizontal: grimWid * 0.08
                        }}
                    >
                        You haven’t saved any{'\n'}spots yet
                    </VyrTextRune>

                    <SkarFynTouch
                        style={{
                            elevation: 2,
                            width: grimWid * 0.85,
                            borderRadius: grimWid * 0.05,
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOpacity: 0.08,
                            shadowRadius: grimWid * 0.04,
                            height: grimHit * 0.07,
                        }}
                        onPress={() => setSkymerTocofPage('Karta of places')}
                    >
                        <GliyoveGradient />
                        <VyrTextRune
                            style={{
                                color: '#A1000C',
                                fontFamily: merglirfontsays.glimontSemi,
                                fontSize: grimWid * 0.045
                            }}
                        >
                            Explore Now
                        </VyrTextRune>
                    </SkarFynTouch>
                </>
            ) : (
                <SkyRollField
                    contentContainerStyle={{
                        paddingTop: grimHit * 0.04,
                        paddingBottom: grimHit * 0.12,
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <VyrlShellbox style={{
                            flexDirection: 'row',
                            gap: grimWid * 0.04,
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            width: grimWid * 0.91
                        }}
                    >
                        {stashArr.map((loc, idx) => (
                            <VyrlShellbox
                                key={loc.name + idx}
                                style={{
                                    width: grimWid * 0.42,
                                    marginBottom: grimWid * 0.04,
                                    borderRadius: grimWid * 0.06,
                                    overflow: 'hidden',
                                    backgroundColor: 'transparent'
                                }}
                            >
                                <SkarFynTouch
                                    style={{
                                        width: '100%',
                                        aspectRatio: 1,
                                        borderRadius: grimWid * 0.06,
                                        overflow: 'hidden',
                                        marginBottom: grimWid * 0.018
                                    }}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setFocusSlot(loc);
                                        setScreenPlaceDetailsMode('details');
                                    }}
                                >
                                    <VeygarImgRune
                                        source={loc.image}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: grimWid * 0.06
                                        }}
                                        resizeMode="cover"
                                    />
                                </SkarFynTouch>

                                <SkarFynTouch
                                    style={{
                                        alignItems: 'center',
                                        top: grimWid * 0.03,
                                        right: grimWid * 0.03,
                                        width: grimWid * 0.11,
                                        zIndex: 2,
                                        height: grimWid * 0.11,
                                        borderRadius: grimWid * 0.04,
                                        backgroundColor: '#A1000C',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                    }}
                                    onPress={() => purgeFromStash(loc.name)}
                                    activeOpacity={0.7}
                                >
                                    <VeygarImgRune
                                        source={require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/saved.png')}
                                        style={{
                                            width: grimWid * 0.048,
                                            height: grimWid * 0.048
                                        }}
                                        resizeMode="contain"
                                    />
                                </SkarFynTouch>

                                <VyrTextRune
                                    style={{
                                        color: 'white',
                                        fontFamily: merglirfontsays.glimontSemi,
                                        fontSize: grimWid * 0.045,
                                        textAlign: 'center',
                                        marginBottom: grimWid * 0.01
                                    }}
                                    numberOfLines={2}
                                    adjustsFontSizeToFit
                                >
                                    {loc.name}
                                </VyrTextRune>
                            </VyrlShellbox>
                        ))}
                    </VyrlShellbox>
                </SkyRollField>
            )}
        </VyrlShellbox>
    );
}