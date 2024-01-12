import {useEffect, useState} from 'react'
import {styled} from 'styled-components'
import {checkBusinessNumber} from '../../../api/myPage'
import {postClient, postUserManage, resetCustomer} from '../../../api/userManage'
import {BlackBtn, BtnWrap} from '../../../common/Button/Button'
import {CheckImg2, StyledCheckMainDiv, StyledCheckSubSquDiv} from '../../../common/Check/CheckImg'
import {CheckBox} from '../../../common/Check/Checkbox'
import {RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv} from '../../../common/Check/RadioImg'
import {CustomInput, FlexInput} from '../../../common/Input/Input'
import {
    Bar,
    FlexContent,
    FlexPart,
    FlexTitle,
    Left,
    OnePageFlexSubContainer,
    Right,
} from '../../../common/OnePage/OnePage.Styled'
import {AccountSelect, EditSelect, accountOptions, depositOptions} from '../../../common/Option/SignUp'
import RadioButton from '../../../components/RadioButton/RadioButton'
import useReactQuery from '../../../hooks/useReactQuery'
import {WhiteCloseBtn} from '../../../modal/Common/Common.Styled'
import SignUpPost from '../../../modal/SignUp/SignUpPost'
import {CheckBtn, TxtDivNoborder} from '../../../pages/User/SignUp/SignUp.Styled'
import {IIDImg, IncomeImgDiv} from '../../../userpages/UserMyPage/Profile/Profile'

import {getStorageList} from '../../../api/search'
import {MainSelect} from '../../../common/Option/Main'
import {
    FlexContent2,
    MainTitleC,
    ModalContainerC,
    ModalContainerSubC,
    ModalOverlayC,
    CheckTxt2,
} from '../Client/ClientPostModal'

const init = {
    id: '',
    password: '',
    memberTitle: '',
    memberName: '',
    memberEmail: '',
    memberPhone: '',
    type: '', //(법인사업자 / 개인사업자)
    name: '',
    ceoName: '',
    phone: '',
    fax: '',
    addressDetail: '',
    businessType: [], // (유통 / 제조)
    businessNumber: '',
    bank: '',
    accountNumber: '',
    depositManagerTitle: '',
    depositManagerName: '',
    depositManagerPhone: '',
    releaseManagerTitle: '',
    releaseManagerName: '',
    releaseManagerPhone: '',
    storageUid: '',
    transportName: '',
}

// id: 아이디
// password: 비밀번호
// memberTitle: 직함
// memberName: 이름
// memberEmail: 이메일
// memberPhone: 연락처
// type: 사업자 구분 (법인사업자 / 개인사업자)
// name: 회사명
// ceoName: 대표자명
// phone: 대표연락처
// fax: 팩스번호
// address: 주소
// addressDetail: 상세주소2
// businessType: 업태 목록 (유통 / 제조)
// businessNumber: 사업자번호
// bank: 은행
// accountNumber: 계좌번호
// depositManagerTitle: 입금담당자 직함
// depositManagerName: 입금담당자 이름
// depositManagerPhone: 입금담당자 연락처
// releaseManagerTitle: 출고담당자 직함
// releaseManagerName: 출고담당자 이름
// releaseManagerPhone: 출고담당자 연락처

const UserPost = ({setPostModal}) => {
    const [selected, setSelected] = useState({storage: '', storageUid: ''})

    console.log('selected', selected)
    const [selectSwitch, setSelectSwitch] = useState({
        A: false,
        deposit: false,
        release: false,
    })
    const [modalSwitch, setModalSwitch] = useState(false)
    const [input, setInput] = useState(init)
    console.log('input', input)
    const [isUser, setIsUser] = useState(false)
    const [shouldUpdateCustomer, setShouldUpdateCustomer] = useState(false)
    const [renderFileName, setRenderFileName] = useState({businessNumberFile: '', bankbookFile: ''})
    const [checkFileName, setCheckFileName] = useState({deleteBusinessNumberFile: '', deleteBankbookFile: ''})
    const [fileForms, setFileForms] = useState({registration: '', bankBook: ''})
    const [businessNumber, setBusinessNumber] = useState('')
    const [dropdownNames, setDropdownNames] = useState({
        depositManagerTitle: '',
        releaseManagerTitle: '',
        bank: '',
    })

    // TODO : 중복체크 response 없음
    // const { isError, isSuccess, data } = useReactQuery('getCustomerPrivacy', {}, getCustomerPrivacy)

    // const resData2 = data2?.data?.data

    // console.log('resData2', resData2)

    const checkBusiness = async () => {
        try {
            const data = await checkBusinessNumber(businessNumber)
            if (!businessNumber) {
                alert('값을 채워주세요.')
            }
            if (data?.data?.status === 200) {
                alert('사용 가능한 사업자 번호입니다.')
            }
        } catch (err) {
            alert('중복된 사업자 번호입니다.')
        }

        // if (isBusinessNumberSuccess) {
        //   alert('확인되셨습니다.')
        // }
        // if (isBusinessNumberError) {
        //   alert('중복되었습니다.')
        // }
    }
    const handleCheck = (e) => {
        setBusinessNumber(e.target.value)
        console.log(businessNumber)
    }

    const handleSelectChange = (selectedOption, name) => {
        // const isCheck = selectedOption.label
        // if (isCheck === '직함 선택') return

        setInput((prevState) => ({
            ...prevState,
            [name]: selectedOption.label,
        }))
    }

    const {data: storageList} = useReactQuery('', 'getStorageList', getStorageList)

    console.log('storageList', storageList)

    // checked,file 빼고 submit하기 (checkbox는 따로 useState로 하였음)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const checkboxType = ['bank', 'depositManagerTitle', 'releaseManagerTitle']
        const formData = new FormData(e.target)
        const updatedInput = {...input}

        console.log('updatedInput', updatedInput)

        formData.forEach((value, key) => {
            if (input.hasOwnProperty(key) && value && !checkboxType.includes(key)) {
                updatedInput[key] = value
            }
        })

        for (let i in updatedInput) {
            if (updatedInput.hasOwnProperty(i)) {
                console.log(`Input 체크 안되었습니다 ***${i}***`)
                // return
            }
        }

        setInput({...input, ...updatedInput, ...selected, type: savedRadioValue})
        console.log('input <3', input)
        console.log('updatedInput <3', updatedInput)

        setShouldUpdateCustomer(true)
    }

    //TODO: 파일 추가 후에 왜 test1만 바뀌는지
    useEffect(() => {
        const updateCustomerData = async () => {
            if (shouldUpdateCustomer) {
                try {
                    const response = await postUserManage(input, fileForms)
                    console.log(response.data)
                    alert('회원 생성이 완료되었습니다.')
                } catch (err) {
                    console.log(err)
                    alert('ERROR:', err.data)
                }
                setShouldUpdateCustomer(false)
            }
        }
        updateCustomerData()
    }, [shouldUpdateCustomer])

    useEffect(() => {
        return () => {
            setPostModal(false)
        }
    }, [])
    // -------------------------------------------------------------------------------
    const [postFind, setPostFind] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [address, setAddress] = useState('')
    const [detailAddress, setDetailAddress] = useState('')
    const [isDaumPostOpen, setIsDaumPostOpen] = useState(false)
    const postCheck = () => {
        setPostFind(false)
    }

    const directCheck = () => {
        setPostFind(true)
        setAddress('')
        setDetailAddress('')
        setInput({...input, address: '', addressDetail: ''})
    }

    const closeModal = () => {
        setModalIsOpen(false)
        setAddress('')
        setDetailAddress('')
        setInput({...input, address: '', addressDetail: ''})
    }

    const comfirmPost = () => {
        setModalIsOpen(false)
        setInput({...input, address: address, addressDetail: detailAddress})
    }

    const openModal = () => {
        setModalIsOpen(true)
    }
    const daumPostHandleBtn = () => {
        setIsDaumPostOpen(true)
    }

    const daumPostHandleComplete = (data) => {
        const {address} = data
        setAddress(address)
        setIsDaumPostOpen(false)
    }

    const daumPosthandleClose = () => {
        setIsDaumPostOpen(false)
    }

    const detailAddressHandler = (e) => {
        const value = e.target.value
        setDetailAddress(value)
    }

    // 라디오 데이터

    const radioDummy = ['법인사업자', '개인사업자'] // 사업자 구분 (type)
    const radioDummy2 = ['승인', '대기', '미승인'] // 승인 여부
    const radioDummy3 = ['제한 없음', '경매 시작가 제한', '경매 제한'] // 회원 제한
    const radioDummy4 = ['창고', '운송사', '현대제철', '카스코철강', '고객사'] // 사용자 구분 (memberType)
    const [checkRadio, setCheckRadio] = useState(Array.from({length: radioDummy.length}, () => false))
    const [checkRadio2, setCheckRadio2] = useState(Array.from({length: radioDummy2.length}, () => false))
    const [checkRadio3, setCheckRadio3] = useState(Array.from({length: radioDummy3.length}, () => false))
    const [checkRadio4, setCheckRadio4] = useState(Array.from({length: radioDummy4.length}, () => false))

    const [savedRadioValue, setSavedRadioValue] = useState('')
    const [savedRadioValue2, setSavedRadioValue2] = useState('')
    const [savedRadioValue3, setSavedRadioValue3] = useState('')
    const [savedRadioValue4, setSavedRadioValue4] = useState('')

    useEffect(() => {
        const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)
        if (checkedIndex !== -1) {
            const selectedValue1 = radioDummy[checkedIndex]
            setSavedRadioValue(selectedValue1)
            setInput({...input, type: selectedValue1}) // 사업자 구분, type
        }

        const checkedIndex2 = checkRadio2.findIndex((isChecked, index) => isChecked && index < radioDummy2.length)
        if (checkedIndex2 !== -1) {
            const selectedValue2 = radioDummy2[checkedIndex2]
            setSavedRadioValue2(selectedValue2)
            setInput({...input, approvalStatus: selectedValue2}) // 승인 여부, approvalStatus
        }

        const checkedIndex3 = checkRadio3.findIndex((isChecked, index) => isChecked && index < radioDummy3.length)
        if (checkedIndex3 !== -1) {
            const selectedValue3 = radioDummy3[checkedIndex3]
            setSavedRadioValue3(selectedValue3)
            setInput({...input, auctionStatus: selectedValue3}) // 회원 제한, auctionStatus
        }

        const checkedIndex4 = checkRadio4.findIndex((isChecked, index) => isChecked && index < radioDummy4.length)
        if (checkedIndex4 !== -1) {
            const selectedValue4 = radioDummy4[checkedIndex4]
            setSavedRadioValue4(selectedValue4)
            setInput({...input, memberType: selectedValue4}) // 사용자 구분, memberType
        }
    }, [
        checkRadio,
        checkRadio2,
        checkRadio3,
        checkRadio4,
        savedRadioValue,
        savedRadioValue2,
        savedRadioValue3,
        savedRadioValue4,
    ])

    const checkDummy = ['유통', '제조'] // businessType
    const checkDummy2 = ['재고관리', '경매관리', '상시판매', '주문관리', '판매제품 관리', '출고관리', '운영관리'] //managerRoleList

    const [approvalStatus, setApprovalStatus] = useState(Array.from({length: checkDummy2.length}, () => ''))

    const [check, setCheck] = useState(Array.from({length: checkDummy.length}, () => false))
    const [check2, setCheck2] = useState(Array.from({length: checkDummy2.length}, () => false))
    const [checkData, setCheckData] = useState(Array.from({length: checkDummy.length}, () => ''))
    const [checkData2, setCheckData2] = useState(Array.from({length: checkDummy2.length}, () => ''))

    console.log('check data =>', checkData, checkData2)

    useEffect(() => {
        const updatedCheck = checkDummy.map((value, index) => {
            return check[index] ? value : ''
        })
        // 그냥 배열에 담을 때
        const filteredCheck = updatedCheck.filter((item) => item !== '')
        setCheckData(filteredCheck)

        const updatedCheck2 = checkDummy2.map((value, index) => {
            return check2[index] ? value : ''
        })
        // 그냥 배열에 담을 때
        const filteredCheck2 = updatedCheck2.filter((item) => item !== '')
        setCheckData2(filteredCheck2)

        // 전송용 input에 담을 때
        setInput({
            ...input,
            businessType: updatedCheck.filter((item) => item !== ''),
            managerRoleList: updatedCheck2.filter((item) => item !== ''),
        })
    }, [check, check2])

    // 비밀번호 초기화 버튼
    const resetPw = async () => {
        const userConfirmed = window.confirm('비밀번호를 초기화하시겠습니까?')
        const req = {
            id: input.id,
        }
        if (userConfirmed) {
            try {
                const response = await resetCustomer(req)
                if (response) {
                    setInput((prev) => ({...prev, password: response.data.data}))
                    alert(`비밀번호가 초기화되었습니다. 비밀번호 : ${response.data.data}`)
                }
            } catch (err) {
                console.error(err)
                alert(`Error : ${err.data.message}`)
            }
        } else {
            // alert('비밀번호 초기화가 취소되었습니다.')
        }
    }

    const handleSubmitForm = (e) => {
        const value = e.target.value
        const name = e.target.name
        setInput((prev) => ({...prev, [name]: value}))
        console.log(input)
    }

    const modalOFF = () => {
        setPostModal(false)
    }

    const handleFiles = (e) => {
        const name = e.target.name
        const file = e.target.files[0]
        console.log('')
        const fileName = e.target.files[0].name
        if (renderFileName.hasOwnProperty(name)) {
            setRenderFileName((prev) => ({
                ...prev,
                [name]: fileName,
            }))
            if (name === 'businessNumberFile') {
                setFileForms((prev) => ({
                    ...prev,
                    registration: file,
                }))
            }
            if (name === 'bankbookFile') {
                setFileForms((prev) => ({
                    ...prev,
                    bankBook: file,
                }))
            }
        }
    }

    const checkRadioButtonSelection = (selection) => {
        setApprovalStatus(selection)
    }

    return (
        <div>
            <ModalOverlayC/>
            <ModalContainerC width={1350}>
                {/* <ModalSubContainer> */}
                {/* <OnePageFlexContainerC> */}
                <MainTitleC style={{fontSize: '18px'}}>
                    <div>사용자 등록</div>

                    <WhiteCloseBtn onClick={modalOFF} src="/svg/white_btn_close.svg"/>
                </MainTitleC>
                <form onSubmit={handleSubmit}>
                    <ModalContainerSubC width={1400}>
                        {' '}
                        <OnePageFlexSubContainer>
                            <Left>
                                <h1>회원정보</h1>
                                <Bar/>
                                <FlexPart>
                                    <FlexTitle>
                                        아이디<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="id"/>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        비밀번호<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput type="password"/>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle name="">
                                        비밀번호 확인<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="password" type="password"/>
                                    </FlexContent>
                                </FlexPart>
                                <FlexPart>
                                    <FlexTitle>
                                        경매 담당자 정보<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <CustomInput name="memberName" placeholder=" 성함 입력" width={188}/>
                                        <CustomInput name="memberTitle" placeholder="직함 입력" width={130}
                                                     style={{marginLeft: '5px'}}/>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        이메일<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="memberEmail"/>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        휴대폰 번호<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="memberPhone"/>
                                    </FlexContent>
                                </FlexPart>
                                <FlexPart>
                                    <FlexTitle>
                                        승인 여부<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '60px',
                                            }}
                                        >
                                            <RadioButton
                                                selection={checkRadioButtonSelection}
                                                radioButtonLabels={radioDummy2}
                                                style={{display: 'flex', paddingLeft: '5px'}}
                                            />
                                        </div>
                                    </FlexContent>
                                </FlexPart>
                                <FlexPart>
                                    <FlexTitle>
                                        회원 제한<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '20px',
                                                minWidth: '450px',
                                            }}
                                        >
                                            {radioDummy3.map((text, index) => (
                                                <RadioMainDiv key={index}>
                                                    <RadioCircleDiv
                                                        name="type"
                                                        isChecked={checkRadio3[index]}
                                                        onClick={() => {
                                                            setCheckRadio3(CheckBox(checkRadio3, checkRadio3.length, index))
                                                        }}
                                                    >
                                                        <RadioInnerCircleDiv isChecked={checkRadio3[index]}/>
                                                    </RadioCircleDiv>
                                                    <div style={{display: 'flex', marginLeft: '5px'}}>{text}</div>
                                                </RadioMainDiv>
                                            ))}
                                        </div>
                                    </FlexContent>
                                </FlexPart>
                                <FlexPart>
                                    <FlexTitle>
                                        사용자 구분<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '20px',
                                                minWidth: '450px',
                                            }}
                                        >
                                            {radioDummy4.map((text, index) => (
                                                <RadioMainDiv key={index}>
                                                    <RadioCircleDiv
                                                        name="type"
                                                        isChecked={checkRadio4[index]}
                                                        onClick={() => {
                                                            setCheckRadio4(CheckBox(checkRadio4, checkRadio4.length, index))
                                                        }}
                                                    >
                                                        <RadioInnerCircleDiv isChecked={checkRadio4[index]}/>
                                                    </RadioCircleDiv>
                                                    <div style={{display: 'flex', marginLeft: '5px'}}>{text}</div>
                                                </RadioMainDiv>
                                            ))}
                                        </div>
                                    </FlexContent>
                                </FlexPart>
                                {
                                    checkRadio4[1] && (
                                        <FlexPart>
                                            <FlexTitle>
                                                운송사 이름<span>*</span>
                                            </FlexTitle>
                                            <FlexContent>
                                                <FlexInput name="transportName"/>
                                            </FlexContent>
                                        </FlexPart>
                                    )
                                }
                                {
                                    checkRadio4[0] && (
                                        <FlexPart>
                                            <FlexTitle>
                                                창고 구분<span>*</span>
                                            </FlexTitle>
                                            <FlexContent>
                                                <MainSelect
                                                    options={storageList}
                                                    defaultValue={''}
                                                    name="storage"
                                                    onChange={(e) => {
                                                        setSelected((p) => ({...p, storage: e.label, storageUid: e.value}))
                                                    }}
                                                />
                                            </FlexContent>
                                        </FlexPart>
                                    )
                                }
                                {
                                    checkRadio4[3] && (
                                        <FlexPart style={{alignItems: 'start'}}>
                                            <FlexTitle style={{minWidth: '170px'}}>권한 설정</FlexTitle>
                                            <FlexContent2>
                                                {checkDummy2.map((x, index) => (
                                                    <UserCheckDiv style={{width: '130px'}}>
                                                        <StyledCheckSubSquDiv
                                                            name="managerRoleList"
                                                            onClick={() => setCheck2(CheckBox(check2, check2.length, index, true))}
                                                            isChecked={check2[index]}
                                                        >
                                                            <CheckImg2 src="/svg/check.svg" isChecked={check2[index]}/>
                                                        </StyledCheckSubSquDiv>
                                                        <CheckTxt2 style={{marginLeft: '5px'}}>{x}</CheckTxt2>
                                                    </UserCheckDiv>
                                                ))}
                                            </FlexContent2>
                                        </FlexPart>
                                    )
                                }

                                <Bar/>

                                <FlexPart>
                                    <FlexTitle>
                                        입금 담당자 정보<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <CustomInput name="depositManagerName" placeholder=" 성함 입력" width={188}/>
                                        <CustomInput
                                            name="depositManagerTitle"
                                            placeholder="직함 입력"
                                            width={130}
                                            style={{marginLeft: '5px'}}
                                        />
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        휴대폰 번호<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="depositManagerPhone" placeholder="연락처 입력 ('-' 제외)"/>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        출고 담당자 정보<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <CustomInput name="releaseManagerName" placeholder=" 성함 입력" width={188}/>
                                        <CustomInput
                                            name="releaseManagerTitle"
                                            placeholder="직함 입력"
                                            width={130}
                                            style={{marginLeft: '5px'}}
                                        />
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        휴대폰 번호<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="releaseManagerPhone" placeholder="연락처 입력 ('-' 제외)"/>
                                    </FlexContent>
                                </FlexPart>

                                {/* <FlexPart>
                  <FlexTitle>담당자 추가</FlexTitle>
                  <FlexContent>
                    <AddBtn>추가하기</AddBtn>
                  </FlexContent>
                </FlexPart> */}
                                <FlexPart>
                                    {/* <FlexContent>
                  <FlexInput name="releaseManagerPhone" placeholder="연락처 입력 ('-' 제외)" />
                </FlexContent> */}
                                </FlexPart>
                            </Left>
                            {/* -------------------------------------------------------------- */}
                            <Right>
                                <h1>비즈니스 정보</h1>
                                <Bar/>
                                <FlexPart>
                                    <FlexTitle>
                                        사업자 구분<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '80px',
                                                width: '100%',
                                            }}
                                        >
                                            {radioDummy.map((text, index) => (
                                                <RadioMainDiv key={index}>
                                                    <RadioCircleDiv
                                                        name="type"
                                                        isChecked={checkRadio[index]}
                                                        onClick={() => {
                                                            setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                                                        }}
                                                    >
                                                        <RadioInnerCircleDiv isChecked={checkRadio[index]}/>
                                                    </RadioCircleDiv>
                                                    <div style={{display: 'flex', marginLeft: '5px'}}>{text}</div>
                                                </RadioMainDiv>
                                            ))}
                                        </div>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        회사 명<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="name"/>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        대표자 성명<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="ceoName"/>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        대표 연락처<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="phone"/>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        팩스번호<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="fax"/>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart style={{marginBottom: '5px'}}>
                                    <FlexTitle>
                                        주소<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <CustomInput name="address" width={223} value={address}/>
                                        <CheckBtn
                                            type="button"
                                            style={{
                                                backgroundColor: 'black',
                                                color: 'white',
                                                fontSize: '16px',
                                            }}
                                            onClick={openModal}
                                        >
                                            찾기
                                        </CheckBtn>
                                    </FlexContent>
                                </FlexPart>
                                <FlexPart>
                                    <FlexTitle></FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="addressDetail" value={detailAddress}/>
                                    </FlexContent>
                                </FlexPart>

                                {modalIsOpen && (
                                    <SignUpPost
                                        postCheck={postCheck}
                                        directCheck={directCheck}
                                        postFind={postFind}
                                        address={address}
                                        daumPostHandleBtn={daumPostHandleBtn}
                                        detailAddress={detailAddress}
                                        setDetailAddress={setDetailAddress}
                                        detailAddressHandler={detailAddressHandler}
                                        comfirmPost={comfirmPost}
                                        closeModal={closeModal}
                                        isDaumPostOpen={isDaumPostOpen}
                                        daumPosthandleClose={daumPosthandleClose}
                                        daumPostHandleComplete={daumPostHandleComplete}
                                    />
                                )}

                                <FlexPart>
                                    <FlexTitle>
                                        업태 선택<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '120px',
                                                width: '100%',
                                            }}
                                        >
                                            {checkDummy.map((x, index) => (
                                                <StyledCheckMainDiv>
                                                    <StyledCheckSubSquDiv
                                                        name="businessType"
                                                        onClick={() => setCheck(CheckBox(check, check.length, index, true))}
                                                        isChecked={check[index]}
                                                    >
                                                        <CheckImg2 src="/svg/check.svg" isChecked={check[index]}/>
                                                    </StyledCheckSubSquDiv>
                                                    <p>{x}</p>
                                                </StyledCheckMainDiv>
                                            ))}
                                        </div>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart>
                                    <FlexTitle>
                                        사업자 번호<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        {/* input데이터 넣기 value={resData && resData.customer.businessNumber} */}
                                        <CustomInput name="businessNumber" width={223} onChange={handleCheck}/>
                                        <CheckBtn style={{fontSize: '16px'}} type="button" onClick={checkBusiness}>
                                            중복확인
                                        </CheckBtn>
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart style={{marginBottom: '5px'}}>
                                    <FlexTitle>
                                        사업자등록증<span>*</span>
                                    </FlexTitle>

                                    <TxtDivNoborder className="no-border" style={{border: '1px solid #000000'}}>
                                        <label htmlFor="ex_file">
                                            <div className="btnStart">
                                                <img src="/svg/Upload.svg" alt="btnStart"/>
                                                <p htmlFor="ex_file">파일 첨부</p>
                                            </div>
                                        </label>
                                        {/* <img src="/svg/Upload.svg" alt="Upload" /> */}
                                        <input
                                            id="ex_file"
                                            type="file"
                                            accept="image/jpg, image/png, image/jpeg"
                                            style={{display: 'none'}}
                                            onChange={handleFiles}
                                            name="businessNumberFile"
                                            // onChange={commonChange}
                                            // name="businessfile"
                                        ></input>
                                    </TxtDivNoborder>
                                </FlexPart>
                                <FlexPart>
                                    <FlexTitle></FlexTitle>
                                    <FlexContent>
                                        {renderFileName.businessNumberFile ? (
                                            <IncomeImgDiv>
                                                <div>{renderFileName.businessNumberFile}</div>
                                                <div>
                                                    <IIDImg
                                                        onClick={() => {
                                                            setRenderFileName({
                                                                ...renderFileName,
                                                                businessNumberFile: '',
                                                            })
                                                        }}
                                                        src="/svg/btn_close.svg"
                                                    />
                                                </div>
                                            </IncomeImgDiv>
                                        ) : (
                                            <FlexInput style={{width: '322px'}} disabled/>
                                        )}
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart style={{marginBottom: '5px'}}>
                                    <FlexTitle>
                                        통장사본<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <TxtDivNoborder className="no-border" style={{border: '1px solid #000000'}}>
                                            <label htmlFor="ex_file2">
                                                <div className="btnStart">
                                                    <img src="/svg/Upload.svg" alt="btnStart"/>
                                                    <p htmlFor="ex_file">파일 첨부</p>
                                                </div>
                                            </label>
                                            {/* <img src="/svg/Upload.svg" alt="Upload" /> */}
                                            <input
                                                id="ex_file2"
                                                type="file"
                                                accept="image/jpg, image/png, image/jpeg"
                                                style={{display: 'none'}}
                                                onChange={handleFiles}
                                                name="bankbookFile"
                                            ></input>
                                        </TxtDivNoborder>
                                    </FlexContent>
                                </FlexPart>
                                <FlexPart>
                                    <FlexTitle></FlexTitle>

                                    <FlexContent>
                                        {renderFileName.bankbookFile ? (
                                            <IncomeImgDiv>
                                                <div>{renderFileName.bankbookFile}</div>
                                                <div>
                                                    <IIDImg
                                                        onClick={() => {
                                                            setRenderFileName({
                                                                ...renderFileName,
                                                                bankbookFile: '',
                                                            })
                                                        }}
                                                        src="/svg/btn_close.svg"
                                                    />
                                                </div>
                                            </IncomeImgDiv>
                                        ) : (
                                            <FlexInput style={{width: '322px'}} disabled/>
                                        )}
                                    </FlexContent>
                                </FlexPart>

                                <FlexPart style={{marginBottom: '5px'}}>
                                    <FlexTitle>
                                        계좌번호<span>*</span>
                                    </FlexTitle>
                                    <FlexContent>
                                        <AccountSelect
                                            name="bank"
                                            options={accountOptions}
                                            defaultValue={accountOptions[0]}
                                            onChange={(selectedOption) => handleSelectChange(selectedOption, 'bank')}
                                        />
                                    </FlexContent>
                                </FlexPart>
                                <FlexPart>
                                    <FlexTitle></FlexTitle>
                                    <FlexContent>
                                        <FlexInput name="accountNumber" style={{width: '320px'}}/>
                                    </FlexContent>
                                </FlexPart>
                            </Right>
                        </OnePageFlexSubContainer>
                    </ModalContainerSubC>
                    <BtnWrap style={{height: '60px'}}>
                        {/* <WhiteBtn width={40} height={40}>
            돌아가기
          </WhiteBtn> */}
                        <BlackBtn width={40} height={40} type="submit">
                            저장
                        </BlackBtn>
                    </BtnWrap>
                </form>
                {/* </OnePageFlexContainerC> */}
                {/* </ModalSubContainer> */}
            </ModalContainerC>
        </div>
    )
}

export default UserPost

export const RadioContainer = styled.div`
  width: max-content;
  display: flex;
  gap: 20px;
  margin-left: 5px;
  margin-top: 10px;
`

export const CheckWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
`

export const CheckTxt = styled.div`
  min-width: 100px;
  height: 200px;
`

export const UserCheckDiv = styled.div`
  display: flex;
  width: 150px;
  height: 30px;
`

const CheckContainer = styled.div`
  width: 93%;
  margin-left: auto;
  margin-right: auto;
`
