import React, { useState, useEffect, useCallback, Children } from 'react';
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
  ScrollView, 
} from 'react-native';

const ToucableComponent = props => {
  const { onPress, color } = props;

  return (
    <TouchableOpacity style={{...styles.container, backgroundColor: color && color}} onPress={onPress}>
      <View style={styles.button}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    borderRadius: 8,
    shadowOffset: {
      width: 0.5,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    backgroundColor: 'gray',
    borderWidth: 0.5,
  },
  button: {
    paddingHorizontal: '3%',
    paddingVertical: '2%',
  },
});

export default ToucableComponent;