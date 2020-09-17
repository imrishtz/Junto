import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Colors from '../constants/Colors';
import BodyText from './BodyText';


const CustomButton = props => {
  let ButtonComponent = TouchableOpacity;

  if ( Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonConatiner}>
      <ButtonComponent activeOpacity="0.6" onPress={props.onPress} props={{...props}}>
        <View style={{...styles.button, ...props.style}}>
          <BodyText 
            style={styles.buttonText}
            numberOfLines={1}
          >
            {props.children}
          </BodyText>
          <View style={styles.icon}>
            {props.icon}
          </View>
        </View>
      </ButtonComponent>
    </View>
  );
};


const styles = StyleSheet.create({
  buttonConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.turqouise,
    borderRadius: 150,
    borderWidth: 0.5,
    width: 55,
    height: 55,
  },
  buttonText: {
    flexDirection: 'row',
    textAlign: 'center',
    color: 'black',
    fontFamily: 'jaldi-bold',
    fontSize: 28,  
  },
  icon: {
    borderRadius: 150,
  }
})
export default CustomButton;