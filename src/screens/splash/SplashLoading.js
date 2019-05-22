import React from 'react';

import Typography from "Components/Typography";
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
        <Typography type="appLogo" color={WHITE}>Expensy</Typography>
      </AppNameWrapper>
      <LoadingWrapper>
        { message && (
          <React.Fragment>
            <Loader color={WHITE} />
            <Typography color={WHITE}>{message}</Typography>
          </React.Fragment>
        )}
      </LoadingWrapper>
      <FooterWrapper>
        <Typography color={WHITE}>Your Personal expense manager</Typography>
      </FooterWrapper>
    </Wrapper>
  );
};

export default SplashLoading;
