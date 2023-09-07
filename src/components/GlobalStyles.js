import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        font-family: 'Montserrat', sans-serif;
        height: 100vh;
        width: 100vw;
        max-width: 100vw;
        overflow-x: hidden;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    button {
        color: white;
        background-color: black ;
        font-family: 'Montserrat', sans-serif;
        border: none;
        border-radius: 25px;
        font-size: 1.3em;
        padding: 10px 25px
    }
    h1 {
        font-family: 'Archivo Black', sans-serif;
        color: black;
    }
    h2 {
        color: black;
        font-size: 2.3em;
    }
    a {
        font-family: 'Archivo Black', sans-serif;
        text-decoration: none;
        color: black;
    }
`;

export default GlobalStyles;