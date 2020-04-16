import React from 'react'
import { css } from '@emotion/core'

import colors from '../colors'

const Footer: React.FC = () => (
  <footer
    css={css`
      display: flex;
      flex-direction: column;
      font-size: 14px;
      background-color: ${colors.secondary};
      color: white;
      padding: 6rem 3rem;
    `}
  >
    This is the footer
  </footer>
)

export default Footer
