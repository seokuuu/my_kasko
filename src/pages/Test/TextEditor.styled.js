import styled from 'styled-components';

export const TextEditor = styled.div`
  .quill {
    height: 100%;
    background-color: #fff;
  }
  .ql-container {
    min-height: ${props => props._height || 'calc(100vh - 280px)'};
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ql-editor {
    max-height: ${props => props._height || 'calc(100vh - 280px)'};
    height: 100%;
    flex: 1;
    overflow-y: auto;
    width: 100%;
  }
`;
