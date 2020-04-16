import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';

type Props = RouteComponentProps & {
  children: React.ReactNode;
};

type StyledComponentProps = {
  pathname: string;
};

const StyledMain = styled.main`
  width: 100%;
  margin-top: ${(props: StyledComponentProps) =>
    props.pathname === '/' ? '0' : '8rem'};
`;

const Main = ({ children, location: { pathname } }: Props) => {
  return <StyledMain pathname={pathname}>{children}</StyledMain>;
};

export default withRouter(Main);
