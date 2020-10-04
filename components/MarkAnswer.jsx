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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';

const MarkAnswer = props => {
  return (
    props.isMarked ?
    <View style={{...styles.general, ...styles.outer}}>
      <View style={{ ...styles.mark}}>
        {props.children}
      </View>
    </View>
    :
    <View style={{...styles.general, ...styles.unmark}}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  general: {
    flex: 6,
    flexDirection: 'row',
    marginHorizontal: wp("1%"),
  },
  outer: {
    backgroundColor: Colors.lightBluey,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  unmark: {
    borderColor: 'white',
    borderWidth: 2.5,
  },
  mark: {
    borderWidth: 2,
    borderColor: Colors.lightBluey,
    borderRadius: 9,
  },
});

export default MarkAnswer;