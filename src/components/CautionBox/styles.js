import { styled } from "styled-components";

export const SCautionBox = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    padding-right: 18px;
  `,
  Contents: styled.div`
    flex: 1;

    /* editor styles */
    .caution-editor-wrapper {
      border: 3px solid #EEF3FB;
      &--readonly {
        border: 0;
      }
    }
    .caution-editor-toolbar {
      padding: 2px;
      border-width: 0 0 3px;

      > * {
        margin: 0 6px 0 0;
        padding: 0 6px 0 0;
      }

      .hidden-icon {
        display: none;
      }
    }
    .caution-editor {
      width: 100%;
      padding: 4px 8px 8px;

      .public-DraftStyleDefault-block {
        margin: 4px 0;
      }
    }
  `,
  Buttons: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 120px;
    align-items: flex-end;
  `,
  Button: styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: #ffffff;
    &:hover {
      font-weight: bold;
      text-decoration: underline;
    }
  `
}