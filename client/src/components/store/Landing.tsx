import React, { useEffect, useState } from 'react';
import { css } from '@emotion/core';

import colors from '../../colors';
import video from '../../videos/video-2.mp4';
import Button from '../common/Button';

function Landing() {
  const [serverMessage, setServerMessage] = useState('');
  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setServerMessage(data));
  }, []);

  return (
    <div
      css={css`
        height: 45vh;
      `}
    >
      {/* video container */}
      <div
        css={css`
          position: relative;
          height: 45vh;
          overflow: hidden;
        `}
      >
        <video
          css={css`
            position: absolute;
            min-width: 100%;
            min-height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
          autoPlay
          loop
        >
          <source src={video} type="video/mp4" />
        </video>
        {/* overlay */}
        <div
          css={css`
            width: 100%;
            height: 45vh;
            position: absolute;
            top: 0;
            left: 0;
            background-color: ${colors.secondary};
            opacity: 0.9;
          `}
        />
        {/* text */}
        <div
          css={css`
            width: 100%;
            max-width: 1320px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;

            & h1 {
              color: white;
              letter-spacing: 3px;
              font-size: 7.4rem;
            }

            & h3 {
              color: white;
              width: 80%;
            }

            & a {
              margin-top: 2rem;
            }
          `}
        >
          <h1>No gimmicks. Just great coffee.</h1>
          <h3>Tired of mediocre coffee? Then this is the place for you.</h3>
          <h3>{serverMessage}</h3>
          <Button color="primary" to="/products">
            Shop now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
