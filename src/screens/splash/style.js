import styled from 'styled-components';
import { PRIMARY_COLOR } from 'Src/theme';

export const Wrapper = styled.View`
  background-color: ${PRIMARY_COLOR};
  height: 100%;
  width: 100%;
`;

export const AppNameWrapper = styled.View`
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingWrapper = styled.View`
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterWrapper = styled.View`
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
