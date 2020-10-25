import { css, ThemeProps } from "styled-components";
import { ButtonProps } from "../Button";
import { ApplicationWindowTypes } from "../../state/applicationWindowState";

const Button = css<ThemeProps<ButtonProps>>`
background-color: #C3C3C3;
box-shadow: 1px 1px 0 1px black;
font-weight: 400;
text-align: left;
font-size: 1.2em;
letter-spacing: -1px;

*, & { /* All children and itself */
    vertical-align: middle;
}

padding: 0 5px;
border-right: 1px solid #c3c3c3;
border-bottom: 1px solid #c3c3c3;
border-top: 2px solid white;
border-left: 2px solid white;
outline: none;

/* If it is an "application" */
${(props) =>
  props.theme.isApplication
    ? `
        width: 10em;
      `
    : ""}

/* If it is active */
${(props) =>
  props.theme.activity === ApplicationWindowTypes.FOCUSED
    ? `
        border-top: 1px solid #c3c3c3;
        border-left: 1px solid #c3c3c3;
        border-bottom: 2px solid white;
        border-right: 2px solid white;

        margin-top: -1px;
        height: 36px;

        box-shadow: 1px 1px 1px 1px black inset;

        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJ0lEQVQYV2N88ODBfwYGBgZ5eXkQxcCIIfD//3+wiocPH0JUoAsAAMp5FTuPL92NAAAAAElFTkSuQmCC)
          repeat;
      `
    : ""}
${(props) =>
  props.theme.activity === ApplicationWindowTypes.CLOSED
    ? `
        display: none;
      `
    : ""}

&:not(:last-of-type) {
    margin-right: .3em;
}
`;

export { Button };
