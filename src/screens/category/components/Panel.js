import React from "react";

import { TouchableHighlight } from "react-native";

import Link from "Components/Link";
import Icon from "Components/Icon";
import Typography from "Components/Typography";
import Avatar from "Components/Avatar";

import { FlexRow, ListItem, ListDetails, RightList } from "Src/globalStyle";

const Panel = ({ category }) => (
  <ListItem>
    <Avatar.Icon iconKey={category.icon} />
    <RightList>
      <Typography>{category.name}</Typography>
    </RightList>
  </ListItem>
);

const EditIcon = (props) => (
  <TouchableHighlight {...props}>
    <Icon iconType="MaterialIcons" icon="edit" />
  </TouchableHighlight>
);

export const EditPanel = ({ category }) => (
  <ListDetails>
    <FlexRow>
      <Avatar.Icon iconKey={category.icon} />
      <RightList>
        <Typography>{category.name}</Typography>
      </RightList>
    </FlexRow>
    <Link
      key={category._id}
      to={`/edit-category/${category._id}`}
      component={EditIcon}
    />
  </ListDetails>
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
