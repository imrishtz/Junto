import React, { useState, useEffect, useRef } from 'react';
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
import Colors from '../constants/Colors';

const ActiveFrame = props => {
  const { isActive, isInput, isCenter } = props;

  return (
    isActive ? 
      <View style={{...styles.outerActiveFramer, ...isCenter? styles.center : null, ...isInput? styles.input : null}}>
        <View style={{...styles.activeFrame, ...isCenter? styles.center : null, ...isInput? styles.input : null }}>
          {props.children}
        </View>
      </View>
      :
      <View style={styles.sameMargin}>
        {props.children}
      </View>
  );
};

const styles = StyleSheet.create({
  sameMargin: {
    borderWidth: 1,
    borderColor: 'white',
  },
  outerActiveFramer: {
    borderRadius: 10,
    borderWidth: 0.5,
  },
  activeFrame:{
    borderColor: Colors.lightGreeny,
    borderRadius: 9,
    borderWidth: 4.5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {

  },
  input: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 5,
  },
});

export default ActiveFrame;