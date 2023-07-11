import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* font cdn */

  @font-face {
    font-family: 'SUIT';
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.ttf') format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  /* 리셋 css */
  * {
    margin:0;padding:0;border:0;
  }
  html, 
  body {
    width:100%; 
    font-size: calc( 12px + 0.4vw ); 
    font-family: 'SUIT';

    font-weight: 100;
  }
  html, 
  h1, 
  h2, 
  h3, 
  h4, 
  h5, 
  h6, 
  form, 
  fieldset, 
  img {
    margin:0;
    padding:0;
    border:0;
  }
  h1, 
  h2, 
  h3, 
  h4, 
  h5, 
  h6 {
    font-family: 'SUIT';
    font-size:1rem;
    font-weight: 100;
  }
  article, 
  aside, 
  details, 
  figcaption, 
  figure, 
  footer, 
  header, 
  hgroup, 
  menu, 
  nav, 
  section {
    display:block;
  }

  ul, 
  dl,
  dt,
  dd {
    margin:0;
    padding:0;
    list-style:none;
  }
  legend {
    position:absolute;
    margin:0;
    padding:0;
    font-size:0;
    line-height:0;
    text-indent:-9999em;
    overflow:hidden;
  }
  label, 
  input, 
  button, 
  select, 
  img {
    vertical-align:middle;
    font-size:1em;
  }
  input, 
  button {
    margin:0;
    padding:0;
    font-family: 'SUIT';
    font-size:1em;
  }
  input{
    padding-left: 10px;
  }
  input[type="submit"] {
    cursor:pointer
  }
  button {
    cursor:pointer
  }
  textarea, 
  select {
    font-family: 'SUIT';
    font-size:1em;
  }
  select {
    margin:0;
  }
  p {
    margin:0;
    padding:0;
    word-break:break-all;
  }
  hr {
    display:none;
  }
  pre {
    overflow-x:scroll;
    font-size:1.1em;
  }
  a {
    color:#000;
    text-decoration:none;
  }
  a:hover {
    color:#000;
    text-decoration:none;
  }
  *, :after, :before {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
`;

export default GlobalStyle;
