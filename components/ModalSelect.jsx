import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Layout } from '../styles';

const ModalSelect = props => {
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
            <View style={styles.modalView}>
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
    ...Layout.shadow,
    width: wp("80%"),
    height: hp("80%")
  },
});

export default ModalSelect;