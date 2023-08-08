import React from 'react';
import { PageSelect } from '../../modal/External/ExternalFilter';

const PageDropdown = () => {
  return (
    <PageSelect name="pagenation">
      <option value="">50개씩</option>
      <option value="">100개씩</option>
    </PageSelect>
  );
};

export default PageDropdown;
