import { useQuery } from '@tanstack/react-query';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useEffect, useMemo, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { client } from '../../api';
import { EditGear, FilterHeaderAlert } from '../../modal/External/ExternalFilter';
import useAlert from '../../store/Alert/useAlert';
import { SCautionBox } from './styles';
import 'draft-js/dist/Draft.css';

/**
 * @constant 쿼리키
 */
const CAUTION_QUERY_KEY = 'caution';

const EDITOR_OPTIONS = {
  toolbar: {
    options: ['inline', 'list', 'colorPicker']
  }
}

/**
 * @constant 주의사항 카테고리
 */
export const CAUTION_CATEGORY = Object.freeze({
  auction: 'auction',
  singleProduct: 'product',
  packageProduct: 'package',
  order: 'order'
});

/**
 * 주의사항
 * @param {boolean} param.editable 편집가능 여부 
 * @param {boolean} param.category 카테고리
 * @returns 
 */
const CautionBox = ({editable, category}) => {

  const [editForm, setEditForm] = useState(EditorState.createEmpty());
  const [editMode, setEditMode] = useState(false);
  const readOnly = useMemo(() => !editable || !editMode, [editMode, editable]);
  const { data: cautionData, refetch: requestData  } = useQuery({
    queryKey: [CAUTION_QUERY_KEY, category],
    queryFn: async() => {
      const {data} = await client.get(`/issue/${category}`);
      return data?.data?.contents || '';
    } 
  });
  // ALERT
  const { simpleAlert } = useAlert();
  // 

  /**
   * 편집 토글 핸들러
   */
  const handleEditToggle = () => {
    if(editMode) {
      handleFormSubmit();
    }
    setEditMode(!editMode);
  };

  /**
   * 편집사항 저장 핸들러
   * @description 주의사항 편집사항을 저장합니다.
   */
  async function handleFormSubmit() {
    const contents = draftToHtml(convertToRaw(editForm.getCurrentContent()));
    try {
      await client.post('issue', {
        category: category,
        contents: contents
      }).then(res => {
        if(res.status === 200) {
          simpleAlert('주의사항을 수정하였습니다.');
          requestData();
        }
      })
    } catch(error) {
      simpleAlert(error?.data?.message || '주의사항 수정에 실패했습니다.\n다시 시도해 주세요.');
    }
  }

  /**
   * 에디터 초기화 함수
   */
  function initEditorForm(savedData) {
    if(savedData) {
      const contentBlocks = htmlToDraft(savedData)
      const contentState = ContentState.createFromBlockArray(contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      setEditForm(editorState);
    } else {
      setEditForm(EditorState.createEmpty());
    }
  }

  // // 편집폼 초기화
  useEffect(() => {
    initEditorForm(cautionData);
  }, [editMode, cautionData]); 

  return (
    <FilterHeaderAlert>
      <SCautionBox.Wrapper>
        {/* 알림 아이콘 */}
        <img src="/img/notice.png" />
        <SCautionBox.Contents>
          {/* 편집 에디터 */}
          <Editor 
            toolbar={EDITOR_OPTIONS.toolbar} 
            toolbarHidden={readOnly}
            placeholder={readOnly? "주의 사항 등록 예정" : "주의사항을 등록해 주세요"}
            localization={{ locale: 'ko' }}
            wrapperClassName={`caution-editor-wrapper${readOnly? '--readonly' : ''}`}
            toolbarClassName='caution-editor-toolbar'
            editorClassName='caution-editor'
            editorState={editForm}
            onEditorStateChange={v => {setEditForm(v)}}
            readOnly={readOnly}
          />
        </SCautionBox.Contents>
      </SCautionBox.Wrapper>
      {/* 편집 버튼 */}
      {
        editable &&
        <SCautionBox.Buttons>
          <EditGear 
            as="button" 
            type="button" 
            onClick={handleEditToggle}
          >
              { editMode? '완료' : '수정' }
              <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
          </EditGear>
          {
            editMode && 
            <EditGear 
              as="button" 
              type="button"
              style={{opacity: 0.5}} 
              onClick={() => {setEditMode(false)}} 
            >취소</EditGear>
          }
        </SCautionBox.Buttons>
      }
    </FilterHeaderAlert>

  )
}

export default CautionBox