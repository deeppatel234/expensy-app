import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { TouchableOpacity } from "react-native";
import { Link } from "react-router-native";

import Avatar from "Components/Avatar";
import Icon from "Components/Icon";
import Typography from "Components/Typography";

import Redux from "Redux/ReduxRegistry";

import { BLACK } from "Src/theme";

import {
  TopMenu,
  MenuContainer,
  ShadowContainer,
  BottomContent,
  UserDetails,
  AvatarContainer,
  MenuItemContainer,
  TopMenuItems,
  BottomMenuItems,
  MenuItem,
  MenuIcon,
  MenuName
} from "./styled";

const MENU = [
  {
    url: "/",
    icon: { type: "AntDesign", name: "dashboard" },
    text: "Dashboard"
  },
  {
    url: "/view-wallet",
    icon: { type: "AntDesign", name: "wallet" },
    text: "Wallets"
  },
  {
    url: "/view-category",
    icon: { type: "AntDesign", name: "API" },
    text: "Categories"
  },
  {
    url: "/setting",
    icon: { type: "AntDesign", name: "setting" },
    text: "Settings"
  }
];

const Menu = ({ user, logoutUser, closeMenuDrawer, history }) => {
  const logout = () => {
    logoutUser().then(() => history.push("/login"));
  };

  return (
    <MenuContainer>
      <ShadowContainer>
        <TopMenu>
          <BottomContent>
            <AvatarContainer>
              <Avatar>
                <Icon type="AntDesign" name="user" color={BLACK} />
              </Avatar>
            </AvatarContainer>
            <UserDetails>
              <Typography type="small" appearance="white">
                {user.name}
              </Typography>
              <Typography type="small" appearance="white">
                {user.email}
              </Typography>
            </UserDetails>
          </BottomContent>
        </TopMenu>
        <MenuItemContainer>
          <TopMenuItems>
            {MENU.map(menu => (
              <Link key={menu.url} to={menu.url} onPress={closeMenuDrawer}>
                <MenuItem>
                  <MenuIcon>
                    <Icon type={menu.icon.type} name={menu.icon.name} />
                  </MenuIcon>
                  <MenuName>
                    <Typography type="small">{menu.text}</Typography>
                  </MenuName>
                </MenuItem>
              </Link>
            ))}
          </TopMenuItems>
          <BottomMenuItems>
            <TouchableOpacity onPress={logout}>
              <MenuItem>
                <MenuIcon>
                  <Icon type="AntDesign" name="logout" />
                </MenuIcon>
                <MenuName>
                  <Typography type="small">Signout</Typography>
                </MenuName>
              </MenuItem>
            </TouchableOpacity>
          </BottomMenuItems>
        </MenuItemContainer>
      </ShadowContainer>
    </MenuContainer>
  );
};

// Maps state from store to props
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeMenuDrawer: () =>
      dispatch(Redux.get("setting", "changeMenuDrawerVisibility")(false)),
    logoutUser: () => Redux.get("user").logoutUser()
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu)
);
