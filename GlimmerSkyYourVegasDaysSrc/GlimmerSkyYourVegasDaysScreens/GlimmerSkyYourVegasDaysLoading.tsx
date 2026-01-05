import React, {
    useEffect as glivokPulseHook,
} from 'react';
import { useNavigation as useVeskNavWhirl } from '@react-navigation/native';
import {
    View as VaskurShelltone,
    Image as GlintSkyImage,
    Dimensions as DaySpanBox,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwogasdLoader from '../GlimmerSkyYourVegasDaysComponents/SwogasdLoader';
import { SafeAreaView as SkyglintSafePlate } from 'react-native-safe-area-context';
const GSKYDAY_FLAG_ONB = 'gliv-syord-flag-98vda';



const GlimmerSkyYourVegasDaysLoading: React.FC = () => {
    const swirlNavGate = useVeskNavWhirl();
    const { width: gskWidth, height: gskHeight } = DaySpanBox.get('window');

    glivokPulseHook(() => {
        let innerLatch = true;
        let glintTimer: NodeJS.Timeout | null = null;

        const igniteGlimmerRoute = async () => {
            try {
                const flagStorm = await AsyncStorage.getItem(GSKYDAY_FLAG_ONB);
                const randSkatter = Math.floor(Math.random() * 900);

                if (!flagStorm) {
                    await AsyncStorage.setItem(GSKYDAY_FLAG_ONB, 'yes');
                    setTimeout(() => {
                        swirlNavGate.replace('GlimmerSkyYourVegasDaysOnboarding');
                    }, 5000 + randSkatter);
                    return;
                }

                setTimeout(() => {
                    swirlNavGate.replace('SkyrVaglurBox');
                }, 4000 + randSkatter);

            } catch (errFlux) {
                if (__DEV__) console.warn('SkyGlimFlux::recover', errFlux);
            }
        };

        igniteGlimmerRoute();

        return () => {
            innerLatch = false;
            if (glintTimer) clearTimeout(glintTimer);
        };
    }, [swirlNavGate, gskWidth]);

    return (
        <SkyglintSafePlate style={{
                height: gskHeight,
                alignItems: 'center',
                flex: 1,
                width: gskWidth,
                justifyContent: 'center',
            }}
        >
            <GlintSkyImage
                source={require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/Loader.png')}
                style={{
                    position: 'absolute',
                    width: gskWidth,
                    height: gskHeight,
                }}
                resizeMode="cover"
            />

            <VaskurShelltone
                style={{
                    bottom: -gskHeight * 0.1,
                    position: 'absolute',
                    zIndex: 20,
                    alignSelf: 'center',
                }}
            >
                <SwogasdLoader />
            </VaskurShelltone>
        </SkyglintSafePlate>
    );
};

export default GlimmerSkyYourVegasDaysLoading;