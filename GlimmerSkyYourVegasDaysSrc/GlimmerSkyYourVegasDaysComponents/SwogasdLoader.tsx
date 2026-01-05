import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const SwogasdLoader = () => {
  const dimensions = Dimensions.get('window');
  const size = Math.min(dimensions.width, dimensions.height) * 0.22;

  const loaderHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        html, body {
          height: 100%;
          margin: 0;
          background: transparent;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
        .loader {
          width: ${size}px;
          height: ${size}px;
          border: solid 4px rgba(231, 231, 231, 0);
          border-top: solid 5px rgba(255, 255, 255, 1);
          border-radius: 50%;
          transition: all 0.5s;
          animation: rotation_51512 1.2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
        }
        @keyframes rotation_51512 {
          70% {
            box-shadow: 0px 0px 10px 50px rgba(255, 255, 255, 0.53);
          }
          90% {
            box-shadow: 0px 0px 10px 50px rgba(241, 57, 57, 0.04);
          }
          100% {
            opacity: 0.5;
            transform: rotate(360deg);
          }
        }
      </style>
    </head>
    <body>
      <div class="loader"></div>
    </body>
    </html>
  `;

  return (
    <View style={{
      height: dimensions.height * 0.55,
      alignSelf: 'center',
      flex: 0,
      width: dimensions.width * 0.9,
    }}>
      <WebView
        allowsInlineMediaPlayback={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        javaScriptEnabled={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
        source={{ html: loaderHTML }}
        mixedContentMode="compatibility"
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        scalesPageToFit={false}
      />
    </View>
  );
};

export default SwogasdLoader;