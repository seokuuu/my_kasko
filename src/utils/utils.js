// base64 > file
export function base64toFile(base_data, filename) {
  var arr = base_data.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

/**
 * 사진 가로세로 크기 확인
 */
export const getFileWidth = file => {
  const img = new Image();
  let _URL = window.URL || window.webkitURL;
  img.src = _URL.createObjectURL(file);
  return new Promise(
    resolve =>
      (img.onload = function () {
        resolve({ w: this.width, h: this.height });
      })
  );
};