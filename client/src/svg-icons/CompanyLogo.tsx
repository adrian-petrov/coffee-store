import React from 'react';
import styled from '@emotion/styled';

type LogoProps = {
  width?: string;
  marginBottom?: string;
  className?: string;
};

const StyledCompanyLogo = styled('svg')<LogoProps>`
  fill: white;
  width: ${({ width }: LogoProps) => (width ? width : '10rem')};
  margin-bottom: ${({ marginBottom }: LogoProps) =>
    marginBottom ? marginBottom : 0};
`;

function CompanyLogo(props: LogoProps) {
  return (
    <StyledCompanyLogo viewBox="0 0 207.531 43.702" {...props}>
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
    </StyledCompanyLogo>
  );
}

export default CompanyLogo;
