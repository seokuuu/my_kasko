import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  OnePageContainer,
  OnePageSubContainer,
  MainTitle,
  HalfWrap,
  Left,
  Right,
  Title,
  Part,
  At,
  Titles,
  TitleChild,
  FullWrap,
  FWTitle,
} from '../../../common/OnePage/OnePage.Styled'
import { formatDateString } from '../../../utils/utils'
import { titles } from './termsConstants'

const Terms = ({ onPolicySelect, policy }) => {
  const [policyDetails, setPolicyDetails] = useState(null)
  const [selectedPolicy, setSelectedPolicy] = useState(null)

  useEffect(() => {
    if (!!policy) {
      setPolicyDetails(policy)
      setSelectedPolicy(policy.type)
    }
  }, [policy])

  const handleTitleClick = (title) => {
    onPolicySelect(title)
    setSelectedPolicy(title)
  }

  return (
    <OnePageContainer style={{ width: '55%' }}>
      <Titles style={{ width: '90%' }}>
        {titles.map((title, index) => (
          <TitleChild key={index} active={title === selectedPolicy} onClick={() => handleTitleClick(title)}>
            {title}
          </TitleChild>
        ))}
      </Titles>
      <OnePageSubContainer>
        <FWTitle>
          <h5>서비스 이용약관</h5>
          <h6>최근 수정일 : {policyDetails && formatDateString(policyDetails.updateDate)}</h6>
        </FWTitle>
        <FullWrap style={{ marginTop: '30px', height: '30vw' }}>
          <textarea readOnly value={policyDetails?.content} />
        </FullWrap>
      </OnePageSubContainer>
    </OnePageContainer>
  )
}

Terms.propTypes = {
  policy: PropTypes.shape({
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    uid: PropTypes.number,
    updateDate: PropTypes.string.isRequired,
  }),
}

export default Terms
