import styled from 'styled-components';
import { WHITE } from 'Src/theme';

export const Wrapper = styled.View`
  background-color: ${WHITE};
  height: 100%;
  width: 100%;
`;

export const AppNameWrapper = styled.View`
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginFormWrapper = styled.View`
  height: 40%;
  margin: 0 70px;
`;

export const FooterWrapper = styled.View`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignUpLink = styled.View`
  margin: 10px 0;
`;

export const ErrorMessage = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

export const SignUpWrapper = styled.View`
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 70px;
`;
