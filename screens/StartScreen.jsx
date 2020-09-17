import React, { useEffect } from 'react';
import { 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
       const userData = await AsyncStorage.getItem('userData');
       if (!userData) {
        console.log("\n\n\nStartScreen userData IS NULL\n\n\n = "); 
        console.log("\n\n\nStartScreen userData IS NULL\n\n\n = "); 
        console.log("\n\n\nStartScreen userData IS NULL\n\n\n = "); 
        props.navigation.navigate('Auth') ;
        return;
       }
       const transformedData = JSON.parse(userData);
       const { token, userId, expiryDate } = transformedData;
       const expirationDate = new Date(expiryDate);

       if (expirationDate <= new Date() ||  !token || !userId) {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken === null) {
          console.log("\n\n\nStartScreen REFRESH TOKEN IS NULL\n\n\n = "); 
          console.log("\n\n\nStartScreen REFRESH TOKEN IS NULL\n\n\n = "); 
          console.log("\n\n\nStartScreen REFRESH TOKEN IS NULL\n\n\n = "); 
          props.navigation.navigate('Auth');
        } else {
          dispatch(authActions.refreshData(refreshToken));
          props.navigation.navigate('Events');
        }        
        return;
       }

       const expirationTime = expirationDate.getTime() - new Date().getTime(); 

       dispatch(authActions.authenticate(userId, token, expirationTime));
       props.navigation.navigate('Events') ;
    };

    tryLogin();
  }, [dispatch]);

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

export default StartScreen;