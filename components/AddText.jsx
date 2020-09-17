import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
  
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';


const AddText = props => {
  const { addAnswer, placeHolder} = props;
  const [answerEdited, setAnswerEdited] = useState();
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const addAnswerHandler = (answer) => {
    addAnswer(answer);
    setAnswerEdited('');
  }
  return (
    <View style={styles.addHolder}>
      <View style={styles.addInput}>
        <TextInput 
          value={answerEdited}
          placeholder={placeHolder}
          paddingHorizontal={5}
          fontSize={hp("2.5%")}
          multiline={true}
          blurOnSubmit={true}
          returnKeyType='done'
          onSubmitEditing={() => addAnswerHandler(answerEdited)}
          onChangeText={(text) => setAnswerEdited(text)}
          />
      </View>
      <View style={styles.roundSmallButtonHolder}>
        <View style={{...styles.roundSmallButton, backgroundColor: Colors.primary}}>
          <TouchableCmp
            onPress={() => addAnswerHandler(answerEdited)}
            >
              <MaterialIcons 
                name='add'
                size={20}
                color='white'
              />
          </TouchableCmp>
        </View>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  addHolder: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addInput: {
    width: '85%',
    flexDirection: 'row',
    paddingHorizontal: 2,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 8,
    minHeight: hp("5%"),
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundSmallButtonHolder: {
    flex: 1,
    margin: wp("1%"),
    width: '13%',
  },
  roundSmallButton: {
    borderWidth: 0.5,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 25,
    height: 25,
    backgroundColor: Colors.lightGreeny,
  },
});

export default AddText;