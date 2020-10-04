import { MaterialIcons, FontAwesome, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import React from 'react';

export const icons = [
  {
    key: 'drink',
    name: 'drink',
    Family: Entypo
  },
  {
    key: 'birthday',
    name: 'birthday-cake',
    Family: FontAwesome
  },
  {
    key: 'fastfood',
    name: 'food',
    Family: MaterialCommunityIcons
  },
  {
    key: 'restaurant',
    name: 'restaurant',
    Family: MaterialIcons
  },
  {
    key: 'beer',
    name: 'beer',
    Family: FontAwesome5
  },
  {
    key: 'movie',
    name: 'local-movies',
    Family: MaterialIcons
  },
  {
    key: 'tv',
    name: 'tv',
    Family: MaterialIcons
  },
  {
    key: 'female',
    name: 'gender-female',
    Family: MaterialCommunityIcons
  },
  {
    key: 'male',
    name: 'gender-male',
    Family: MaterialCommunityIcons
  },
  {
    key: 'females',
    name: 'human-female-female',
    Family: MaterialCommunityIcons
  },
  {
    key: 'males',
    name: 'human-male-male',
    Family: MaterialCommunityIcons
  },
  {
    key: 'babyCarriage',
    name: 'child-friendly',
    Family: MaterialIcons
  },
  {
    key: 'beach',
    name: 'beach',
    Family: MaterialCommunityIcons
  },
  {
    key: 'pool',
    name: 'pool',
    Family: MaterialIcons
  },
  {
    key: 'hiking',
    name: 'hiking',
    Family: FontAwesome5
  },
  {
    key: 'trip',
    name: 'card-travel',
    Family: MaterialIcons
  },
  {
    key: 'car',
    name: 'car-convertible',
    Family: MaterialCommunityIcons
  },
  {
    key: 'jeep',
    name: 'jeepney',
    Family: MaterialCommunityIcons
  },
  {
    key: 'walk',
    name: 'directions-walk',
    Family: MaterialIcons
  },
  {
    key: 'run',
    name: 'directions-run',
    Family: MaterialIcons
  },
  {
    key: 'bike',
    name: 'directions-bike',
    Family: MaterialIcons
  },
  {
    key: 'motorcycle',
    name: 'motorcycle',
    Family: FontAwesome
  },
  {
    key: 'party',
    name: 'card-travel',
    Family: MaterialIcons
  },
  {
    key: 'airplane',
    name: 'airplane-takeoff',
    Family: MaterialCommunityIcons
  },
  {
    key: 'start',
    name: 'grade',
    Family: MaterialIcons
  },
  {
    key: 'bomb',
    name: 'bomb',
    Family: FontAwesome
  },
  {
    key: 'rocket',
    name: 'rocket',
    Family: FontAwesome5
  },
  {
    key: 'grill',
    name: 'grill',
    Family: MaterialCommunityIcons
  },
  {
    key: 'ski',
    name: 'skiing',
    Family: FontAwesome5
  },
  {
    key: 'snowboarding',
    name: 'snowboarding',
    Family: FontAwesome5
  },
  {
    key: 'group',
    name: 'group',
    Family: FontAwesome
  },
  {
    key: 'speaker',
    name: 'speaker',
    Family: MaterialIcons
  },
  {
    key: 'fire',
    name: 'fire',
    Family: MaterialCommunityIcons
  },
  {
    key: 'bolt',
    name: 'bolt',
    Family: FontAwesome
  },
  {
    key: 'emoticon-poop',
    name: 'emoticon-poop',
    Family: MaterialCommunityIcons
  },
  {
    key: 'copyright',
    name: 'copyright',
    Family: MaterialIcons 
  }
];

const Icons = props => {
  const {iconSize, iconKey} = props;
  const icon = icons.find((icon) => icon.key === iconKey);
  const iconName = icon.name;
  const IconFamily = icon.Family;
  return (
    <IconFamily
      name={iconName}
      size={iconSize} 
      color={props.color}
    />
  );
};

export default Icons;