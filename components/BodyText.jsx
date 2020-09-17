import React from 'react';
import { Text, StyleSheet, PixelRatio } from 'react-native';

const BodyText = props => (
  <Text  
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
    fontSize: 14,
  }
});

export default BodyText;
