import React from 'react';

import styled, { css } from 'styled-components';

import Window from './Window';

const Container = styled.div`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAMklEQVQoU2P8/5//PwMYfIBQaICRCAX/oSZgNYCB8f9/khUIQI2CuAmLCQQVoLqFoBsA13oh6VgfNmcAAAAASUVORK5CYII=) repeat;

  width: 60%;
  margin-top: 1em;

  border-top: 2px solid #898989;
  border-left: 2px solid #898989;

  box-shadow: 1px 1px 0 1px white;
`;

const ShopWindow: React.FC = () => (
  <Container>
    123
  </Container>
);

export default ShopWindow;
