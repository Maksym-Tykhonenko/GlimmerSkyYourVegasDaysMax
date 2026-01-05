import React, {
    useRef as SkyholdRef,
    useState as FyrdRune
} from 'react';
import MapView, { Marker } from 'react-native-maps';
import yourLocations from '../SkydaysData/yourLocations';
import { merglirfontsays } from '../merglirfontsays';
import GliyoveGradient from '../GlimmerSkyYourVegasDaysComponents/GliyoveGradient';
import SkourgasDetails from './SkourgasDetails';
import {
    Animated as AstralShift,
    Text as WrynnGlyph,
    TouchableOpacity as RimeTapper,
    Image as YlmaPic,
    TouchableWithoutFeedback as MistTapless,
    View as VexlynBox,
} from 'react-native';


export default function ExploreVegadayMap({
    setScreenPlaceDetailsMode
}: {
    setScreenPlaceDetailsMode: React.Dispatch<
        React.SetStateAction<'main' | 'details'>
    >;
}) {
    const { width: vWex, height: vHex } =
        require('react-native').Dimensions.get('window');

    const [selRune, setSelRune] = FyrdRune<null | number>(null);
    const [revealDeck, setRevealDeck] = FyrdRune(false);

    const runeScalers = SkyholdRef(
        yourLocations.reduce(
            (acc: Record<number, any>, loc) => {
                acc[loc.id] = new AstralShift.Value(0.7);
                return acc;
            },
            {}
        )
    ).current;

    const tapCrestPin = (id: number) => {
        Object.entries(runeScalers).forEach(([k, anim]) => {
            AstralShift.timing(anim, {
                toValue: Number(k) === id ? 1.6 : 0.7,
                duration: 320,
                useNativeDriver: true,
            }).start();
        });
        setSelRune(id);
    };

    const unleashExplore = () => {
        setRevealDeck(true);
        setScreenPlaceDetailsMode('details');
    };

    const foldBackPane = () => {
        setRevealDeck(false);
        setScreenPlaceDetailsMode('main');
    };

    const clearMapFocus = () => {
        Object.values(runeScalers).forEach(anim => {
            AstralShift.timing(anim, {
                toValue: 0.7,
                duration: 220,
                useNativeDriver: true,
            }).start();
        });
        setSelRune(null);
    };

    const crestSize = vWex * 0.27;
    const crestHalo = vWex * 0.065;
    const exploreBtnH = vHex * 0.04;

    const initialRegion = {
        latitude: yourLocations[0].coordinates.lat,
        longitude: yourLocations[0].coordinates.lng,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
    };

    if (revealDeck && selRune !== null) {
        const inst = yourLocations.find(x => x.id === selRune);
        return (
            <SkourgasDetails
                location={inst}
                onBack={foldBackPane}
            />
        );
    }

    return (
        <MistTapless onPress={clearMapFocus}>
            <VexlynBox style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: vHex * 0.08, flex: 1}}>
                <MapView style={{
                        left: vWex * 0.045,
                        top: vHex * 0.02,
                        width: vWex * 0.91,
                        height: vHex * 0.7,
                        position: 'absolute',
                        borderRadius: vWex * 0.055,
                        overflow: 'hidden',
                    }}
                    initialRegion={initialRegion}
                >
                    {yourLocations
                        .filter(it => selRune !== it.id)
                        .map(loc => (
                            <Marker
                                key={loc.id}
                                coordinate={{
                                    latitude: loc.coordinates.lat,
                                    longitude: loc.coordinates.lng,
                                }}
                                onPress={e => {
                                    e.stopPropagation();
                                    tapCrestPin(loc.id);
                                }}
                            >
                                <AstralShift.View
                                    style={{
                                        shadowOpacity: 0.18,
                                        width: crestSize,
                                        shadowColor: '#A1000C',
                                        borderRadius: vWex * 0.04,
                                        overflow: 'hidden',
                                        backgroundColor: 'white',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        elevation: 6,
                                        shadowRadius: crestHalo,
                                        transform: [
                                            { scale: runeScalers[loc.id] }
                                        ],
                                        zIndex: 1,
                                        height: crestSize,
                                    }}
                                >
                                    <YlmaPic
                                        source={loc.image}
                                        style={{
                                            width: crestSize,
                                            height: crestSize,
                                        }}
                                        resizeMode="cover"
                                    />
                                </AstralShift.View>
                            </Marker>
                        ))}

                    {selRune &&
                        (() => {
                            const env = yourLocations.find(
                                l => l.id === selRune
                            );
                            if (!env) return null;
                            return (
                                <Marker
                                    key={env.id}
                                    coordinate={{
                                        latitude: env.coordinates.lat,
                                        longitude: env.coordinates.lng,
                                    }}
                                    onPress={e => {
                                        e.stopPropagation();
                                        tapCrestPin(env.id);
                                    }}
                                >
                                    <AstralShift.View
                                        style={{
                                            alignItems: 'center',
                                            height: crestSize,
                                            borderRadius: vWex * 0.04,
                                            overflow: 'hidden',
                                            backgroundColor: 'white',
                                            shadowRadius: crestHalo,
                                            width: crestSize,
                                            elevation: 12,
                                            zIndex: 999,
                                            shadowColor: '#A1000C',
                                            shadowOpacity: 0.22,
                                            justifyContent: 'center',
                                            transform: [
                                                { scale: runeScalers[env.id] }
                                            ],
                                        }}
                                    >
                                        <YlmaPic
                                            source={env.image}
                                            style={{
                                                width: crestSize,
                                                height: crestSize,
                                            }}
                                            resizeMode="cover"
                                        />

                                        <WrynnGlyph
                                            numberOfLines={2}
                                            style={{
                                                color: 'white',
                                                top: vHex * 0.018,
                                                alignSelf: 'center',
                                                textAlign: 'left',
                                                position: 'absolute',
                                                fontFamily:
                                                    merglirfontsays.glimontSemi,
                                                fontSize: vWex * 0.035,
                                                width:
                                                    crestSize -
                                                    vWex * 0.044,
                                                borderRadius: vWex * 0.022,
                                                paddingHorizontal:
                                                    vWex * 0.022,
                                                paddingVertical:
                                                    vHex * 0.012,
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {env.name}
                                        </WrynnGlyph>

                                        <RimeTapper
                                            activeOpacity={0.91}
                                            onPress={unleashExplore}
                                            style={{
                                                position: 'absolute',
                                                bottom: vHex * 0.01,
                                                alignSelf: 'center',
                                                width:
                                                    crestSize -
                                                    vWex * 0.04,
                                                height: exploreBtnH,
                                                borderRadius:
                                                    vWex * 0.019,
                                                backgroundColor: 'white',
                                                justifyContent:
                                                    'center',
                                                alignItems: 'center',
                                                overflow: 'hidden',
                                                elevation: 2,
                                            }}
                                        >
                                            <GliyoveGradient />
                                            <WrynnGlyph
                                                style={{
                                                    color: '#A1000C',
                                                    fontFamily:
                                                        merglirfontsays
                                                            .glimontSemi,
                                                    fontSize:
                                                        vWex * 0.03,
                                                }}
                                            >
                                                Explore
                                            </WrynnGlyph>
                                        </RimeTapper>
                                    </AstralShift.View>
                                </Marker>
                            );
                        })()}
                </MapView>
            </VexlynBox>
        </MistTapless>
    );
}