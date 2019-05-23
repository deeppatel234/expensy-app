import React from "react";

import { TouchableHighlight } from "react-native";

import Typography from "Components/Typography";
import Avatar from "Components/Avatar";

import { ListItem, RightList } from "Src/globalStyle";

const Panel = ({ category }) => (
  <ListItem>
    <Avatar.Icon iconKey={category.icon} />
    <RightList>
      <Typography>{category.name}</Typography>
    </RightList>
  </ListItem>
);

const CategoryPanel = ({ category, onPress }) => {
  if (!onPress) {
    return <Panel category={category} />;
  }

  return (
    <TouchableHighlight onPress={onPress}>
      <Panel category={category} />
    </TouchableHighlight>
  );
};

export default CategoryPanel;
