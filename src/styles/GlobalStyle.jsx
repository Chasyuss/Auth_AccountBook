import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    max-width: 1200px;
    min-width:800px;
    margin: 0 auto; 
    padding: 0;
    background-color : #f6f3f1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default GlobalStyle;
