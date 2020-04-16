import React from 'react'
import { css } from '@emotion/core'

type Props = {}

const ProductsPage: React.FC<Props> = () => {
  return (
    <div
      css={css`
        min-height: 800px;
      `}
    >
      <h1>This is the products page</h1>
    </div>
  )
}

export default ProductsPage
