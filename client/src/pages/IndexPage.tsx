import React from 'react'
import { css } from '@emotion/core'

import Landing from '../components/Landing'
import BestSellers from '../components/BestSellers'

type Props = {}

const IndexPage: React.FC<Props> = () => {
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
  )
}

export default IndexPage
