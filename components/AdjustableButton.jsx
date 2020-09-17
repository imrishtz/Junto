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

const AdjustableButton = props => {

  let ButtonComponent = TouchableOpacity;

  if ( Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={{...styles.button, ...props.style}}>
      <ButtonComponent
          TouchableOpacity={0.6}
          onPress={props.onPress}
        >
          <View style={styles.children}>
            {props.children}
          </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    textAlign: 'left',
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 0.5,
    borderColor: 'black',
    elevation: 5,
  },
  children: {
    paddingHorizontal: 2
  },
});

export default AdjustableButton;