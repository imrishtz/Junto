// @ts-nocheck
import React,{useState, useRef, useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as firebase from "firebase";
import transformPhoneNumber from "../helpers/transformPhoneNumber";
import BodyText from "../components/BodyText";
import * as userActions from '../store/actions/user';
import { useDispatch, useSelector } from "react-redux";

const AuthPhoneScreen = props =>  {
  const recaptchaVerifier = useRef(null);
  const codeVerificationRef = useRef(null)
  const [phoneNumber, setPhoneNumber] = useState('+972');
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState('');
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

  const [message, showMessage] = useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    let unsbscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigateForward(user);
      }})

    return () => {
      unsbscribe();
    };
  }, []);

  const navigateForward = async (user) => {
    // await dispatch(userActions.setUser(user));
    // props.navigation.navigate('Events');

    const trying= (dispatch) => new Promise((resolve, reject) => {
      dispatch(userActions.setUser(user));
      resolve();
    })
    trying(dispatch).then(() => {
      props.navigation.navigate('Events');
    })
  }

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <BodyText style={styles.ordersText}>Please enter your phone number:</BodyText>
      <TextInput
        style={{marginVertical: 10}}
        placeholder="050 123456789"
        autoFocus
        fontSize={hp("3%")}
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />
      <View style={styles.button}>
        <Button
          title="Send Verification Code"
          disabled={phoneNumber.length !== 10}
          onPress={async () => {
            // The FirebaseRecaptchaVerifierModal ref implements the
            // FirebaseAuthApplicationVerifier interface and can be
            // passed directly to `verifyPhoneNumber`.
            const fixedPhone = transformPhoneNumber(phoneNumber);
            try {
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              const verificationId = await phoneProvider.verifyPhoneNumber(
                fixedPhone,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
              showMessage({
                text: "Verification code has been sent to your phone.",
              });
              codeVerificationRef.current.focus();
            } catch (err) {
              showMessage({ text: `${err.message}`, color: "red" });
            }
          }}
        />
      </View>
      <BodyText style={styles.ordersText}>Verification code:</BodyText>
      <TextInput
        ref={codeVerificationRef}
        style={{ marginVertical: 10}}
        editable={!!verificationId}
        placeholder="- - - - - -"
        onChangeText={setVerificationCode}
        maxLength={6}
        fontSize={hp("3%")}
        keyboardType="phone-pad"
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId || verificationCode.length !== 6}
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            showMessage({ text: "Phone authentication successful 👍" });
          } catch (err) {
            showMessage({ text: `${err.message}`, color: "red" });
            setVerificationCode('');
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={{backgroundColor: 0xffffffee, justifyContent: "center", marginTop: 20, }}
          onPress={() => showMessage(undefined)}>
          <BodyText style={{color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
            {message.text}
          </BodyText>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp("2%"),
  },
  button: {
    marginVertical: hp("1%"),
    marginHorizontal: wp("6%"),
  },
  ordersText: {
    marginTop: hp("3%"),
    fontSize: hp("2.5%"),
  },
});

AuthPhoneScreen.navigationOptions = {
  headerTitle: 'Authorization'
};
export default AuthPhoneScreen;