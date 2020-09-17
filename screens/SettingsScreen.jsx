import React from 'react';
import {
  View,
  Button,
  Text,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import BodyText from '../components/BodyText';

const SettingsScreen = props => {
  const dispatch = useDispatch();
  return (
    <View style={styles.centered}>
      <BodyText>Settings</BodyText>
      <Button 
        title='Logout' 
        color={Colors.primary} 
        onPress={
          () => {
            dispatch(authActions.logout());
            //props.navigation.navigate('Auth')
          }
        }/>
    </View>
  );
};

SettingsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Settings'
  };
};

const styles = StyleSheet.create({
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});

export default SettingsScreen;