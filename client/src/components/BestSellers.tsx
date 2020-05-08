import React from 'react';
import { css } from '@emotion/core';

import colors from '../colors';

function BestSellers() {
  return (
    <section
      css={css`
        /* background-color: ${colors.lightBrown}; */
      `}
    >
      <div className="container">
        <ul
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            grid-gap: 24px;
          `}
        >
          <li>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
            omnis quam adipisci, praesentium aperiam consequuntur? Rerum fugit
            unde quae officia ad at vel et, quibusdam, quam sint veniam nam,
            necessitatibus quisquam vero impedit ab ducimus esse error vitae!
            Dolore quos quaerat voluptate cumque unde dolorum nam neque corporis
            eos reprehenderit.
          </li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
            omnis quam adipisci, praesentium aperiam consequuntur? Rerum fugit
            unde quae officia ad at vel et, quibusdam, quam sint veniam nam,
            necessitatibus quisquam vero impedit ab ducimus esse error vitae!
            Dolore quos quaerat voluptate cumque unde dolorum nam neque corporis
            eos reprehenderit.
          </li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
            omnis quam adipisci, praesentium aperiam consequuntur? Rerum fugit
            unde quae officia ad at vel et, quibusdam, quam sint veniam nam,
            necessitatibus quisquam vero impedit ab ducimus esse error vitae!
            Dolore quos quaerat voluptate cumque unde dolorum nam neque corporis
            eos reprehenderit.
          </li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
            omnis quam adipisci, praesentium aperiam consequuntur? Rerum fugit
            unde quae officia ad at vel et, quibusdam, quam sint veniam nam,
            necessitatibus quisquam vero impedit ab ducimus esse error vitae!
            Dolore quos quaerat voluptate cumque unde dolorum nam neque corporis
            eos reprehenderit.
          </li>
        </ul>
      </div>
    </section>
  );
}

export default BestSellers;
