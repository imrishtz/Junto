import React, { useState, useEffect,  useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet,
  Animated
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../constants/Colors';

const Header = (props) => {
  const { searchFilter, isActive } = props;
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef();
  const changeTextHandler = useCallback((text) => {
    setSearchText(text);
    searchFilter(text);
  },[searchFilter]);

  useEffect(() => {
    if (!isActive) {
      setSearchText('');
      inputRef.current.blur() 
    } else {
      inputRef.current.focus();
    }
  }, [isActive]);

  console.log("is ACTIVE = " + isActive);
  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.header_style}
        value={searchText}
        ref={inputRef}
        placeholder="Type Here..."    
        onChangeText={changeTextHandler}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingHorizontal: '1%',
    marginBottom: 1,
    width: wp("100%"), 
  },
  header_style:{
    height: hp("8%"), 
    width: wp("80%"),
    minHeight: 30,
    fontFamily: 'jaldi',
    fontSize: hp("3%"),
  },
  searchIcon: {
    marginHorizontal: 4,
  }
});

export default Header;