import styled from 'styled-components';

export const MenuContainer = styled.View`
  background-color: white;
  padding-right: 10px;
  width: 100%;
  height: 100%;
`;

export const ShadowContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-right-width: 1;
  border-color: ${props => props.theme.light};
  shadow-color: ${props => props.theme.light};
  shadow-opacity: 0.5;
  shadow-radius: 2;
  elevation: 1;
`;

export const TopMenu = styled.View`
  height: 20%;
  background-color: ${props => props.theme.primary};
  flex-direction: column-reverse;
`;

export const BottomContent = styled.View`
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

export const AvatarContainer = styled.View`
  padding: 0 15px;
`;

export const UserDetails = styled.View`
`;

export const MenuItemContainer = styled.View`
  height: 80%;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopMenuItems = styled.View`
`;

export const BottomMenuItems = styled.View`
`;

export const MenuItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MenuIcon = styled.View`
  padding: 15px;
`;

export const MenuName = styled.View`
`;
