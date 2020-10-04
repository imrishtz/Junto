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
  FlatList,
  KeyboardAvoidingView, TouchableHighlight
} from 'react-native';
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
import MarkAnswer from './MarkAnswer';
import PollAnswerIndication from './PollAnswerIndication';
const Poll = props => {
  const { type, showPoll, pollAnswers, onDismiss, PollRender, selectAnswerHandler, isMarked, approveAnswers } = props;
  const answers = pollAnswers;
  const scrollViewRef = useRef();
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback ;
  }

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
            <View style={styles.secondHeader}>
              <BodyText style={styles.secondHeaderText}>Please select your preferences:</BodyText>
            </View>
            <View style={styles.contentContainer}>
              <FlatList 
              ref={scrollViewRef}
              contentContainerStyle={styles.scrollBarStyle}
              persistentScrollbar={true}
              keyExtractor={item => item.id.toString()}
              fadingEdgeLength={50}
              data={answers}
              renderItem={itemData => answers && answers.length &&
                <View style={styles.answerContainer}>
                  <MarkAnswer isMarked={isMarked(itemData.item)}>
                    <TouchableOpacity
                      onPress={() => selectAnswerHandler(itemData.item, itemData.index)}
                      style={styles.answerContentContainer}
                      activeOpacity={0.7}
                    >
                        <PollRender
                            answer={itemData.item}
                            index={itemData.index}
                        />
                    </TouchableOpacity>
                  </MarkAnswer>
                  <View style={styles.pollAnswerIndication}>
                    <PollAnswerIndication answer={itemData.item}/>
                  </View>
                </View>}
              />
            </View>
            <View style={styles.bottom}>
              <BodyText style={styles.bottomText}>{ answers && ('(' + answers.length + ' options)')}</BodyText>
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
                  title='OK'
                  color={Colors.primary}
                  onPress={() => approveAnswers()}
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
  secondHeader: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.3,
    maxWidth: wp("70%"),
    paddingBottom: hp("1.5%"),
  },
  secondHeaderText: {
    fontSize: Typography.small,
    textAlign: 'center',
    textDecorationLine: 'underline',
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
    flex: 5,
    justifyContent: 'center',
  },
  scrollBarStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  answersContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  noAnswersView: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  answerHolder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerContentContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: hp("0.3%"),
    alignItems: 'center',
    flex: 8,
  },
  answerContainer: {
    width: wp('73%'),
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: hp("0.3%"),
    alignItems: 'center',
  },
  pollAnswerIndication: {
    flex: 1,
  },
  bottomText: {
    fontSize: Typography.xsmall,
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
  buttonFrame: {
    overflow: 'hidden',
    borderRadius: 150,
  }
});

export default Poll;