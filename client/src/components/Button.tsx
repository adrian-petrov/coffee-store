import React from 'react';
import { Link, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import styled from '@emotion/styled';

import colors from '../colors';

const StyledButtonPrimary = styled.button`
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 1.6rem 3.2rem;
  border: 0;
  border-radius: 4px;
  background-color: ${({ color }: ButtonProps): boolean | string =>
    (color === 'primary' && colors.primary) ||
    (color === 'secondary' && colors.secondary)};
  color: #ffff;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.primaryLight1};
  }
`;

const StyledButtonLink = styled(Link)`
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 1.6rem 3.2rem;
  border: 0;
  border-radius: 4px;
  background-color: ${({ color }: LinkProps): boolean | string =>
    (color === 'primary' && colors.primary) ||
    (color === 'secondary' && colors.secondary)};
  color: #ffff;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.primaryLight1};
  }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  color: string;
  to?: undefined;
};

type LinkProps = ReactRouterLinkProps & {
  children: string;
  color: string;
  to: string;
};

function hasPath(props: ButtonProps | LinkProps): props is LinkProps {
  return 'to' in props;
}

function Button(props: ButtonProps | LinkProps) {
  const { children } = props;

  if (hasPath(props)) {
    return <StyledButtonLink {...props}>{children}</StyledButtonLink>;
  }
  return <StyledButtonPrimary {...props}>{children}</StyledButtonPrimary>;
}

export default Button;
