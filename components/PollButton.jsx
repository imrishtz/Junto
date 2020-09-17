import React, {useState} from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import BodyText from './BodyText';
import ActiveInnerFrame from './ActiveInnerFrame';

const ICON_SIZE = 35;

const PollButton = props => {
  let ButtonComponent = TouchableOpacity;

  if ( Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <ActiveInnerFrame isActive={props.isActive}>
      <View style={styles.pollConatiner}>
          <ButtonComponent activeOpacity="0.6" onPress={props.onPress}>
        <View style={styles.buttonConatiner}>
            <View style={{...styles.button, ...props.style}}>
              <View style={styles.icon}>
                <MaterialCommunityIcons 
                name='poll'
                size={25} 
                color={'black'}
              />
              </View>
            </View>
        </View>
        </ButtonComponent>
        {props.isActive? 
          null : 
          <BodyText style={{margin: 0.5, fontSize: 10}}>Poll it !</BodyText>}
      </View>
    </ActiveInnerFrame>
  );
};


const styles = StyleSheet.create({
  pollConatiner:{
    alignItems: 'center',
  },
  buttonConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 5,
    elevation: 5,
    width: ICON_SIZE,
    height: ICON_SIZE,
    backgroundColor: Colors.lightBluey,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    flexDirection: 'row',
    textAlign: 'center',
    color: 'black',
    fontFamily: 'jaldi-bold',
    fontSize: 28,  
  },
  icon: {
    borderRadius: 5,
  }
})
export default PollButton;