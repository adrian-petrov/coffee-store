import React from 'react'
import { css } from '@emotion/core'

type Props = {}

const AccountPage: React.FC<Props> = () => {
  return (
    <div
      css={css`
        min-height: 2800px;
      `}
    >
      <h1>This is the account page</h1>
    </div>
  )
}

export default AccountPage
