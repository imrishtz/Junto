import React, { useEffect } from 'react';
import { 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { initializeFirebase } from '../firebase';
import * as firebase from "firebase";
import * as userActions from '../store/actions/user';

const StartScreenPhone = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    initializeFirebase();
    let unsbscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigateForward(user);
      } else {
        props.navigation.navigate('Auth');
      }
     })

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
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartScreenPhone;