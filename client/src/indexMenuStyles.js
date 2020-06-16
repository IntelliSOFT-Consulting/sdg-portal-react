import { css } from 'styled-components';

export const container = css`
  border : 2px solid white;
`;

export const center = css`
  div {
    position: absolute;
    top: 50%;
    width: 100%;
    color: white;
    text-align: center;
  }
`;

export const button = css`
  background: ${({ backgroundColor, centerRadius }) => `radial-gradient(transparent ${centerRadius}, ${backgroundColor} ${centerRadius})`}; 
  border : 2px solid white;
`;


export const slice = css`
  div{
    border : 2px solid white;
  } 
`;

export const item = css` 
  border : 2px solid white; 

  
`