import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import { Layout } from '../styles';
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
    ...Layout.shadow,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.turqouise,
    borderRadius: 150,
    borderWidth: 0.5,
    width: wp("19%"),
    height: wp("19%"),
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