import styled from 'styled-components'

export const SDropField = {
  FileUploadContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  FileInput: styled.input`
    display: none;
  `,

  UploadLabel: styled.label`
    width: 321px;
    height: ${({ height }) => height};
    box-sizing: border-box;
    border: 2px solid #c8c8c8;
    border-radius: 5px;
    background-color: white; //#f6f6f6
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 13px;
    color: #333;
    user-select: none;
    &:hover {
      border: 1.5px dashed black;
      background-color: #f6f6f6;
    }
  `,
  UploadedImage: styled.img`
    max-width: 100%;
    max-height: 100%;
  `,
}
export const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: #333;
    margin-right: 7px;
  }
`

export const Button = styled.button`
  cursor: wait;
  border: none;
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  background: none;
  padding: 0;
  svg {
    height: 1em;
  }
`
export const SubFont = styled.span`
  margin-top: 20px;
  font-family: Spoqa Han Sans Neo;
  font-size: 13px;
  font-weight: 400;
  color: #7d7d7d;
  line-height: 2em;
  letter-spacing: -0.04em;
  text-align: left;
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
export const List = styled.li`
  display: flex;
  justify-content: flex-start;
  width: 312px;
`
export const FileName = styled.div`
  font-size: 13px;
  margin-right: auto;
`
export const CloseButton = styled.button``
