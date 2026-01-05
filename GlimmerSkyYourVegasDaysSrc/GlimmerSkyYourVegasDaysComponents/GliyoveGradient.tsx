import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

type GliyoveGradientProps = {
    colors?: [string, string];
};

export default function GliyoveGradient({ colors }: GliyoveGradientProps) {
    const gradientColors = colors ?? ['#FEF8F2', '#FFCDAC'];
    return (
        <LinearGradient
            colors={gradientColors}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
            }}
        />
    );
}
