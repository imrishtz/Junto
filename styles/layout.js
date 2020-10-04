import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const field = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  paddingVertical: hp("1%"),
  alignItems: 'center',
  borderTopWidth: 0.5,
  borderTopColor: 'black',
}

export const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
}

export const centered = {
  justifyContent: 'center',
  alignItems: 'center',
}