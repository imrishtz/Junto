import React, { useState, useEffect } from 'react';
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
import BodyText from './BodyText';
import Colors from '../constants/Colors';
import { icons } from '../constants/CardRightIcons'
import ModalSelect from './ModalSelect';
import CustomButton from './CustomButton';


const IconSelect = props => {
  const [modalVisible, setModalVisible] = useState(false);
  let TouchableCmp = TouchableOpacity;
  
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const renderIcon = (icon) => {
    const IconFamily = icon.Family;
    return (
      <TouchableCmp 
        onPress={() => {
          props.onSelect(icon.key); 
          setModalVisible(!modalVisible)
        }}
        activeOpacity={0.6}
        >
        <View style={styles.iconItem}>
          <IconFamily
            name={icon.name}
            size={40} 
            color={'black'}
          />
        </View>
      </TouchableCmp>
    );
  }

  const IconFamily = props.icon.Family;
  const iconName = props.icon.name;

  return (
    <View style={styles.container}>
      <ModalSelect 
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        modalVisible={modalVisible}
        margin='35%'
      >
        <FlatList 
          contentContainerStyle={{ 
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          style={styles.list}
          data={icons}
          keyExtractor={item => item.key}
          renderItem={itemData => renderIcon(itemData.item)}
          numColumns={5}
        />
      </ModalSelect >
      <View style={styles.buttonConatiner}>
        <TouchableCmp 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.6}
          borderRadius={150}
        >
          <View style={styles.holder}>
              <IconFamily
                name={iconName}
                size={40} 
                color={'black'}
              />
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: "1%", 
  },
  holder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: 65,
    borderRadius: 150,
    backgroundColor: Colors.turqouise,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    borderColor: 'black',
    borderWidth: 0.5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  list: {
    flex: 1,
    width: "80%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  modalView: {
    margin: "35%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "4%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  iconItem: {
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: Colors.turqouise,
    width: 50,
    height: 50,
    padding: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonConatiner: {
    borderRadius: 150,
    overflow: 'hidden',
    elevation: 5,
  },
});

export default IconSelect;