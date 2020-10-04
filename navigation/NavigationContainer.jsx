import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import MainNavigation from './MainNavigation';

const NavigationContainer = () => {
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.user.user);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    }
  }, [isAuth]);

  return <MainNavigation ref={navRef} />;
};

export default NavigationContainer;