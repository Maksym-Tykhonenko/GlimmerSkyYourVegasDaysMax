import React, {
    useState as useVokRuneState,
    useRef as skyholdRef,
    useEffect as igniteSkyPhase,
} from 'react';
import {
    Dimensions as SkyrSpanDims,
    View as GlimShellVok,
    Easing as GlimEase,
    TouchableOpacity as FluxPressGlint,
    Text as VeygaLabel,
    Animated as GlimAnim,
    Image as VeygaskImgRune,
} from 'react-native';

import SkourgasDetails from './SkourgasDetails';
import { merglirfontsays } from '../merglirfontsays';
import GliyoveGradient from '../GlimmerSkyYourVegasDaysComponents/GliyoveGradient';
import yourLocations from '../SkydaysData/yourLocations';


// ------------------------------
//  Random utils
// ------------------------------
function pickRuneIndices(total: number, count: number, exclude: number[] = []) {
    const out: number[] = [];
    const list = Array.from({ length: total }, (_, i) => i).filter(i => !exclude.includes(i));
    while (out.length < count && list.length) {
        const idx = Math.floor(Math.random() * list.length);
        out.push(list[idx]);
        list.splice(idx, 1);
    }
    return out;
}

function spinGlimAngles() {
    const base = [270, 0, 90, 180];
    return base.map(a => a + (Math.random() * 20 - 10));
}


// ------------------------------
//  MAIN COMPONENT
// ------------------------------
export default function GlimFlowChooseRoute({
    screenPlaceDetailsMode,
    setScreenPlaceDetailsMode,
}: {
    screenPlaceDetailsMode: 'main' | 'details';
    setScreenPlaceDetailsMode: React.Dispatch<React.SetStateAction<'main' | 'details'>>;
}) {

    const { width: spanW, height: spanH } = SkyrSpanDims.get('window');

    const [angleVok, setAngleVok] = useVokRuneState<number[]>([270, 0, 90, 180]);
    const [activeRunes, setActiveRunes] = useVokRuneState<number[]>([]);
    const [prevRunes, setPrevRunes] = useVokRuneState<number[]>([]);
    const [glimSpin, setGlimSpin] = useVokRuneState(false);
    const [prevAngles, setPrevAngles] = useVokRuneState<number[]>([270, 0, 90, 180]);
    const [pickedLoc, setPickedLoc] = useVokRuneState<any>(null);

    const angleAnimVok = skyholdRef([
        new GlimAnim.Value(0),
        new GlimAnim.Value(0),
        new GlimAnim.Value(0),
        new GlimAnim.Value(0),
    ]).current;

    // Layout math
    const sqSize = spanW * 0.88;
    const centerX = spanW / 2;
    const centerY = spanH * 0.08 + sqSize / 2;
    const radius = sqSize * 0.36;
    const imgOuter = spanW * 0.21;
    const imgCenter = spanW * 0.17;


    // ------------------------------
    //  INIT
    // ------------------------------
    igniteSkyPhase(() => {
        const r = pickRuneIndices(yourLocations.length, 5);
        setActiveRunes(r);
        setAngleVok(spinGlimAngles());
        setPrevRunes(r);
        setPrevAngles([270, 0, 90, 180]);
    }, []);


    // ------------------------------
    //  SPIN ANIMATION
    // ------------------------------
    igniteSkyPhase(() => {
        if (
            activeRunes.length === 5 &&
            prevRunes.length === 5 &&
            glimSpin
        ) {
            angleAnimVok.forEach(a => a.setValue(0));

            GlimAnim.parallel(
                angleAnimVok.map(a =>
                    GlimAnim.timing(a, {
                        toValue: 1,
                        duration: 600,
                        easing: GlimEase.inOut(GlimEase.cubic),
                        useNativeDriver: false,
                    })
                )
            ).start(() => {
                setPrevRunes(activeRunes);
                setPrevAngles(angleVok);
                setAngleVok(spinGlimAngles());
                setGlimSpin(false);
                angleAnimVok.forEach(a => a.setValue(0));
            });
        }
    }, [activeRunes]);


    // ------------------------------
    //  PICK NEW SET
    // ------------------------------
    const ignitePickRunes = () => {
        if (glimSpin) return;
        setGlimSpin(true);
        setActiveRunes(prev => pickRuneIndices(yourLocations.length, 5, prev));
    };


    // ------------------------------
    //  Animated position helper
    // ------------------------------
    const getGlimOuterPos = (i: number) => {
        const start = prevAngles[i];
        const end = angleVok[i];

        const left = angleAnimVok[i].interpolate({
            inputRange: [0, 1],
            outputRange: [
                sqSize / 2 + radius * Math.cos(start * Math.PI / 180) - imgOuter / 2,
                sqSize / 2 + radius * Math.cos(end * Math.PI / 180) - imgOuter / 2
            ]
        });

        const top = angleAnimVok[i].interpolate({
            inputRange: [0, 1],
            outputRange: [
                sqSize / 2 + radius * Math.sin(start * Math.PI / 180) - imgOuter / 2,
                sqSize / 2 + radius * Math.sin(end * Math.PI / 180) - imgOuter / 2
            ]
        });

        return { left, top };
    };


    // ------------------------------
    //  DETAILS SCREEN
    // ------------------------------
    if (pickedLoc) {
        return (
            <SkourgasDetails
                location={pickedLoc}
                onBack={() => {
                    setPickedLoc(null);
                    setScreenPlaceDetailsMode('main');
                }}
            />
        );
    }


    // ------------------------------
    //  MAIN LAYOUT
    // ------------------------------
    return (
        <GlimShellVok style={{
            paddingBottom: spanH * 0.08,
            backgroundColor: 'transparent',
            alignItems: 'center',
            flex: 1,
        }}
        >

            <VeygaskImgRune
                source={require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/pickSqares.png')} style={{
                    width: sqSize,
                    resizeMode: 'contain',
                    top: spanH * 0.08,
                    height: sqSize,
                    position: 'absolute',
                    left: spanW * 0.06,
                }}
            />

            {/* Outer animated 4 */}
            {activeRunes.length === 5 && prevAngles.length === 4 &&
                <GlimAnim.View
                    style={{
                        alignItems: 'center',
                        width: sqSize,
                        justifyContent: 'center',
                        height: sqSize,
                        left: spanW * 0.06,
                        top: spanH * 0.08,
                        position: 'absolute',
                    }}
                >
                    {activeRunes.slice(1, 5).map((idx, i) => {
                        const { left, top } = getGlimOuterPos(i);

                        return (
                            <GlimAnim.View
                                key={'glim_outer_' + idx}
                                style={{
                                    shadowRadius: 8,
                                    shadowColor: '#000',
                                    elevation: 4,
                                    top,
                                    width: imgOuter,
                                    height: imgOuter,
                                    borderRadius: spanW * 0.06,
                                    overflow: 'hidden',
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    left,
                                    shadowOpacity: 0.15,
                                }}
                            >
                                <FluxPressGlint
                                    activeOpacity={0.85}
                                    onPress={() => {
                                        setPickedLoc(yourLocations[idx]);
                                        setScreenPlaceDetailsMode('details');
                                    }}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <VeygaskImgRune
                                        source={yourLocations[idx].image}
                                        style={{ width: '100%', height: '100%', borderRadius: spanW * 0.06 }}
                                    />
                                </FluxPressGlint>
                            </GlimAnim.View>
                        );
                    })}
                </GlimAnim.View>
            }


            {/* Center image */}
            {activeRunes.length === 5 &&
                <FluxPressGlint
                    activeOpacity={0.85}
                    onPress={() => {
                        setPickedLoc(yourLocations[activeRunes[0]]);
                        setScreenPlaceDetailsMode('details');
                    }}
                    style={{
                        overflow: 'hidden',
                        elevation: 4,
                        position: 'absolute',
                        width: imgCenter,
                        height: imgCenter,
                        backgroundColor: 'white',
                        shadowColor: '#000',
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        borderRadius: spanW * 0.06,
                        alignItems: 'center',
                        top: centerY - imgCenter / 2,
                        justifyContent: 'center',
                        left: centerX - imgCenter / 2,
                    }}
                >
                    <VeygaskImgRune
                        source={yourLocations[activeRunes[0]].image}
                        style={{ width: '100%', height: '100%', borderRadius: spanW * 0.06 }}
                    />
                </FluxPressGlint>
            }


            {/* Pick Spots */}
            <FluxPressGlint
                style={{
                    justifyContent: 'center',
                    borderRadius: spanW * 0.035,
                    width: spanW * 0.91,
                    height: spanH * 0.064,
                    alignSelf: 'center',
                    bottom: spanH * 0.16,
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    position: 'absolute',
                    alignItems: 'center',
                }}
                activeOpacity={0.91}
                onPress={ignitePickRunes}
            >
                <GliyoveGradient />
                <VeygaLabel
                    style={{
                        color: '#A1000C',
                        fontFamily: merglirfontsays.glimontSemi,
                        fontSize: spanW * 0.044,
                    }}
                >
                    Pick Spots
                </VeygaLabel>
            </FluxPressGlint>
        </GlimShellVok>
    );
}