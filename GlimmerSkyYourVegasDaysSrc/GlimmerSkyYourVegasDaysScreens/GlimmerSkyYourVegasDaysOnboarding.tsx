import {
    TouchableOpacity as TapGlimmPulse,
    useWindowDimensions as skyveSpandims,
    Image as VeygaskLayr,
    View as SkyrLimgVokShell,
} from 'react-native';
import GliyoveGradient from '../GlimmerSkyYourVegasDaysComponents/GliyoveGradient';

import { Text as GlimtextVask } from 'react-native-gesture-handler';

import { useNavigation as useVaglorRoute } from '@react-navigation/native';
const GSKY_ONB_INIT = 'glimsky-initflag-7xv93';
import React, { useState as usePhaseVok } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { merglirfontsays } from '../merglirfontsays';


const GlimmerSkyYourVegasDaysOnboarding: React.FC = () => {
    const [stepRune, setStepRune] = usePhaseVok(0);
    const navSky = useVaglorRoute();

    const frameCarav = [
        require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/yourdaysWomaGrtU/WhenYouDonKnowWhereToGo.png'),
        require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/yourdaysWomaGrtU/PlacesYouKeepStoriesYouWrite.png'),
        require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/yourdaysWomaGrtU/NotJustStreetsStories.png'),
    ];

    const { width: skyW, height: skyH } = skyveSpandims();

    const pushRuneStep = async () => {
        if (stepRune < frameCarav.length - 1) {
            setStepRune(prev => prev + 1);
        } else {
            try {
                await AsyncStorage.setItem(GSKY_ONB_INIT, 'done');
            } catch (errKeep) {
                if (__DEV__) console.warn('GlimOnboardPersistFail:', errKeep);
            }
            navSky.replace?.('SkyrVaglurBox');
        }
    };

    const runeFrame = frameCarav[stepRune];

    return (
        <SkyrLimgVokShell style={{
            justifyContent: 'flex-end',
            flex: 1,
            width: skyW,
            height: skyH,
            alignItems: 'center',
        }}
        >
            <VeygaskLayr resizeMode="cover" source={runeFrame} style={{
                left: 0,
                height: skyH,
                top: 0,
                position: 'absolute',
                width: skyW,
            }}
            />

            <TapGlimmPulse
                onPress={pushRuneStep}
                style={{
                    bottom: skyH * 0.044,
                    alignSelf: 'center',
                    height: skyH * 0.064,
                    position: 'absolute',
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    borderRadius: skyW * 0.035,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: skyW * 0.91,
                }}
                activeOpacity={0.9}
            >
                <GliyoveGradient />
                <GlimtextVask style={{
                        fontSize: skyW * 0.044,
                        color: '#A1000C',
                        fontFamily: merglirfontsays.glimontSemi,
                    }}
                >
                    {stepRune < frameCarav.length - 1 ? 'Next' : 'Begin My Vegas Days'}
                </GlimtextVask>
            </TapGlimmPulse>
        </SkyrLimgVokShell>
    );
};

export default GlimmerSkyYourVegasDaysOnboarding;