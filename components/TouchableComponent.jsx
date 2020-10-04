import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from 'react-native';

const TouchableComponent = props => {

  let TouchableCmp = TouchableOpacity;
  
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.touchable}>
      <TouchableCmp style={props.style}
        onPress={props.onPress}
        activeOpacity={0.6}
        useForeground
      >
        {props.children}
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
});

export default TouchableComponent;