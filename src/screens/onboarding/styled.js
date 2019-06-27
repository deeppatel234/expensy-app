import styled from 'styled-components';

// Welcome Page
export const WelcomeWrapper = styled.View`
  background-color: ${props => props.theme.brand.white};
  height: 100%;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export const HelloText = styled.View`
  align-self: center;
  margin: 30px 0;
  flex-grow: 2;
`;

export const WelcomeText = styled.View`
  align-self: center;
  margin: 10px 0;
  flex-grow: 1;
`;

export const FooterButton = styled.View`
  flex-grow: 1;
`;


// Currency Choose Page

export const CurrencyChooseWrapper = styled.View`
  background-color: ${props => props.theme.brand.white};
  height: 100%;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export const AppName = styled.View`
  align-self: center;
  margin: 30px 0;
  flex-grow: 2;
`;

export const SelectText = styled.View`
  flex-grow: 2;
  align-self: center;
`;

export const CurrencyTextWrapper = styled.View`
  align-self: center;
  margin-top: 30px;
`;

export const CurrencyText = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CurrencyIcon = styled.View`
  margin-right: 10px;
`;
