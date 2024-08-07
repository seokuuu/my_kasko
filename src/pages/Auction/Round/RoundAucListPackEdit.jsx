// import { useEffect, useState } from 'react'
// import {
//   BlackBtn,
//   BtnBound,
//   BtnWrap,
//   GreyBtn,
//   NewBottomBtnWrap,
//   SkyBtn,
//   TGreyBtn,
//   WhiteBtn,
//   WhiteRedBtn,
// } from '../../../common/Button/Button'
// import { MainSelect } from '../../../common/Option/Main'
// import { storageOptions } from '../../../common/Option/SignUp'
// import Excel from '../../../components/TableInner/Excel'
// import HeaderToggle from '../../../components/Toggle/HeaderToggle'
// import { toggleAtom } from '../../../store/Layout/Layout'
// import Test3 from '../../Test/Test3'

// import {
//   CustomInput,
//   DoubleWrap,
//   ExInputsWrap,
//   FilterContianer,
//   FilterFooter,
//   FilterHeader,
//   FilterLeft,
//   FilterRight,
//   FilterSubcontianer,
//   FilterTCTop,
//   FilterTopContainer,
//   Input,
//   PartWrap,
//   PWRight,
//   ResetImg,
//   RowWrap,
//   TableContianer,
//   TCSubContainer,
//   Tilde,
//   UnitLabel,
// } from '../../../modal/External/ExternalFilter'

// import Hidden from '../../../components/TableInner/Hidden'
// import PageDropdown from '../../../components/TableInner/PageDropdown'
// import { aucProAddModalAtom } from '../../../store/Layout/Layout'
// import { useAtom } from 'jotai'
// import DefaultBlueBar from '../../../modal/Multi/DefaultBlueBar'

// //경매 목록 수정(패키지)
// const RoundAucListPackEdit = ({}) => {
//   const checkSales = ['전체', '확정 전송', '확정 전송 대기']
//   const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
//   //checkSales
//   const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

//   //checkShips
//   const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

//   useEffect(() => {
//     // true에 해당되면, value를, false면 빈값을 반환
//     const updatedCheck = checkSales.map((value, index) => {
//       return check1[index] ? value : ''
//     })
//     // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
//     const filteredCheck = updatedCheck.filter((item) => item !== '')
//     setCheckData1(filteredCheck)

//     // 전송용 input에 담을 때
//     // setInput({
//     //   ...input,
//     //   businessType: updatedCheck.filter(item => item !== ''),
//     // });
//   }, [check1])

//   const handleSelectChange = (selectedOption, name) => {
//     // setInput(prevState => ({
//     //   ...prevState,
//     //   [name]: selectedOption.label,
//     // }));
//   }
//   const [isRotated, setIsRotated] = useState(false)

//   // Function to handle image click and toggle rotation
//   const handleImageClick = () => {
//     setIsRotated((prevIsRotated) => !prevIsRotated)
//   }

//   // 토글 쓰기
//   const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
//   const [toggleMsg, setToggleMsg] = useState('On')
//   const toggleBtnClick = () => {
//     setExfilterToggle((prev) => !prev)
//     if (exFilterToggle === true) {
//       setToggleMsg('Off')
//     } else {
//       setToggleMsg('On')
//     }
//   }

//   return (
//     <FilterContianer>
//       <FilterHeader>
//         <div style={{ display: 'flex' }}>
//           <h1>경매 목록 수정(패키지)</h1>
//         </div>
//         {/* 토글 쓰기 */}
//         <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
//       </FilterHeader>
//       <FilterTopContainer>
//         <FilterTCTop>
//           <h6>경매 번호</h6>
//           <p>2023041050</p>
//         </FilterTCTop>
//       </FilterTopContainer>
//       {exFilterToggle && (
//         <>
//           <FilterSubcontianer>
//             <FilterLeft>
//               <RowWrap modal none>
//                 <PartWrap>
//                   <h6>창고 구분</h6>
//                   <PWRight>
//                     <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
//                   </PWRight>
//                 </PartWrap>
//                 <PartWrap>
//                   <h6>유찰 횟수</h6>
//                   <ExInputsWrap>
//                     <Input /> <Tilde>~</Tilde>
//                     <Input />
//                   </ExInputsWrap>
//                 </PartWrap>
//                 <PartWrap>
//                   <h6>구분</h6>
//                   <PWRight>
//                     <MainSelect />
//                     <MainSelect />
//                     <MainSelect />
//                   </PWRight>
//                 </PartWrap>
//               </RowWrap>
//             </FilterLeft>
//           </FilterSubcontianer>
//           <FilterFooter>
//             <div style={{ display: 'flex' }}>
//               <p>초기화</p>
//               <ResetImg
//                 src="/img/reset.png"
//                 style={{ marginLeft: '10px', marginRight: '20px' }}
//                 onClick={handleImageClick}
//                 className={isRotated ? 'rotate' : ''}
//               />
//             </div>
//             <div style={{ width: '180px' }}>
//               <BlackBtn width={100} height={40}>
//                 검색
//               </BlackBtn>
//             </div>
//           </FilterFooter>
//         </>
//       )}
//       <TableContianer>
//         <TCSubContainer bor>
//           <div>
//             조회 목록 (선택 <span>2</span> / 50개 )
//             <Hidden />
//           </div>
//           <div style={{ display: 'flex', gap: '10px' }}>
//             <PageDropdown />
//             <Excel getRow={getRow} />
//           </div>
//         </TCSubContainer>
//         <TCSubContainer>
//           <div>
//             선택 중량<span> 2 </span>kg / 총 중량 kg
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <p>시작가 경매 응찰</p>
//             <CustomInput placeholder="아울렛 입력" width={120} height={32} />
//             <TGreyBtn height={30} style={{ minWidth: '50px' }}>
//               적용
//             </TGreyBtn>
//             <BtnBound style={{ margin: '0px' }} />
//             <SkyBtn
//               onClick={() => {
//                 setAddModal(true)
//               }}
//             >
//               제품 추가
//             </SkyBtn>
//           </div>
//         </TCSubContainer>
//         <Test3 />
//         <TCSubContainer>
//           <div style={{ display: 'flex', gap: '10px' }}></div>
//           <div>
//             <WhiteRedBtn>선택 목록 제거</WhiteRedBtn>
//           </div>
//         </TCSubContainer>
//         <NewBottomBtnWrap bottom={0}>
//           <WhiteBtn width={13} height={40}>
//             돌아가기
//           </WhiteBtn>
//           <BlackBtn width={13} height={40}>
//             등록
//           </BlackBtn>
//         </NewBottomBtnWrap>
//         {addModal && <DefaultBlueBar setAddModal={setAddModal} />}
//       </TableContianer>
//     </FilterContianer>
//   )
// }

// export default RoundAucListPackEdit
