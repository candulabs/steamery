import React, { FunctionComponent, useEffect } from 'react';
import queryString from 'qs';
import { connect } from 'react-redux';

import Ant from './Ant';

import { styleguides } from '../constants';
import { ReduxState } from '../redux/reducers';
import { initAuth } from '../redux/actions/auth';
import Routes from './Routes';

interface Props {
  auth: any;
  initAuth: any;
  styles: any;
}

const App = (props: Props) => {
  const { initAuth, styles } = props;
  const styleguideToRender = styles.styleguide || styleguides[0].id;
  const { styleguide: selectedStyleguide, Additional } = styleguides.find(
    ({ id }) => id === styleguideToRender,
  ) || { styleguide: {} };

  const AdditionalStyles = Additional as FunctionComponent<any>;

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const { clientToken, userId } = queryString.parse(window.location.search.replace('?', ''));

  return (
    <React.Fragment>
      <AdditionalStyles />
      <Ant>
        <Routes />
      </Ant>
    </React.Fragment>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
  styles: state.styles,
});

export default connect(mapStateToProps, { initAuth })(App);
