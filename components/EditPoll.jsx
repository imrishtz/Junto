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
                      <PollRender 
                          key={index}
                          answer={answer}
                          index={index}
                          deleteAnswer={deleteAnswer}
                      />
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
    fontSize: 24,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    flex: 4,
    justifyContent: 'center',
  },
  answersContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAnswersView: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  answers: {
    flex: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 0.5,
    paddingHorizontal: 2,
    paddingVertical: 1,
    backgroundColor: Colors.lightGreeny,
    borderRadius: 8,
  },
  answer: {
    fontSize: 16,
  }, 
  answerHolder: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundSmallButtonHolder: {
    flex: 1,
    margin: wp("1%"),
    width: '10%',
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonFrame: {
    overflow: 'hidden',
    borderRadius: 150,
  }
});

export default EditPoll;