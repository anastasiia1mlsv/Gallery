import React, { FunctionComponent, useMemo, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text, PanResponder, Animated
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from "../navigation/types.";
import { customTheme } from "../components/CustomeTheme";

const { width, height } = Dimensions.get('window');

const ImageScreen: FunctionComponent <RootNavigationProps<'ImageScreen'>> = ({ route}) => {
  const {imageUrl} = route.params;
  const navigation = useNavigation();
  const theme = customTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [scale, setScale] = useState(1);
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}, ], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  const handleZoomIn = () => {
    setScale(prevScale => prevScale * 1.25);
  };

  const handleZoomOut = () => {
    setScale(prevScale => prevScale * 0.8);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
          width: "100%",
          height: "100%"
        }}
        {...panResponder.panHandlers}>
        <Image
            source={{ uri: imageUrl }}
            resizeMode="contain"
            style={[styles.image, {transform: [{scaleX: scale}, {scaleY: scale}]},
        ]}
        />
      </Animated.View>
      <TouchableOpacity style={styles.zoomButtonMinus} onPress={handleZoomOut}>
        <Text style={styles.text}>{"-"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.zoomButtonPlus} onPress={handleZoomIn}>
        <Text style={styles.text}>{"+"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.text}>{"Close"}</Text>
      </TouchableOpacity>
    </View>
  )
};

const createStyles = (theme: any) =>  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height:'100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    height: 40,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: theme.colors.buttonColor.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  zoomButtonPlus: {
    position: 'absolute',
    top: 40,
    left: 70,
    width: 40,
    height: 40,
    backgroundColor: theme.colors.buttonColor.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomButtonMinus: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: theme.colors.buttonColor.primary,
    borderRadius: 8,
    justifyContent:'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.textColor,
    fontSize: 15,
  },
});

export default ImageScreen;
