import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';


const ICON_TYPE = {
  Ionicons,
  Octicons,
  SimpleLineIcons,
  Zocial,
  MaterialIcons,
  MaterialCommunityIcons,
  Foundation,
  FontAwesome5,
  FontAwesome,
  Entypo,
  AntDesign,
  EvilIcons,
  Feather,
};

const Icon = ({ type, ...props}) => {
  const IconComp = ICON_TYPE[type];
  return (
    <IconComp size={25} {...props} />
  );
};

export default Icon;