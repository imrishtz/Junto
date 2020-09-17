import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Fontisto, MaterialIcons, FontAwesome } from '@expo/vector-icons'; 
import Colors from '../constants/Colors';
import BodyText from './BodyText';
import CardRightIcons from '../constants/CardRightIcons';
import { useSelector } from 'react-redux';
import { maybeGetFullStrDate } from '../helpers/dateToStringConverter';
const iconSize = 26;
const iconColor = Colors.primary;
const iconWidth = 40;

const EventCard = props => {
  let contacts = useSelector(state => state.contacts.contacts);
  const [ leftIconStart, setLeftIconStart ] = useState();
  const [ leftIconSize, setLeftIconSize ] = useState();
  const [ iconsMarginLeft, setIconsMarginLeft ] = useState();
  const [ leftIconPadding, setLeftIconPadding ] = useState();

  const selectParticipantDisplayName = (participant) => {
    let name = participant.phoneNumbers[0];
    if (participant.name !== undefined) {
      name = participant.name;
    } else if (participant.userName !== undefined) {
      name = participant.userName;
    }
    return name;
  }
  const IconAndText = (IconFamily, iconName, textStyle, children, numberOfLines, isDot, extraWidth) => {
    return (
      <View style={styles.general}>
        <View style={{...styles.icon , width: iconWidth}}>
          <IconFamily
            name={iconName}
            size={iconSize} 
            color={iconColor}
          />
        </View>
        <View style={{...styles.itemText, width: "84%"}}>
          <BodyText 
            style={textStyle}
            numberOfLines={numberOfLines}>
              {children}
              {isDot ? '.' : ''}
          </BodyText>
        </View>
      </View>
    );
  }
  const IconAndParticipants = (participants) => {
    return (
      <View style={styles.general}>
        <View style={{...styles.icon , width: iconWidth}}>
          <MaterialIcons
            name= "group"
            size={iconSize} 
            color={iconColor}
          />
        </View> 
        <View style={{...styles.selectedParticipants, width: "84%"}}>
        {participants && participants.length > 0 ? 
              participants.map((participant) => {
                return (
                  <View 
                  key={participant.phoneNumbers[0]}
                  style={styles.selectedBoxTouchable}
                  >
                    <View 
                      style={styles.selectedBox}>
                      <BodyText 
                        style={styles.selectedParticipantText}
                      >
                        {selectParticipantDisplayName(participant)}
                      </BodyText>
                    </View>
                  </View>
                );
              }) :
              <BodyText >No Participants.</BodyText>
            }
        </View>
      </View>
    )
  }

  const { name,
    date,
    location,
    participants,
    type,
    icon,
  } = props.event;
  const strStart = maybeGetFullStrDate(date.from);
  const strEnd = maybeGetFullStrDate(date.to);

  console.log(new Date(Date.now()) + "strStart = " + JSON.stringify(strStart)); 
  console.log(new Date(Date.now()) + "strEnd = " + JSON.stringify(strEnd)); 

  const getParticipantNameFromPhone = (participantPhones) => {


    const contactMatched = contacts.find(
        (contact) =>  {
          for (const contactPhone of contact.phoneNumbers) {
            for (const participantPhone of participantPhones) {
              if (participantPhone === contactPhone) {
                return contact;
              }
            }
          }
        } 
      );
    return contactMatched && contactMatched.firstName;
  }

  const participantsWithInfo = participants && participants.length > 0 ? participants.map((participant) => {
    const name = getParticipantNameFromPhone(participant.phoneNumbers);
    if (name !== undefined) {
      return ({
        ...participant,
        name: getParticipantNameFromPhone(participant.phoneNumbers)
      });
    } else {
      return participant;
    }
  }) : [];
  useEffect(() => {
    const updateLayout = () => {
      if (Dimensions.get('window').width < 400) {
        setLeftIconSize(45);
        setIconsMarginLeft(40);
        setLeftIconPadding("3%");
      } else {
        setLeftIconSize(52);
        setIconsMarginLeft(50);
        setLeftIconPadding("3%");
      }
    }
    updateLayout();
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  }, []);



  // console.log("EVENT DATA - date=" + date + "location=" + location + "type.name=" + type.name + "icon width=" + iconWidth);
  return (
    <View style={styles.card}>
      <View style={styles.cardBox}>
        <View style={styles.header}>
          <BodyText style={styles.headerText}>{name}</BodyText>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardText}> 
            {IconAndText(MaterialIcons, "location-on", styles.second, location, 2, true)}
            {IconAndText(Fontisto, "date", styles.second, "" + strStart.eventTime + " to " + strStart.eventDate, undefined, true)}
            {IconAndParticipants(participantsWithInfo)}
          </View>
          <View style={styles.cardRight}>
            <BodyText style={styles.rightText}>{type.name}</BodyText>
            <View style={styles.imageContainer}>
              <CardRightIcons icon={icon} iconSize={leftIconSize} color={'black'} />
            </View> 
          </View>
        </View> 
      </View> 
    </View> 
  ); 
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBox: {
    justifyContent: 'center',
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 0.5,
    backgroundColor: 'white',
    marginVertical: '0.5%',
    zIndex: 1,
    paddingBottom: '1%',
  },
  cardBody: {
    flexDirection: 'row',
    paddingLeft: '1.5%',
    paddingRight: '3%',
  },
  cardText: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '70%',
  },
  cardRight: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: Colors.lavender,
    borderRadius: 10,
    marginTop: '1%',
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
    padding: "1%",
    margin: "0%",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  rightText: {
    fontFamily: 'jaldi',
    fontSize: 18,
    textAlign: 'center'
  },
  imageContainer: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    elevation: 6,
    borderRadius: 150,
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: Colors.yellowish,
    overflow: 'hidden',
    height: 70,
    width: 70,
  },
  second: {
    fontSize: 16
  },
  third: {
    fontSize: 14 ,
    direction: 'rtl',
  },
  selectedParticipants: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    padding: '1%',
    alignItems: 'center',
  },
  selectedBoxTouchable: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  selectedBox: {
    borderRadius: 15,
    textAlign: 'left',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'black',
    paddingHorizontal: "2%",
    margin: 1.5,
    backgroundColor: Colors.lightGreeny,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
  },
});




export default EventCard;
