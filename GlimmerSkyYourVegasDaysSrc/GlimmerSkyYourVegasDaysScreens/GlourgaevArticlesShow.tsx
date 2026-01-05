import React, { useState } from 'react';
import {
    View as SagevVbox,
    Text,
    TouchableOpacity as YarouPrespat,
    ScrollView,
    Image,
    Share,
} from 'react-native';
import { merglirfontsays } from '../merglirfontsays';
import dayarticles from '../SkydaysData/dayarticles';

const LIGHT_RED = '#A1000C';

export default function GlourgaevArticlesShow({ setScreenPlaceDetailsMode }: { setScreenPlaceDetailsMode: (mode: 'main' | 'details') => void }) {
    const { width: vesremwid, height: vesremhit } = require('react-native').Dimensions.get('window');
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    // Header button size/radius
    const btnSize = vesremwid * 0.13;
    const btnRadius = vesremwid * 0.045;
    const cardPad = vesremwid * 0.045;
    const cardRadius = vesremwid * 0.045;
    const cardMargin = vesremwid * 0.025;
    const emojiFont = vesremwid * 0.07;
    const titleFont = vesremwid * 0.053;
    const descFont = vesremwid * 0.038;
    const detailPad = vesremwid * 0.06;
    const detailRadius = vesremwid * 0.045;
    const detailTitleFont = vesremwid * 0.055;
    const detailTextFont = vesremwid * 0.038;

    if (selectedIdx !== null) {
        // Деталі статті
        const article = dayarticles[selectedIdx];
        return (
            <SagevVbox style={{
                flex: 1,
                alignItems: 'center',
                paddingBottom: vesremhit * 0.08,
                backgroundColor: 'transparent',
            }}>
                {/* Top bar */}
                <SagevVbox style={{
                    width: vesremwid,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: vesremhit * 0.045,
                    marginBottom: vesremhit * 0.025,
                    paddingHorizontal: vesremwid * 0.045,
                }}>
                    <YarouPrespat
                        onPress={() => {setSelectedIdx(null); setScreenPlaceDetailsMode('main');}}
                        style={{
                            width: btnSize,
                            height: btnSize,
                            borderRadius: btnRadius,
                            backgroundColor: LIGHT_RED,
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            padding: 0,
                        }}>
                        <Image
                            source={require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/back.png')}
                            style={{
                                width: btnSize * 0.62,
                                height: btnSize * 0.62,
                                resizeMode: 'contain',
                            }}
                        />
                    </YarouPrespat>
                    <YarouPrespat
                        onPress={() => {
                            Share.share({
                                message: `${article.title}`
                            })
                        }}
                        style={{
                            width: btnSize,
                            height: btnSize,
                            borderRadius: btnRadius,
                            backgroundColor: LIGHT_RED,
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            padding: 0,
                        }}>
                        <Image
                            source={require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/share.png')}
                            style={{
                                width: btnSize * 0.62,
                                height: btnSize * 0.62,
                                resizeMode: 'contain',
                            }}
                        />
                    </YarouPrespat>
                </SagevVbox>
                {/* Article details */}
                <ScrollView style={{
                    width: vesremwid,
                    borderRadius: detailRadius,
                    padding: detailPad,
                    flexGrow: 0,
                }} showsVerticalScrollIndicator={false} contentContainerStyle={{
                    paddingBottom: vesremhit * 0.21,
                }}>

                    <Text style={{
                        color: '#fff',
                        fontFamily: merglirfontsays.glimontSemi,
                        fontSize: detailTitleFont,
                        flex: 1,
                        flexWrap: 'wrap',
                    }}>🌄 {article.title}</Text>
                    <Text style={{
                        color: '#fff',
                        fontFamily: merglirfontsays.glimontReg,
                        fontSize: detailTextFont,
                        lineHeight: detailTextFont * 1.45,
                        marginTop: vesremwid * 0.01,
                    }}>{article.text}</Text>
                </ScrollView>
            </SagevVbox>
        );
    }

    // Список статей
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
                    paddingBottom: vesremhit * 0.1,
                }}
                showsVerticalScrollIndicator={false}
            >
                {dayarticles.map((art, idx) => (
                    <YarouPrespat
                        key={idx}
                        onPress={() => {setSelectedIdx(idx); setScreenPlaceDetailsMode('details');}}
                        activeOpacity={0.85}
                        style={{
                            width: vesremwid * 0.93,
                            backgroundColor: LIGHT_RED,
                            borderRadius: cardRadius,
                            padding: cardPad,
                            marginBottom: cardMargin,
                            flexDirection: 'column',
                            shadowColor: '#000',
                            shadowOpacity: 0.09,
                            shadowRadius: vesremwid * 0.02,
                            shadowOffset: { width: 0, height: vesremwid * 0.01 },
                        }}>
                        <SagevVbox style={{ flexDirection: 'row', alignItems: 'center', marginBottom: vesremwid * 0.012 }}>
                            <Text style={{
                                fontSize: emojiFont,
                                marginRight: vesremwid * 0.025,
                            }}>🌄</Text>
                            <Text style={{
                                color: '#fff',
                                fontFamily: merglirfontsays.glimontMedi,
                                fontSize: titleFont,
                                flex: 1,
                                flexWrap: 'wrap',
                            }}>{art.title}</Text>
                        </SagevVbox>
                        <Text
                            numberOfLines={2}
                            style={{
                                color: '#fff',
                                fontFamily: merglirfontsays.glimontReg,
                                fontSize: descFont,
                                opacity: 0.85,
                                lineHeight: descFont * 1.38,
                            }}>
                            {art.text}
                        </Text>
                    </YarouPrespat>
                ))}
            </ScrollView>
        </SagevVbox>
    );
}
