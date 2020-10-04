import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Fontisto, MaterialIcons, FontAwesome } from '@expo/vector-icons'; 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Colors from '../constants/Colors';
import BodyText from './BodyText';
import Icons from '../constants/Icons';
import { useSelector } from 'react-redux';
import { dateToStrDate, dateToStrHour } from '../helpers/dateToStringConverter';
import { Layout, Typography } from '../styles';
import DateText from './DateText';
const iconSize = wp("5.8%");
const iconColor = Colors.primary;
const eventIconSize = hp("5%");
const EventCard = props => {
  const { name,
    date,
    location,
    type,
    icon,
  } = props.event;

  const strStartHour = dateToStrHour(date && date.start && date.start.time && new Date(date.start.time));
  const strStartDate = dateToStrDate(date && date.start && date.start.date && new Date(date.start.date));
  const strEndHour = dateToStrHour(date && date.end && date.end.time && new Date(date.end.time));
  const strEndDate = dateToStrDate(date && date.end && date.end.date && new Date(date.end.date));
  const fullDateStr = {
    start: {time: strStartHour, date: strStartDate},
    end: {time: strEndHour, date: strEndDate}
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardBox}>
        <View style={styles.header}>
          <BodyText numberOfLine={1} ellipsizeMode="tail"  style={styles.headerText}>{name}</BodyText>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardText}> 
            <View style={styles.contentRow}>
              <View style={styles.leftIcon}>
                <MaterialIcons
                  name={"location-on"}
                  size={iconSize} 
                  color={iconColor}
              />
              </View>
              <View style={styles.contentText}>
                <View style={styles.locationText}>
                  <BodyText numberOfLines={2} style={styles.second}>
                    {location ? location : 'No location selected yet'}
                  </BodyText>
                </View>
              </View>
            </View>
            <View style={styles.seperator}></View>
            <View style={styles.contentRow}>
              <View style={styles.leftIcon}>
                <Fontisto
                  name={"date"}
                  size={iconSize} 
                  color={iconColor}
              />
            </View>
            <View style={styles.contentText}>
              <DateText date={fullDateStr} size={Typography.xsmall}/>
            </View>
            </View>
          </View>
          <View style={styles.cardRight}>
            <View style={styles.imageContainer}>
              <Icons iconKey={icon} iconSize={eventIconSize}/>
            </View> 
            <BodyText style={type.length > 7 ? styles.typeTextSmall : styles.typeText}>{type || 'Eventing'}</BodyText>
          </View>
        </View> 
      </View> 
    </View> 
  ); 
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  cardBox: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    borderWidth: 0.5,
    backgroundColor: 'white',
    marginVertical: '0.5%',
    paddingBottom: '1%',
    // maxHeight: hp("22%"),
    height: hp("20.5%"),
  },
  cardBody: {
    flex: 7,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: '1.5%',
    paddingRight: '3%',
  },
  cardText: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  cardRight: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp('1%'),
  },
  general: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: "1%",
    paddingVertical: "1%",
  },
  icon: {
    alignItems: 'center'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    padding: "1.5%",
    borderBottomWidth: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    height: hp("3.5%"),
    width: wp("100%"),
    maxWidth: wp("90%"),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Typography.medium,
  },
  typeText: {
    fontSize: Typography.xsmall,
    textAlign: 'center'
  },
  typeTextSmall: {
    fontSize: Typography.xxsmall,
    textAlign: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    ...Layout.shadow,
    borderRadius: 150,
    borderWidth : 0.5,
    backgroundColor: Colors.lightPurple,
    height: wp("16%"),
    width: wp("16%"),
  },
  second: {
    textAlign: 'center',
    fontSize: Typography.xsmall,
    textAlignVertical: 'center',
  },
  third: {
    fontSize: Typography.small,
    direction: 'rtl',
  },
  locationText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    paddingHorizontal: wp("1.5%"),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: wp("70%"),
    marginVertical: hp("0.75%"),
  },
  leftIcon: {
    flex: 1,
  },
  contentText: {
    flex: 5,
    height: hp('9%'),
    justifyContent: 'center',
  },
  seperator: {
    alignSelf: 'flex-end',
    width: wp("60%"),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default EventCard;
