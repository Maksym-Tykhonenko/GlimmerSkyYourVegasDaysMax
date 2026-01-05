import AsyncStorage from '@react-native-async-storage/async-storage';
import { merglirfontsays } from '../merglirfontsays';
import GliyoveGradient from '../GlimmerSkyYourVegasDaysComponents/GliyoveGradient';

const { width, height } = Dimensions.get('window');
import React, { useEffect, useState } from 'react';
import {
    Linking,
    View as WolantViewboxild,
    TouchableOpacity as DaygamerTapOpac,
    Text,
    ScrollView,
    Dimensions,
    Image,
    Share,
} from 'react-native';

const SAVED_KEY = 'vegasDaySavedDeckRune';

export default function SkourgasDetails({ location, onBack }: {
    location: any,
    onBack: () => void
}) {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const checkSaved = async () => {
            try {
                const saved = await AsyncStorage.getItem(SAVED_KEY);
                if (saved) {
                    const arr = JSON.parse(saved);
                    setIsSaved(arr.some((loc: any) => loc.name === location.name));
                } else {
                    setIsSaved(false);
                }
            } catch { setIsSaved(false); }
        };
        checkSaved();
    }, [location]);

    const toggleSave = async () => {
        try {
            const saved = await AsyncStorage.getItem(SAVED_KEY);
            let arr = saved ? JSON.parse(saved) : [];
            if (isSaved) {
                arr = arr.filter((loc: any) => loc.name !== location.name);
            } else {
                arr.push(location);
            }
            await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(arr));
            setIsSaved(!isSaved);
        } catch { }
    };

    // Розміри
    const iconBox = width * 0.14; // ~54px при width=390
    const iconSize = width * 0.059; // ~32px
    const borderRadiusIcon = width * 0.046; // ~18px
    const horizontalPad = width * 0.05; // ~28px
    const gap = width * 0.046; // ~18px
    const imageHeight = height * 0.38; // ~340px при height=900
    const imageRadius = width * 0.062; // ~24px
    const tagRadius = width * 0.046; // ~18px
    const tagPadH = width * 0.041; // ~16px
    const tagPadV = width * 0.015; // ~6px
    const tagFont = width * 0.041; // ~16px
    const descFont = width * 0.041; // ~16px
    const descLine = width * 0.056; // ~22px

    return (
        <WolantViewboxild style={{
            flex: 1,
            paddingTop: 0,
        }}>
            {/* Top icons row */}
            <WolantViewboxild style={{
                paddingHorizontal: horizontalPad,
                justifyContent: 'space-between',
                marginBottom: gap * 0.7,
                alignItems: 'center',
                paddingTop: height * 0.01,
                flexDirection: 'row',
            }}>
                <WolantViewboxild style={{
                    flexDirection: 'row',
                    gap: gap,
                }}>
                    <DaygamerTapOpac onPress={onBack}
                        style={{
                            justifyContent: 'center',
                            width: iconBox,
                            height: iconBox,
                            borderRadius: borderRadiusIcon,
                            backgroundColor: '#A1000C',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/back.png')}
                            style={{ width: iconSize, height: iconSize, tintColor: undefined }}
                            resizeMode='contain'
                        />
                    </DaygamerTapOpac>
                </WolantViewboxild>
                <WolantViewboxild style={{
                    flexDirection: 'row',
                    gap: gap,
                }}>
                    <DaygamerTapOpac
                        style={{
                            justifyContent: 'center',
                            height: iconBox,
                            alignItems: 'center',
                            borderRadius: borderRadiusIcon,
                            backgroundColor: '#A1000C',
                            width: iconBox,
                        }}
                        onPress={toggleSave}
                    >
                        <Image
                            source={isSaved
                                ? require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/saved.png')
                                : require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/unsaved.png')}
                            style={{ width: iconSize, height: iconSize, tintColor: undefined }}
                            resizeMode='contain'
                        />
                    </DaygamerTapOpac>
                    <DaygamerTapOpac
                        style={{
                            justifyContent: 'center',
                            height: iconBox,
                            alignItems: 'center',
                            borderRadius: borderRadiusIcon,
                            backgroundColor: '#A1000C',
                            width: iconBox,
                        }}
                        onPress={() => {
                            Share.share({
                                message: `Let's go visit this amazing place in Vegas! ${location.name} is realy good!`
                            })
                        }}
                    >
                        <Image
                            source={require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/share.png')}
                            style={{ width: iconSize, height: iconSize, tintColor: undefined }}
                            resizeMode='contain'
                        />
                    </DaygamerTapOpac>
                </WolantViewboxild>
            </WolantViewboxild>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingBottom: height * 0.25, width: width * 0.91, alignSelf: 'center' }}>
                {/* Location image */}
                <Image
                    source={location.image}
                    style={{
                        width: width * 0.9,
                        height: imageHeight,
                        borderRadius: imageRadius,
                        marginBottom: gap,
                        marginTop: gap * 0.22,
                    }}
                    resizeMode="cover"
                />
                {/* Tags */}
                <WolantViewboxild style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'flex-start', marginBottom: gap }}>
                    {location.tags?.map((tag: string, idx: number) => (
                        <WolantViewboxild
                            key={tag + idx}
                            style={{
                                paddingHorizontal: tagPadH,
                                backgroundColor: '#A1000C',
                                margin: gap * 0.22,
                                borderRadius: tagRadius,
                                paddingVertical: tagPadV,
                            }}
                        >
                            <Text style={{
                                color: 'white',
                                fontFamily: merglirfontsays.glimontMedi,
                                fontSize: tagFont,
                            }}>
                                #{tag}
                            </Text>
                        </WolantViewboxild>
                    ))}
                </WolantViewboxild>
                {/* Name */}
                <Text style={{
                    marginBottom: gap * 0.55,
                    color: 'white',
                    width: '100%',
                    fontSize: width * 0.064,
                    fontFamily: merglirfontsays.glimontSemi,
                    textAlign: 'left',
                }}>
                    {location.name}
                </Text>
                {/* Description */}
                <Text style={{
                    marginBottom: gap * 1.3,
                    fontFamily: merglirfontsays.glimontReg,
                    fontSize: descFont,
                    lineHeight: descLine,
                    color: 'white',
                    textAlign: 'left',
                }}>
                    {location.description}
                </Text>
            </ScrollView>

            <DaygamerTapOpac style={{
                    overflow: 'hidden',
                    borderRadius: width * 0.035,
                    position: 'absolute',
                    height: height * 0.064,
                    bottom: height * 0.16,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width * 0.91,
                }}
                activeOpacity={0.91}
                onPress={() => Linking.openURL(location.googleMapsUrl)}
            >
                <GliyoveGradient />
                <Text style={{
                    fontSize: width * 0.044,
                    fontFamily: merglirfontsays.glimontSemi,
                    color: '#A1000C',
                }}>
                    Show on Map 
                </Text>
            </DaygamerTapOpac>
        </WolantViewboxild>
    );
}
