import React from 'react'

export default function RecommendCellRenderer(data, value) {
  return <div>{data.data['추천 제품 여부'] ? '추천' : '일반'}</div>
}
