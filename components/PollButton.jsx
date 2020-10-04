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
import { Layout, Typography } from '../styles';

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
        {props.isActive || !props.create? 
          null : 
          <BodyText style={{margin: 0.5, fontSize: Typography.xxxsmall}}>Poll it !</BodyText>}
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
    ...Layout.shadow,
    borderRadius: 5,
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