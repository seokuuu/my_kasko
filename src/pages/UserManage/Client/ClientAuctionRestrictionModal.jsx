// import React from 'react'
// import {
//   ModalContainer,
//   ModalOverlay,
//   ModalSubContainer,
//   ModalText,
//   ModalTitle,
// } from '../../../modal/Common/Common.Styled'
// import { ModalPart } from '../../User/SignUp/SignUp.Styled'
// import { BlackBtn } from '../../../common/Button/Button'
// import { log } from '../../../lib'
// import styled from 'styled-components'
// import { useState } from 'react'

// const ClientAuctionRestrictionModal = ({ onClick, selectedValue, setSelectedValue, setAuctionModal }) => {
//   const handleConfirm = () => {
//     onClick(true)
//   }

//   const handleCancel = () => {
//     onClick(false)
//   }

//   const handleChange = (e) => {
//     const value = e.target.value
//     setSelectedValue(value)
//     // console.log(`Selected value: ${value}`)
//   }
//   const offModal = (e) => {
//     setAuctionModal(false)
//   }

//   return (
//     <>
//       <ModalOverlay />
//       <ModalContainerC width={280} height={330}>
//         <ModalTitle>
//           <TitleSub>
//             <div>회원 제한</div>
//             <Button onClick={offModal}>x</Button>
//           </TitleSub>
//         </ModalTitle>
//         <ModalSubContainerC>
//           <>
//             <ModalPart>
//               <RadioWrapper>
//                 <RadioLabel>
//                   <input
//                     type="radio"
//                     name="vertical-radio"
//                     value="1"
//                     checked={selectedValue === '1'}
//                     onChange={handleChange}
//                   />
//                   &nbsp;경매 시작가 제한
//                 </RadioLabel>
//                 <RadioLabel>
//                   <input
//                     type="radio"
//                     name="vertical-radio"
//                     value="2"
//                     checked={selectedValue === '2'}
//                     onChange={handleChange}
//                   />
//                   &nbsp;경매 제한
//                 </RadioLabel>
//               </RadioWrapper>
//               {/* <ModalText>{content}</ModalText> */}
//             </ModalPart>
//             <BlackBtn width={100} height={50} onClick={onClick}>
//               적용
//             </BlackBtn>
//           </>
//         </ModalSubContainerC>
//       </ModalContainerC>
//     </>
//   )
// }

// export default ClientAuctionRestrictionModal

// const RadioWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 16px;
// `

// const RadioLabel = styled.label`
//   margin-bottom: 8px;
// `

// const ModalSubContainerC = styled.div`
//   padding: 56px 24px 32px 24px;
//   border-radius: 10px;
// `
// const TitleSub = styled.div`
//   display: flex;
//   justify-content: space-between;
//   color: white;
//   background: var(--primary-heavy, #061737);
//   padding: 20px 24px;
// `
// const ModalContainerC = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: white;
//   width: ${(props) => props.width}px;
//   height: ${(props) => props.height}px;
//   // height: max-content;
//   z-index: 9999;
//   border: 1px solid black;
//   border-radius: 5px;
// `
// const Button = styled.button`
//   display: flex; // Use flexbox
//   justify-content: center; // Center horizontally
//   align-items: center;
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 24px; // or whatever size you want for the X
//   color: white;

//   &:focus {
//     outline: none;
//   }
// `
