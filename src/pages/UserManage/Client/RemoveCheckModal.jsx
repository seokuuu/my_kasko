// import React from 'react'
// import {
//   ModalContainer,
//   ModalOverlay,
//   ModalSubContainer,
//   ModalText,
//   ModalTitle,
// } from '../../../modal/Common/Common.Styled'
// import { ModalPart } from '../../User/SignUp/SignUp.Styled'
// import { BlackBtn, WhiteBtn } from '../../../common/Button/Button'
// import styled from 'styled-components'

// {
//   /* <AlertModal type={2} title={'회원을 삭제하시면, 탈퇴 처리되어 \n 데이터가 삭제 됩니다. 삭제 하시겠습니까?'} /> */
// }

// const RemoveCheckModal = ({ onClick, title, content }) => {
//   const handleConfirm = () => {
//     onClick(true)
//   }

//   const handleCancel = () => {
//     onClick(false)
//   }
//   return (
//     <>
//       {' '}
//       <ModalOverlay />
//       <ModalContainer width={400}>
//         <ModalSubContainer>
//           <>
//             <ModalPart>
//               <ModalTitle>{title}</ModalTitle>
//               <ModalText>{content}</ModalText>
//             </ModalPart>
//             <RedBtn width={100} height={50} onClick={handleConfirm}>
//               삭제
//             </RedBtn>
//             <WhiteBtn width={100} height={50} onClick={handleCancel}>
//               취소
//             </WhiteBtn>
//           </>
//         </ModalSubContainer>
//       </ModalContainer>
//     </>
//   )
// }

// export default RemoveCheckModal

// const RedBtn = styled.button`
//   font-size: ${(props) => props.fontSize}px;
//   width: ${(props) => props.width}%;
//   height: ${(props) => props.height}px;
//   margin: ${(props) => props.margin}px;
//   background-color: #b02525;
//   color: white;
//   cursor: pointer;
//   border: 1px solid #e1e1e1;
// `
