import { client } from '.';

const urls = {
  editorFileUpload: '/test4',
};

/* ==============================
    에디터 사진 업로드
============================== */
export function editorFileUpload(file) {
  const headers = { 'Content-Type': 'multipart/form-data' };
  const formData = new FormData();
  formData.append('uploadFile', file);

  return client.post(urls.editorFileUpload, formData, { headers });
}
