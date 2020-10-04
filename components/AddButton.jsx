import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  Image,
  StyleSheet 
} from 'react-native';
import floatingAddIcon from '../images/float-add-icon.png';
import Colors from '../constants/Colors';

const AddButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={props.onPress}
      style={styles.touchableOpacityStyle}>
      <Image

        backgroundColor={Colors.primary}
        source={floatingAddIcon}
        style={styles.floatingButtonStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    overflow: 'hidden'
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    tintColor: 'white',
  },
});

export default AddButton;

