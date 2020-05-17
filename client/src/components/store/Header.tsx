import React, { useEffect, useRef } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import CompanyLogo from '../../svg-icons/CompanyLogo';
import colors from '../../colors';

type StyledComponentProps = {
  pathname: string;
};

const StyledMainHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8rem;
  padding: 0 3rem;
  background-color: ${(props: StyledComponentProps): string =>
    props.pathname === '/' ? 'transparent' : `${colors.secondary}`};
  z-index: 10;
  display: flex;
`;

const StyledStickyHeader = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 5rem;
  transform: translateY(-100%);
  opacity: 0;
  background-color: white;
  z-index: 10;
  padding: 0 3rem;
  display: flex;
  transition: all 0.3s ease-in-out;
`;

function Header({ location: { pathname } }: RouteComponentProps) {
  const headerMainRef = useRef<HTMLElement | null>(null);
  const headerStickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener('scroll', swapHeadersOnScroll);
    return (): void =>
      window.removeEventListener('scroll', swapHeadersOnScroll);
  });

  function swapHeadersOnScroll(): void {
    const stickyThreshold = 80; // height of headerMain
    const distanceY = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

    if (
      distanceY > stickyThreshold &&
      headerMainRef.current &&
      headerStickyRef.current
    ) {
      headerMainRef.current.classList.add('header-main-none');
      headerStickyRef.current.classList.add('header-sticky');
    } else if (
      distanceY < stickyThreshold &&
      headerMainRef.current &&
      headerStickyRef.current
    ) {
      headerMainRef.current.classList.remove('header-main-none');
      headerStickyRef.current.classList.remove('header-sticky');
    }
  }

  return (
    <>
      {/* main header */}
      <StyledMainHeader ref={headerMainRef} pathname={pathname}>
        {/* header container */}
        <div
          css={css`
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          {/* logo */}
          <Link to="/">
            <CompanyLogo width="15rem" />
          </Link>
          {/* navigation */}
          <nav
            css={css`
              height: 100%;
              display: flex;
              align-items: center;
              text-transform: uppercase;
              font-weight: 500;
              letter-spacing: 2px;
            `}
          >
            <ul
              css={css`
                height: 100%;
                display: flex;
                align-items: center;

                & li {
                  height: 100%;

                  & a {
                    height: 100%;
                    width: 8rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.2s ease-in-out;
                    text-decoration: none;
                    color: white;

                    &:hover {
                      background-color: white;
                      color: ${colors.textPrimary};

                      svg {
                        fill: ${colors.textPrimary};
                      }
                    }
                  }
                }

                & svg {
                  fill: white;
                  height: 24px;
                  transition: all 0.2s ease-in-out;
                }
              `}
            >
              <li>
                <Link to="/products">Shop</Link>
              </li>
              <li>
                {/* account link */}
                <Link to="/account">
                  <svg viewBox="0 0 512 512">
                    <path d="m431.964 435.333c-.921-58.994-19.3-112.636-51.977-151.474-32.487-38.601-76.515-59.859-123.987-59.859s-91.5 21.258-123.987 59.859c-32.646 38.797-51.013 92.364-51.973 151.285 18.46 9.247 94.85 44.856 175.96 44.856 87.708 0 158.845-35.4 175.964-44.667z" />
                    <circle cx="256" cy="120" r="88" />
                  </svg>
                </Link>
              </li>
              <li>
                {/* cart link */}
                <Link to="/cart">
                  <svg viewBox="0 -31 512.00033 512">
                    <path d="m166 300.003906h271.003906c6.710938 0 12.597656-4.4375 14.414063-10.882812l60.003906-210.003906c1.289063-4.527344.40625-9.390626-2.433594-13.152344-2.84375-3.75-7.265625-5.964844-11.984375-5.964844h-365.632812l-10.722656-48.25c-1.523438-6.871094-7.617188-11.75-14.648438-11.75h-91c-8.289062 0-15 6.710938-15 15 0 8.292969 6.710938 15 15 15h78.960938l54.167968 243.75c-15.9375 6.929688-27.128906 22.792969-27.128906 41.253906 0 24.8125 20.1875 45 45 45h271.003906c8.292969 0 15-6.707031 15-15 0-8.289062-6.707031-15-15-15h-271.003906c-8.261719 0-15-6.722656-15-15s6.738281-15 15-15zm0 0" />
                    <path d="m151 405.003906c0 24.816406 20.1875 45 45.003906 45 24.8125 0 45-20.183594 45-45 0-24.8125-20.1875-45-45-45-24.816406 0-45.003906 20.1875-45.003906 45zm0 0" />
                    <path d="m362.003906 405.003906c0 24.816406 20.1875 45 45 45 24.816406 0 45-20.183594 45-45 0-24.8125-20.183594-45-45-45-24.8125 0-45 20.1875-45 45zm0 0" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </StyledMainHeader>
      {/* sticky header */}
      <StyledStickyHeader ref={headerStickyRef}>
        <div
          css={css`
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          {/* logo */}
          <div
            css={css`
              & svg {
                fill: ${colors.textPrimary};
                height: 30px;
                transition: all 0.3 ease-in-out;
              }
            `}
          >
            <Link to="/">
              <svg viewBox="0 0 207.531 43.702">
                <g transform="translate(-217.225 -935.573)">
                  <g transform="translate(217.225 935.573)">
                    <g transform="translate(0 16.646)">
                      <path
                        d="M36.158,221.456l.46-.089c.541-.1,13.332-2.612,13.332-9.347,0-2.094-.676-3.59-2.015-4.45-1.931-1.245-4.637-.7-6.31-.167v-1.628a3.126,3.126,0,0,0-3.122-3.122H9.366a3.126,3.126,0,0,0-3.122,3.122v2.081a19.676,19.676,0,0,0,7.69,15.609H1.041A1.042,1.042,0,0,0,.3,225.243l2.333,2.333a7.244,7.244,0,0,0,5.151,2.133h32.29a7.343,7.343,0,0,0,5.151-2.133l2.333-2.333a1.042,1.042,0,0,0-.737-1.777h-12.9A19.324,19.324,0,0,0,36.158,221.456ZM41.5,209.645c1.315-.5,3.942-1.207,5.307-.323a2.948,2.948,0,0,1,1.059,2.7c0,3.461-5.786,5.777-9.609,6.822A19.659,19.659,0,0,0,41.5,209.645Z"
                        transform="translate(0 -202.654)"
                      />
                    </g>
                    <g transform="translate(29.139 0.003)">
                      <path
                        d="M301.585,39.979a6.235,6.235,0,0,0,0-7.54,1.041,1.041,0,1,0-1.625,1.3,4.188,4.188,0,0,1,0,4.943,6.232,6.232,0,0,0,0,7.54,1.042,1.042,0,0,0,1.627-1.3A4.188,4.188,0,0,1,301.585,39.979Z"
                        transform="translate(-298.685 -32.049)"
                      />
                    </g>
                    <g transform="translate(22.887 0.003)">
                      <path
                        d="M237.5,39.977a6.229,6.229,0,0,0,0-7.54,1.041,1.041,0,1,0-1.625,1.3,4.2,4.2,0,0,1,0,4.943,6.229,6.229,0,0,0,0,7.54,1.041,1.041,0,0,0,1.625-1.3A4.2,4.2,0,0,1,237.5,39.977Z"
                        transform="translate(-234.602 -32.047)"
                      />
                    </g>
                    <g transform="translate(16.652 0)">
                      <path
                        d="M173.588,39.951a6.235,6.235,0,0,0,0-7.54,1.04,1.04,0,0,0-1.623,1.3,4.2,4.2,0,0,1,0,4.943,6.229,6.229,0,0,0,0,7.542,1.042,1.042,0,0,0,1.625-1.3A4.2,4.2,0,0,1,173.588,39.951Z"
                        transform="translate(-170.69 -32.021)"
                      />
                    </g>
                  </g>
                  <text
                    transform="translate(279.755 952.573)"
                    fontSize="16"
                    fontFamily="Montserrat-Medium, Montserrat"
                    fontWeight="500"
                    letterSpacing="0.055em"
                  >
                    <tspan x="0" y="15">
                      Coffee Maestros
                    </tspan>
                  </text>
                </g>
              </svg>
            </Link>
          </div>
          {/* navigation */}
          <nav
            css={css`
              height: 100%;
              display: flex;
              align-items: center;
            `}
          >
            <ul
              css={css`
                height: 100%;
                display: flex;
                align-items: center;
                text-transform: uppercase;
                font-weight: 500;
                font-size: 1.2rem;
                letter-spacing: 2px;

                & li {
                  height: 100%;

                  & a {
                    height: 100%;
                    width: 5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.2s ease-in-out;

                    &:hover {
                      background-color: ${colors.lightGrey};
                    }
                  }
                }

                & svg {
                  fill: ${colors.textPrimary};
                  height: 18px;
                }
              `}
            >
              <li>
                <Link to="/products">Shop</Link>
              </li>
              <li>
                {/* account link */}
                <Link to="/account">
                  <svg viewBox="0 0 512 512">
                    <path d="m431.964 435.333c-.921-58.994-19.3-112.636-51.977-151.474-32.487-38.601-76.515-59.859-123.987-59.859s-91.5 21.258-123.987 59.859c-32.646 38.797-51.013 92.364-51.973 151.285 18.46 9.247 94.85 44.856 175.96 44.856 87.708 0 158.845-35.4 175.964-44.667z" />
                    <circle cx="256" cy="120" r="88" />
                  </svg>
                </Link>
              </li>
              <li>
                {/* cart link */}
                <Link to="/cart">
                  <svg viewBox="0 -31 512.00033 512">
                    <path d="m166 300.003906h271.003906c6.710938 0 12.597656-4.4375 14.414063-10.882812l60.003906-210.003906c1.289063-4.527344.40625-9.390626-2.433594-13.152344-2.84375-3.75-7.265625-5.964844-11.984375-5.964844h-365.632812l-10.722656-48.25c-1.523438-6.871094-7.617188-11.75-14.648438-11.75h-91c-8.289062 0-15 6.710938-15 15 0 8.292969 6.710938 15 15 15h78.960938l54.167968 243.75c-15.9375 6.929688-27.128906 22.792969-27.128906 41.253906 0 24.8125 20.1875 45 45 45h271.003906c8.292969 0 15-6.707031 15-15 0-8.289062-6.707031-15-15-15h-271.003906c-8.261719 0-15-6.722656-15-15s6.738281-15 15-15zm0 0" />
                    <path d="m151 405.003906c0 24.816406 20.1875 45 45.003906 45 24.8125 0 45-20.183594 45-45 0-24.8125-20.1875-45-45-45-24.816406 0-45.003906 20.1875-45.003906 45zm0 0" />
                    <path d="m362.003906 405.003906c0 24.816406 20.1875 45 45 45 24.816406 0 45-20.183594 45-45 0-24.8125-20.183594-45-45-45-24.8125 0-45 20.1875-45 45zm0 0" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </StyledStickyHeader>
    </>
  );
}

export default withRouter(Header);
