import React, { useState, useEffect, useCallback } from 'react';
import ArrowIcon from '@expo/vector-icons/FontAwesome';

import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet,
  Platform,
  Modal,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  FlatList,
  TouchableHighlight,
  Button
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BodyText from './BodyText';
import Colors from '../constants/Colors';
import Icons, { icons } from '../constants/Icons'
import ModalSelect from './ModalSelect';
import CustomButton from './CustomButton';
import { Layout, Typography } from '../styles';


const IconSelect = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const { iconKey, onSelect } = props;

  let TouchableCmp = TouchableOpacity;
  
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const renderIcon = useCallback((icon) => {
    const IconFamily = icon.Family;
    return (
      <TouchableCmp 
        onPress={() => {
          onSelect(icon.key); 
          setModalVisible(!modalVisible)
        }}
        activeOpacity={0.6}
        >
        <View style={styles.iconItem}>
          <IconFamily
            name={icon.name}
            size={wp("10%")} 
            color={'black'}
          />
        </View>
      </TouchableCmp>
    );
  }, [modalVisible, onSelect]);

  return (
    <View style={styles.container}>
      <ModalSelect 
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        modalVisible={modalVisible}
        margin='35%'
      >
        <BodyText style={styles.headerText}>
          Select icon:
        </BodyText>
        <View style={styles.listHolder}>
          <FlatList 
            contentContainerStyle={styles.list}
            data={icons}
            keyExtractor={item => item.key}
            renderItem={itemData => renderIcon(itemData.item)}
            numColumns={4}
          />
        </View>
      </ModalSelect >
      <View style={styles.buttonConatiner}>
        <TouchableCmp 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.6}
          borderRadius={150}
        >
          <View style={styles.holder}>
             <Icons iconKey={iconKey} iconSize={30}/>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  holder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp("18%"),
    width: wp("18%"),
    borderRadius: 150,
    backgroundColor: Colors.turqouise,
    ...Layout.shadow,
    borderWidth: 0.5,
  },
  headerText:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Typography.medium,
  },
  listHolder: {
    flex: 12,
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    ...Layout.shadow,
  },
  iconItem: {
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: Colors.turqouise,
    width: wp("14%"),
    height: wp("14%"),
    padding: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonConatiner: {
    borderRadius: 150,
    ...Layout.shadow,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconSelect;