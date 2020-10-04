import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import BodyText from './BodyText';
import Colors from '../constants/Colors';
import PollAnswer from '../models/poll-answer';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Layout, Typography } from '../styles';
import DeleteItem from './DeleteItem';


const EditPoll = props => {
  const { type, showPoll, onSetAnswers, pollAnswers, onDismiss, PollRender, PollAddFunction } = props;
  const [ answers, setAnswers ] = useState(
  pollAnswers !== undefined ? pollAnswers: []);
  const scrollViewRef = useRef();

  const addAnswer = (answer) => {
    if (!answer || (typeof answer === String && answer.length === 0)) {
      return;
    }
    setAnswers((prevAnswers) => prevAnswers.concat(new PollAnswer(Date.now(), answer)));
  };
  const deleteAnswer = (index) => {
    setAnswers((prevAnswers) => prevAnswers.filter((ans, ansIndex) => ansIndex !== index ))
  };

  return (
    <View style={styles.centered}>
      <Modal
        visible={showPoll}
        animationType="slide"
        transparent={true}
        avoidKeyboard={true}
      >
        <KeyboardAvoidingView 
        style={{...styles.modalView}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
              <View style={styles.icon}>
                <MaterialCommunityIcons 
                name='poll'
                size={20} 
                color={'black'}
              />
              </View>
              <BodyText style={styles.headerText}>{type} Poll</BodyText>
              <View style={styles.icon}>
                <MaterialCommunityIcons 
                name='poll'
                size={20} 
                color={'black'}
              />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <ScrollView 
              contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center'}}
              ref={scrollViewRef}
              onContentSizeChange={() => {
                scrollViewRef.current.scrollToEnd({animated: true})
              }}>
                <View style={styles.answerHolder}>
                  {answers.map((answer, index) => 
                  <View style={styles.answerContainer} key={index}>
                    <PollRender 
                        answer={answer}
                        index={index}
                        size={Typography.xsmall}
                    />
                    <DeleteItem index={index} deleteAnswer={deleteAnswer}/>
                  </View>
                  )}
                </View>
              </ScrollView>
              <View style={styles.addHolder}>
                <PollAddFunction 
                  addAnswer={addAnswer}
                  placeHolder={'Event location option...'}
                />
              </View>
            </View>
            <View style={styles.modalButtons}>
              <View style={styles.modalSingleButton}>
                <Button 
                  title='Cancel'
                  color={Colors.accent}
                  onPress={onDismiss}
                />
              </View>
              <View style={styles.modalSingleButton}>
                <Button 
                  title='Set Poll'
                  color={Colors.primary}
                  onPress={() => onSetAnswers(answers)}
                />
              </View>
            </View>
          </KeyboardAvoidingView>      
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginHorizontal: wp("10%"),
    fontSize: Typography.xlarge,
    fontFamily: 'jaldi-bold',
  },
  modalView: {
    flex: 1,
    marginHorizontal: wp("6%"),
    marginVertical: hp("10%"),
    borderRadius: 20,
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("2%"),
    backgroundColor: 'white',
    alignItems: "center",
    height: hp("80%"),
   ...Layout.shadow,
  },
  icon: {
    borderRadius: 6,
    backgroundColor: Colors.lightBluey,
    borderWidth: 0.5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 7,
    justifyContent: 'center',
  },
  answerHolder: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addHolder: {
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  modalButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalSingleButton: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  answerContainer: {
    width: wp('70%'),
    marginVertical: hp("0.7%"),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonFrame: {
    overflow: 'hidden',
    borderRadius: 150,
  }
});

export default EditPoll;