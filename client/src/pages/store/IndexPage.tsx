import React from 'react';
import { css } from '@emotion/core';

import Landing from '../../components/store/Landing';
import BestSellers from '../../components/store/BestSellers';

function IndexPage() {
  return (
    <div>
      <Landing />
      <BestSellers />
      <div
        css={css`
          min-height: 1800px;
        `}
      ></div>
    </div>
  );
}

export default IndexPage;
