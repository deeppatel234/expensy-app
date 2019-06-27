import styled from 'styled-components';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.brand.white};
`;

export const AppNameWrapper = styled.View`
  align-self: center;
  padding: 50px 0 20px 0;
`;

export const SignUpWrapper = styled.View`
  margin: 10px 70px;
`;

export const LoginFormWrapper = styled.View`
  align-self: center;
  padding: 20px 70px;
`;

export const FooterWrapper = styled.View`
  align-self: center;
  margin: 30px 0;
`;

export const LoginLink = styled.View`
  margin: 10px 0;
`;

export const ErrorMessage = styled.View`
  align-self: center;
  margin: 10px 0;
`;
