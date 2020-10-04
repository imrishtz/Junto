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
  PixelRatio,
  
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import BodyText from './BodyText';
import Colors from '../constants/Colors';
import AdjustableButton from './AdjustableButton';
import { MaterialIcons } from '@expo/vector-icons';
import ActiveInnerFrame from './ActiveInnerFrame';
import {dateToStrDate, dateToStrHour} from '../helpers/dateToStringConverter';
import { Layout } from '../styles';

export const TIME = 'time';
export const DATE = 'date';
const HOUR_UNDEFINED = '--:--';
const DATE_UNDEFINED = '__.__.__';


const getDisplayHour = (rawDate, isSet) => {
  return (
    isSet? dateToStrHour(rawDate) :
    HOUR_UNDEFINED
  );
}
const getDisplayDate = (rawDate, isSet) => {
  return (
    isSet? dateToStrDate(rawDate) :
    DATE_UNDEFINED
  );
}

const SelectDate = props => {

  const { time, date } = props.initialDate;
  const [modalVisibility, setModalVisibility] = useState(false);
  const [mode, setMode] = useState();
  const [pickedDate, setDate] = useState(date.value);
  const [iosDate, setIosDate] = useState(date.value);
  const [show, setShow] = useState(false);
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || pickedDate;
    if (Platform.OS === 'ios') {
      setShow(true);
      setIosDate(currentDate);
    } else { //  Android
      setShow(false);
      if (event.type === 'dismissed') {
        return;
      }
      setDate(currentDate);
      props.onChange(mode, currentDate, true);
    }
  };
 
  const handleIosSet = () => {
    props.onChange(mode, iosDate, true);
    setShow(false);
    setModalVisibility(false);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    if (Platform.OS === 'ios') {
      setModalVisibility(true);
    }
  };

  const deleteDate = (target) => {
    props.onChange(target, pickedDate, false);
  }
  // get initialDate when time or date are not set
  if (mode === TIME && !time.isSet && pickedDate !== time.value ) {
    setDate(time.value);
    setIosDate(time.value);
  } else if (mode === DATE && !date.isSet &&  pickedDate !== date.value) {
    setDate(date.value);
    setIosDate(date.value);
  }

  return (
    <ActiveInnerFrame isActive={props.isActive}>
      <View style={styles.dateContainer}>
        <View style={styles.header}> 
          <BodyText style={styles.headerText}>{props.title}</BodyText>
        </View>
        <View style={styles.dateRow}>
          <AdjustableButton style={styles.dateButton} onPress={() => showMode(TIME)}>
            <View style={styles.dateLine}>
              <BodyText style={styles.dateText}>Time: </BodyText>
              <BodyText style={styles.dateValue}>{getDisplayHour(time.value, time.isSet)}</BodyText>
            </View>
          </AdjustableButton>
            <TouchableCmp
              onPress={() => deleteDate(TIME)}
            >
            <View style={styles.roundSmallButton}>
              <MaterialIcons 
                name='delete'
                size={18}
              />
            </View>
          </TouchableCmp>
        </View>
        <View style={styles.dateRow}>
          <AdjustableButton style={styles.dateButton} onPress={() => showMode(DATE)}>
            <View style={styles.dateLine}>
              <BodyText style={styles.dateText}>Date: </BodyText>
              <BodyText style={styles.dateValue}>{getDisplayDate(date.value, date.isSet)}</BodyText>
            </View>
          </AdjustableButton>
            <TouchableCmp
              onPress={() => deleteDate(DATE)}
              >
              <View style={styles.roundSmallButton}>
                <MaterialIcons 
                  name='delete'
                  size={18}
                  />
              </View>
            </TouchableCmp>
        </View>
          { Platform.OS === 'android' ? show && (
            <DateTimePicker
            testID="dateTimePicker2"
            value={pickedDate}
            mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          ) : show &&
          <View style={styles.centered}>
            <Modal
              visible={modalVisibility}
              animationType="slide"
              transparent={true}
              supportedOrientations={['portrait']}  
            >
              <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <DateTimePicker
                  style={{ width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}
                  value={iosDate}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              <AdjustableButton onPress={handleIosSet} style={styles.iosSetButton}>
                  <BodyText>Set</BodyText>
              </AdjustableButton>
              </View>
            </Modal>
          </View>}
      </View>
    </ActiveInnerFrame>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    padding: wp("2%"),
    borderRadius: 10,
    backgroundColor: Colors.grayish,
    ...Layout.shadow,
    borderWidth: 0.5,
  },
  header: {
    height: hp("4%"),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerText: {
    fontFamily: 'jaldi-bold',
    fontSize: hp("2.5%"),
  },
  dateLine: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 5,
    paddingVertical: hp("0.5%"),
  },
  dateValue: {
   // marginLeft: 5,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp("0.5%"),
  },
  dateText: {
    fontSize: PixelRatio.get() <= 2 ? 12 : 14,
  },
  dateValue: {
    fontSize: PixelRatio.get() <= 2 ? 12 : 14,
    color: Colors.darkBlue,
  },
  dateButton: {
    flex: 1,
    backgroundColor: 'white',
  },
  roundSmallButton: {
    borderWidth: 0.5,
    borderRadius: 150,
    width: 28,
    height: 28,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGreeny,
    backgroundColor: 'white',
  },
  iosSetButton: {
    width: wp("16%"),
    height: hp("7%"),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectDate;