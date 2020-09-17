import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet,
  Modal,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
  Button,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
import SelectDate, {DATE, TIME} from './SelectDate';
import BodyText from './BodyText';
import ActiveFrame from './ActiveFrame';
import ActiveInnerFrame from './ActiveInnerFrame';

const currDate = new Date(Date.now());
const AddDate = props => {
  const { addAnswer, placeHolder} = props;
  const [isStart, setIsStart] = useState(true);
  const [eventStartDate, setEventStartDate] = useState({
    time: {value: currDate, isSet: false},
    date: {value: currDate, isSet: false},
  });
  const [eventEndDate, setEventEndDate] = useState({
    time: {value: currDate, isSet: false},
    date: {value: currDate, isSet: false},
  });
  console.log(new Date(Date.now()) + "eventStartDate = " + JSON.stringify(eventStartDate)); 
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const changeStartDate = (name, value, isSet) => {
    setEventStartDate({...eventStartDate, [name] :{value, isSet: isSet}});
    // setting end date or hour to start selecting from the start date or hour
    if (!eventEndDate.date.isSet && name === DATE || !eventEndDate.time.isSet && name === TIME) {
      setEventEndDate({...eventEndDate, [name] :{value}});
    }
  }
  const changeEndDate = (name, value, isSet) => {
    setEventEndDate({...eventEndDate, [name] :{value, isSet: isSet}});
  }
  const eventStartDateSet = eventStartDate.date.isSet || 
                            eventStartDate.time.isSet;
                            
  const eventEndDateSet = eventEndDate.date.isSet || 
                          eventEndDate.time.isSet;
  const addDate = () => {
    addAnswer({eventStartDate, eventEndDate});
    setEventStartDate({...eventStartDate, [TIME] : {...eventStartDate[TIME], isSet: false}, [DATE] : {...eventStartDate[DATE], isSet: false}});
    setEventEndDate({...eventEndDate, [TIME] : {...eventEndDate[TIME], isSet: false}, [DATE] : {...eventEndDate[DATE], isSet: false}});
    setIsStart(true);
  }
                          
  return (
    <View style={styles.addHolder}>
      <View style={styles.addInput}>
        <View style={styles.pickStartOrEnd}>
              <TouchableCmp 
                style={styles.setButtonHolder}
                onPress={() => setIsStart(true)}
              >
                  <View style={{...styles.setButton, 
                                backgroundColor: isStart? Colors.grayish : Colors.gray,
                                ...eventStartDateSet? styles.selectedBorder : null,
                              }}>
                    <BodyText style={styles.setText}>Start</BodyText>
                  </View>
              </TouchableCmp>
              <TouchableCmp 
                style={styles.setButtonHolder}
                onPress={() => (console.log("end pressed"),setIsStart(false))}
              >
                  <View style={{...styles.setButton, 
                                backgroundColor: !isStart? Colors.grayish : Colors.gray,
                                ...eventEndDateSet? styles.selectedBorder : null,
                              }}>
                    <BodyText style={styles.setText}>End</BodyText>
                  </View>
              </TouchableCmp>
                <TouchableCmp
                  onPress={() => addDate(eventStartDate, eventEndDate)}
                  >
                <View style={styles.setButtonHolder}>
                  <View style={{...styles.roundSmallButton, backgroundColor: Colors.primary}}>
                    <BodyText style={styles.addText}>Add</BodyText>
                    <MaterialIcons 
                      name='add'
                      size={18}
                      color='white'
                    />
                 </View>
                </View>
              </TouchableCmp>
        </View>
        <View style={styles.selectDate}>
        {isStart? 
          <SelectDate
            initialDate={eventStartDate} 
            onChange={changeStartDate} 
            title='Start'
          />
          :
          <SelectDate
          initialDate={eventEndDate}
          onChange={changeEndDate} 
          title='End'
          />  
        }
      </View>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  addHolder: {
    backgroundColor: 'white',
    width: wp("80%"),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addInput: {
    width: wp("60%"),
    minHeight: hp("23%"),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectDate: {
    width: wp("60%"),
  },
  pickStartOrEnd: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp("65%"),
    marginBottom: hp("0.3%"),
  },
  setText: {
    fontSize: hp("2.2%"),
  },
  addText: {
    fontSize: hp("2.2%"),
    color: 'white',
  },
  setButtonHolder: {
    borderRadius: 12, 
    borderColor: 'white',
    borderWidth: 3,
  },
  selectedBorder: {
    borderWidth: 3,  
    borderRadius: 10, 
    borderColor: Colors.lightGreeny,
  },
  setButton: {
    borderWidth: 0.5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius:8,
    overflow: Platform.OS === 'android'?  'hidden' : 'visible',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 0.5,
    borderColor: 'black',
    elevation: 5,
  },
  roundSmallButtonHolder: {
    alignItems: 'center',
    
  },
  roundSmallButton: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: Platform.OS === 'android'?  'hidden' : 'visible',
    paddingHorizontal: 5,
    backgroundColor: Colors.lightGreeny,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 0.5,
    borderColor: 'black',
    elevation: 5,
  },
});

export default AddDate;