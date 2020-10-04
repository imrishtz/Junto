import { MaterialIcons } from '@expo/vector-icons';
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

const DeleteItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const { deleteAnswer, index } = props;
  return (
    <View style={styles.roundSmallButtonHolder}>
      <View style={styles.roundSmallButton}>
        <TouchableCmp
          onPress={() => deleteAnswer(index)}
        >
          <MaterialIcons 
            name='delete'
            size={20}
          />
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  roundSmallButtonHolder: {
    flex: 1,
    margin: wp("1%"),
    width: '10%',
  },
  roundSmallButton: {
    borderWidth: 0.5,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 25,
    height: 25,
    backgroundColor: Colors.lightGreeny,
  },
});

export default DeleteItem;