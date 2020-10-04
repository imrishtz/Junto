import React from 'react';
import { Text, StyleSheet, PixelRatio } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BodyText = props => (
  <Text  
    ellipsizeMode='tail'
    style={{ ...styles.body, ...props.style }} 
    {...props}
    maxFontSizeMultiplier={1.3}
  >
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  body: {
    fontFamily: 'jaldi',
    fontSize: hp("2%"),
  }
});

export default BodyText;
