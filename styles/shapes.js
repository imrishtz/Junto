import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../constants/Colors';
export const roundSmallButton = {
  borderWidth: 0.5,
  borderRadius: 150,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  width: hp("4.2%"),
  height:  hp("4.2%"),
  backgroundColor: Colors.lightGreeny,
}