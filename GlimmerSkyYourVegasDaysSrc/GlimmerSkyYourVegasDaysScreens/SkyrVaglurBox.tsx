import GliyoveGradient from '../GlimmerSkyYourVegasDaysComponents/GliyoveGradient';
import GavrekSettings from './GavrekSettings';
import ExploreVegadayMap from './ExploreVegadayMap';
import VeskyrSavedSpots from './VeskyrSavedSpots';
import GlourgaevArticlesShow from './GlourgaevArticlesShow';
import React, {
    useState as glimsetZorn,
    useEffect,
} from 'react';
import GlimFlowChooseRoute from './GlimFlowChooseRoute';

type FluxSections =
    | 'book and can read stories'
    | 'Gligadksre Wrappr Day'
    | 'Karta of places'
    | 'Saved of vuta facts'
    | 'preferences';

import {
    View as SkavyrHoldRack,
    Dimensions as YuvageDimenFlux,
    TouchableOpacity as GlintPulseTap,
    SafeAreaView,
    Image,
    Text,
} from 'react-native';
import { merglirfontsays } from '../merglirfontsays';

const { width: GSK_W, height: GSK_H } = YuvageDimenFlux.get('window');

const vegamersk = [
    {
        whantTo: 'Gligadksre Wrappr Day',
        imgSourc: require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/nextesbuts/vegadomik.png'),
    },
    {
        whantTo: 'Karta of places',
        imgSourc: require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/nextesbuts/map.png'),
    },
    {
        whantTo: 'Saved of vuta facts',
        imgSourc: require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/nextesbuts/saved.png'),
    },
    {
        whantTo: 'book and can read stories',
        imgSourc: require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/nextesbuts/bookday.png'),
    },
    {
        whantTo: 'preferences',
        imgSourc: require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/nextesbuts/merpreferences.png'),
    },
];

const SkyrVaglurBox: React.FC = () => {
    const [skymerTocofPage, setSkymerTocofPage] =
        glimsetZorn<FluxSections>('Gligadksre Wrappr Day');
    const [screenPlaceDetailsMode, setScreenPlaceDetailsMode] =
        glimsetZorn<'main' | 'details'>('main');

    const wrapScreenOrnate = (trk: FluxSections) => {
        switch (trk) {
            case 'Gligadksre Wrappr Day':
                return (
                    <GlimFlowChooseRoute
                        setCurrentSectionKey={setSkymerTocofPage}
                        setScreenPlaceDetailsMode={setScreenPlaceDetailsMode}
                    />
                );
            case 'Karta of places':
                return (
                    <ExploreVegadayMap
                        setScreenPlaceDetailsMode={setScreenPlaceDetailsMode}
                    />
                );
            case 'Saved of vuta facts':
                return (
                    <VeskyrSavedSpots
                        setSkymerTocofPage={setSkymerTocofPage}
                        setScreenPlaceDetailsMode={setScreenPlaceDetailsMode}
                    />
                );
            case 'book and can read stories':
                return (
                    <GlourgaevArticlesShow
                        setScreenPlaceDetailsMode={setScreenPlaceDetailsMode}
                    />
                );
            case 'preferences':
                return <GavrekSettings />;
            default:
                return null;
        }
    };

    useEffect(() => {
        setScreenPlaceDetailsMode('main');
    }, [skymerTocofPage]);

    return (
        <SkavyrHoldRack
            style={{
                width: GSK_W,
                flex: 1,
                backgroundColor: '#650008',
                height: GSK_H,
            }}
        >
            {screenPlaceDetailsMode !== 'details' && (
                <SkavyrHoldRack
                    style={{
                        shadowOpacity: 0.7,
                        width: GSK_W,
                        height: GSK_H * 0.16,
                        backgroundColor: '#A1000C',
                        borderBottomLeftRadius: GSK_W * 0.035,
                        borderBottomRightRadius: GSK_W * 0.035,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 3 },
                        shadowRadius: 10,
                        elevation: 8,
                        alignSelf: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                    }}
                >
                    <SafeAreaView
                        style={{
                            justifyContent: 'space-between',
                            paddingHorizontal: GSK_W * 0.012,
                            alignItems: 'center',
                            flexDirection: 'row',
                            alignSelf: 'center',
                            width: GSK_W * 0.91,
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: GSK_W * 0.037,
                                fontFamily: merglirfontsays.glimontSemi,
                                maxWidth: GSK_W * 0.59,
                                width: GSK_W * 0.59,
                                textAlign: 'left',
                            }}
                            adjustsFontSizeToFit
                            numberOfLines={2}
                        >
                            {`Welcome aboard the \nGlimmer Sky: Your Vegas Days!`}
                        </Text>

                        <Image
                            source={require('../GlimmerSkyYourVegasDaysAssets/GlimmerSkyYourVegasDaysImages/smallPrevicon.png')}
                            style={{
                                width: GSK_W * 0.16,
                                height: GSK_W * 0.16,
                                resizeMode: 'contain',
                                borderRadius: GSK_W * 0.025,
                            }}
                        />
                    </SafeAreaView>
                </SkavyrHoldRack>
            )}

            <SafeAreaView />

            {wrapScreenOrnate(skymerTocofPage)}

            <SkavyrHoldRack
                style={{
                    alignItems: 'center',
                    position: 'absolute',
                    width: GSK_W * 0.91,
                    height: GSK_H * 0.075,
                    shadowRadius: 10,
                    backgroundColor: '#A1000C',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: GSK_W * 0.012,
                    flexDirection: 'row',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.4,
                    borderRadius: GSK_W * 0.035,
                    elevation: 8,
                    bottom: GSK_H * 0.048453,
                }}
            >
                {vegamersk.map((btnItem, idxBtn) => (
                    <GlintPulseTap
                        key={`vegabtnitem-${idxBtn}`}
                        style={{
                            overflow: 'hidden',
                            alignItems: 'center',
                            width: GSK_H * 0.064,
                            borderRadius: GSK_W * 0.019,
                            height: GSK_H * 0.064,
                            justifyContent: 'center',
                        }}
                        onPress={() => setSkymerTocofPage(btnItem.whantTo)}
                    >
                        {skymerTocofPage === btnItem.whantTo && (
                            <GliyoveGradient />
                        )}

                        <Image
                            source={btnItem.imgSourc}
                            style={{
                                width: GSK_W * 0.064,
                                height: GSK_W * 0.064,
                                resizeMode: 'contain',
                                tintColor:
                                    skymerTocofPage === btnItem.whantTo
                                        ? '#A1000C'
                                        : 'white',
                            }}
                        />
                    </GlintPulseTap>
                ))}
            </SkavyrHoldRack>
        </SkavyrHoldRack>
    );
};

export default SkyrVaglurBox;
