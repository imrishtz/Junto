import React from 'react';
import { 
  View, 
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';

const ToucableComponent = props => {
  const { onPress, color } = props;

  return (
    <View style={{...styles.container, backgroundColor: color && color}}>
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('gray', true)}  onPress={onPress}>
        <View style={styles.button}>
          {props.children}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 9,
    backgroundColor: 'gray', 
    elevation: 5,
    borderWidth: 0.5,
  },
  button: {
    overflow: 'hidden',
    paddingHorizontal: '3%',
    paddingVertical: '2%', 
  },
});

export default ToucableComponent;