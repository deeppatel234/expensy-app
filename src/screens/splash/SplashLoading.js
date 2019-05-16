import React from 'react';

import TypoGraphy from "Components/TypoGraphy";
import Loader from "Components/Loader";

import { WHITE } from 'Src/theme';

import {
  Wrapper,
  AppNameWrapper,
  LoadingWrapper,
  FooterWrapper,
} from './style';

const SplashLoading = ({ message }) => {
  return (
    <Wrapper>
      <AppNameWrapper>
        <TypoGraphy type="appLogo" color={WHITE}>Expensy</TypoGraphy>
      </AppNameWrapper>
      <LoadingWrapper>
        { message && (
          <React.Fragment>
            <Loader color={WHITE} />
            <TypoGraphy color={WHITE}>{message}</TypoGraphy>
          </React.Fragment>
        )}
      </LoadingWrapper>
      <FooterWrapper>
        <TypoGraphy color={WHITE}>Your Personal expense manager</TypoGraphy>
      </FooterWrapper>
    </Wrapper>
  );
};

export default SplashLoading;
