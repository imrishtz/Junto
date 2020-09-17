import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../constants/Colors';

const Header =  (props) => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.hederContainer}>
      <TextInput
        style={styles.header_style}
        value={searchText}
        placeholder="Type Here..."    
        onChangeText={(text) => {
          setSearchText(text);
          props.searchFilter(text);
        }}
        autoCorrect={false}
      />
      <View style={styles.searchIcon}>
        <FontAwesome 
          name="search"
          size={20}
          color={Colors.black}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hederContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingHorizontal: '1%',
    marginBottom: 1,
  },
  header_style:{
    width: wp("73%"), 
    height: hp("8%"), 
    minHeight: 30,
    fontFamily: 'jaldi',
    fontSize: hp("3%"),
  },
  searchIcon: {
    marginHorizontal: 4,
  }
});

export default Header;