import * as React from 'react';
import queryString from 'qs';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { ExploreDraft } from './components';

const Container = styled.div`
  max-width: 980px;
  margin: auto;
  padding-top: 56px;
`;

const Explore = () => (
  <Container>
    <Switch>
      <Route path="/draft">
        <ExploreDraft />
      </Route>
      <Route path="/test-styleguide">
        <div id="all-nodes" />
      </Route>
      <Route path="/launch-darkly">
        <div id="launch-darkly" />
      </Route>
      <Route path="/sdk-test">
        {({ location }) => {
          const portalSlug = queryString.parse(location.search.replace('?', '')).portalSlug;

          return <div id={(portalSlug as string) || 'datadog-test-portal'} />;
        }}
      </Route>
      <Route path="/">
        <div id="explore-center" />
      </Route>
    </Switch>
  </Container>
);

export default Explore;
