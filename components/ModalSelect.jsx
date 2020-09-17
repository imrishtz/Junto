import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  
} from 'react-native';

const ModalSelect = props => {
  const [modalHeight, setModalHeight] = useState();
  const [modalWidth, setModalWidth] = useState();
  
  const updateLayout = () => {
    console.log("Dimensions changed height" + Dimensions.get('window').height);
    console.log("Dimensions changed width" + Dimensions.get('window').width);

    if (Dimensions.get('window').height < 500) {
      setModalHeight(Dimensions.get('window').height - 50);
    } else {
      setModalHeight(Dimensions.get('window').height - 200);
    }
   setModalWidth(Dimensions.get('window').width - 80);
  };
  const cleanup = () => {
    Dimensions.removeEventListener('change', updateLayout);
  };
  useEffect(() => {
    updateLayout();
    Dimensions.addEventListener('change', updateLayout);
    return cleanup;
  }, []);


  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={25}
        >
        <TouchableWithoutFeedback 
          onPress={() => props.onPress(!props.modalVisible)}
          overflow='hidden'
          > 
          <View style={styles.centered}>
            <View style={{...styles.modalView , width: modalWidth, height: modalHeight}}>
                {props.children}
            </View>
          </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "1%",
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: "1%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
});

export default ModalSelect;