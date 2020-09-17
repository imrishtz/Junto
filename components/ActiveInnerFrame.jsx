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
import Colors from '../constants/Colors';

const ActiveInnerFrame = props => {
  const isActive = props.isActive;
  return (
     isActive ? 
     <View style={{backgroundColor: isActive? Colors.lightGreeny : null}}>
        {props.children}
      </View>
      : 
      <View>
        {props.children}
      </View>
  );
};


export default ActiveInnerFrame;