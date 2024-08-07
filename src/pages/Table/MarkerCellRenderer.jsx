// prettier-ignore
// 관심상품 아이콘 (STAR)
const wishIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M9.53415 2.02647C9.69975 1.60223 10.3001 1.60223 10.4657 2.02648L12.2109 6.49746C12.282 6.67951 12.4526 6.80347 12.6477 6.8148L17.4392 7.09301C17.8938 7.11941 18.0794 7.69036 17.727 7.97896L14.0142 11.0204C13.863 11.1442 13.7978 11.3448 13.8474 11.5339L15.0634 16.1768C15.1788 16.6174 14.6931 16.9702 14.3098 16.7243L10.2699 14.1331C10.1054 14.0276 9.89447 14.0276 9.72997 14.1331L5.69006 16.7243C5.30672 16.9702 4.82104 16.6174 4.93643 16.1768L6.15248 11.5339C6.20199 11.3448 6.13682 11.1442 5.98564 11.0204L2.27279 7.97896C1.92048 7.69036 2.106 7.11941 2.56065 7.09301L7.35212 6.8148C7.54722 6.80347 7.71784 6.67951 7.78891 6.49746L9.53415 2.02647Z" fill="#008859"/>
  </svg>
`;

// prettier-ignore
// 베스트 상품 아이콘
const bestIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M10.9652 2.06877C11.5811 1.61713 12.4189 1.61713 13.0348 2.06877L14.5423 3.17413C14.8877 3.4274 15.2982 3.57682 15.7256 3.60483L17.591 3.72707C18.3531 3.77702 18.9948 4.31549 19.1764 5.05739L19.6207 6.87316C19.7225 7.2892 19.9409 7.66754 20.2503 7.96372L21.6007 9.25638C22.1524 9.78454 22.2979 10.6095 21.9601 11.2945L21.1332 12.9711C20.9438 13.3552 20.8679 13.7855 20.9146 14.2112L21.1181 16.0695C21.2013 16.8287 20.7824 17.5542 20.0833 17.8618L18.3723 18.6146C17.9802 18.7871 17.6456 19.0679 17.4076 19.4241L16.3691 20.9784C15.9447 21.6135 15.1576 21.9 14.4243 21.6862L12.6296 21.1631C12.2184 21.0433 11.7816 21.0433 11.3704 21.1631L9.57571 21.6862C8.84244 21.9 8.05525 21.6135 7.63092 20.9784L6.59238 19.4241C6.35443 19.0679 6.01977 18.7871 5.62773 18.6146L3.9167 17.8618C3.21759 17.5542 2.79874 16.8287 2.8819 16.0695L3.08542 14.2112C3.13205 13.7855 3.05619 13.3552 2.86675 12.9711L2.03995 11.2945C1.70213 10.6095 1.8476 9.78454 2.39933 9.25638L3.74969 7.96372C4.05909 7.66754 4.27752 7.2892 4.37932 6.87316L4.82362 5.05739C5.00516 4.31549 5.64688 3.77702 6.40903 3.72707L8.27437 3.60483C8.70176 3.57682 9.11228 3.4274 9.45769 3.17413L10.9652 2.06877Z" fill="url(#paint0_linear_7635_207916)" stroke="url(#paint1_linear_7635_207916)" stroke-width="0.5"/>
  <path d="M19.0303 12.4582L19.703 12.7899L19.0303 12.4582C18.7988 12.9277 18.7061 13.4536 18.7631 13.9739L18.889 15.1239C18.9484 15.6662 18.6492 16.1844 18.1499 16.4041L17.091 16.87L17.3931 17.5565L17.091 16.87C16.6119 17.0809 16.2028 17.4241 15.912 17.8593L15.2693 18.8212C14.9662 19.2748 14.4039 19.4795 13.8802 19.3268L12.7696 19.0031C12.267 18.8566 11.733 18.8566 11.2305 19.0031L10.1198 19.3268C9.59607 19.4795 9.03379 19.2748 8.7307 18.8212L8.08801 17.8593C7.79717 17.4241 7.38814 17.0809 6.90899 16.87L5.85012 16.4041C5.35076 16.1844 5.05158 15.6662 5.11098 15.1239L5.23693 13.9739C5.29392 13.4536 5.2012 12.9277 4.96966 12.4582L4.458 11.4207C4.2167 10.9314 4.32061 10.3421 4.7147 9.96486L5.55036 9.1649C5.92852 8.8029 6.19549 8.34049 6.31991 7.832L6.59487 6.70832C6.72454 6.17839 7.18291 5.79377 7.7273 5.75809L8.88166 5.68244C9.40403 5.64821 9.90578 5.46559 10.3279 5.15604L11.2609 4.47199C11.7008 4.14939 12.2992 4.14939 12.7391 4.47199L13.6721 5.15604C14.0942 5.46559 14.596 5.64821 15.1183 5.68244L16.2727 5.75809C16.8171 5.79377 17.2755 6.17839 17.4051 6.70832L17.6801 7.832C17.8045 8.34049 18.0715 8.8029 18.4496 9.1649L19.2853 9.96486C19.6794 10.3421 19.7833 10.9314 19.542 11.4207L19.0303 12.4582Z" stroke="url(#paint2_linear_7635_207916)" stroke-width="1.5"/>
  <path d="M7.376 12.264C7.70667 12.264 7.97333 12.1546 8.176 11.936C8.37867 11.7173 8.48 11.4293 8.48 11.072C8.48 10.72 8.37867 10.4346 8.176 10.216C7.97333 9.9973 7.70667 9.88796 7.376 9.88796H5.824L5.832 12.264H7.376ZM5 9.16796H7.4C7.768 9.16796 8.096 9.24796 8.384 9.40796C8.672 9.56796 8.896 9.79463 9.056 10.088C9.216 10.376 9.296 10.704 9.296 11.072C9.296 11.4453 9.216 11.776 9.056 12.064C8.896 12.352 8.672 12.5786 8.384 12.744C8.096 12.904 7.768 12.984 7.4 12.984H5.832V15.056H5V9.16796Z" fill="#E08700"/>
  <path d="M10.8791 10.896V15.056H10.0471V10.896H10.8791ZM9.98306 9.53596C9.98306 9.3973 10.0284 9.2853 10.1191 9.19997C10.2097 9.1093 10.3244 9.06396 10.4631 9.06396C10.5964 9.06396 10.7057 9.1093 10.7911 9.19997C10.8817 9.2853 10.9271 9.3973 10.9271 9.53596C10.9271 9.67463 10.8817 9.7893 10.7911 9.87996C10.7057 9.9653 10.5964 10.008 10.4631 10.008C10.3244 10.008 10.2097 9.9653 10.1191 9.87996C10.0284 9.7893 9.98306 9.67463 9.98306 9.53596Z" fill="#E08700"/>
  <path d="M13.7198 14.304C13.8851 14.304 14.0585 14.2666 14.2398 14.192C14.4211 14.112 14.5731 14.0106 14.6958 13.888L15.2558 14.448C15.0745 14.6346 14.8425 14.7893 14.5598 14.912C14.2771 15.0293 14.0078 15.088 13.7518 15.088C13.3411 15.088 12.9758 15 12.6558 14.824C12.3358 14.6426 12.0851 14.392 11.9038 14.072C11.7225 13.752 11.6318 13.3866 11.6318 12.976C11.6318 12.5653 11.7225 12.2 11.9038 11.88C12.0851 11.56 12.3358 11.312 12.6558 11.136C12.9758 10.9546 13.3411 10.864 13.7518 10.864C14.0238 10.864 14.2931 10.9226 14.5598 11.04C14.8318 11.1573 15.0638 11.312 15.2558 11.504L14.6958 12.064C14.5678 11.9413 14.4131 11.8426 14.2318 11.768C14.0558 11.688 13.8851 11.648 13.7198 11.648C13.3465 11.648 13.0425 11.7706 12.8078 12.016C12.5785 12.2613 12.4638 12.5813 12.4638 12.976C12.4638 13.3706 12.5785 13.6906 12.8078 13.936C13.0425 14.1813 13.3465 14.304 13.7198 14.304Z" fill="#E08700"/>
  <path d="M16.7691 12.76L18.3931 10.872H19.5131L17.8891 12.736L19.4971 15.056H18.4891L17.2971 13.344L16.7691 13.976V15.056H15.9371V9.16796H16.7691V12.76Z" fill="#E08700"/>
  <defs>
    <linearGradient id="paint0_linear_7635_207916" x1="12" y1="1" x2="12" y2="23" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFBC39"/>
      <stop offset="0.37996" stop-color="#FFCE6D"/>
      <stop offset="0.500975" stop-color="#FFDB95"/>
      <stop offset="0.62199" stop-color="#FFCE6D"/>
      <stop offset="1" stop-color="#DA9000"/>
    </linearGradient>
    <linearGradient id="paint1_linear_7635_207916" x1="4" y1="2.5" x2="21" y2="19.5" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E1A93B"/>
      <stop offset="0.285998" stop-color="#FCBF46"/>
      <stop offset="0.462536" stop-color="#FFE2AA"/>
      <stop offset="0.618567" stop-color="#FCBF46"/>
      <stop offset="1" stop-color="#E1A93B"/>
    </linearGradient>
    <linearGradient id="paint2_linear_7635_207916" x1="6.5" y1="6.5" x2="19" y2="18" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFF4DE"/>
      <stop offset="0.484375" stop-color="white"/>
      <stop offset="0.976512" stop-color="#FFF4DE"/>
    </linearGradient>
  </defs>
</svg>
`;

/**
 * 텍스트 태그 반환
 * @param {boolean} clickable 클릭 여부
 * @param {string} text 텍스트
 * @param isProNo
 * @returns 텍스트 태그
 */
// prettier-ignore
const textTag = (clickable = false, text = '', isProNo = false) => clickable
		? `<button class="text" style="background:transparent;text-decoration:underline;color: #4C83D6;font-weight:500;${ isProNo ? `width: 0;opacity:0;` : '' }">${text}</button>`
		: `<span class="text" style="${isProNo ? `width: 0;opacity:0;` : ''}">${text}</span>`

/**
 * 테이블 마커 Cell Renderer
 * @description
 * - 관심상품 마커 노출
 * - 추천상품 마커 노출
 * - 링크이동 기능
 */
// prettier-ignore
class MarkerCellRenderer {
	eGui;
	eButton;
	cellValue;
	cellWish;
	cellBest;
	clickHandler;
	clickEventListener;
	isProNo;

	init(params) {
		const proNoKey = '프로넘(ProNo)';
		const proNo = params.data[proNoKey];
		const isAdminBiddingPage = ['/auction/biddingsingle', '/auction/biddingpackage'].includes(window.location.pathname)

		this.isProNo = isAdminBiddingPage ? false : !!proNo;
		this.cellValue = params.value;
		this.cellWish = !!proNo ? false : Boolean(params?.wish);
		this.cellBest = !!proNo ? false : !!params.data['추천 제품 여부'] || !!params.data['추천 여부'];
		this.clickHandler = params?.clickHandler;
		this.eGui = document.createElement('div');
		this.renderCell();
	}

	refresh(params) {
		this.cellValue = params.value;
		this.renderCell();
		return true;
	}

	getGui() {
		return this.eGui;
	}

	getValueToDisplay(params) {
		return params.valueFormatted ? params.valueFormatted : params.value;
	}

	destroy() {
		if (this.eButton && this.clickEventListener) {
			this.eButton.removeEventListener('click', this.clickEventListener);
		}
	}

	// 셀 렌더링
	renderCell() {
		const textValue = this.cellValue || '-'; // 셀 텍스트

		this.eGui.innerHTML = `
          <div style='display:flex;align-items:center;justify-content:center;gap:4px;height:34px;position:relative;'>
          	${this.isProNo ? `<div>-</div>` : ''}
            ${this.cellBest ? bestIcon : ''}
            ${this.cellWish ? wishIcon : ''}
            ${textTag(Boolean(this.cellValue && this.clickHandler), textValue, this.isProNo)}
          </div>
    `;

		this.destroy();

		if (this.clickHandler) {
			this.eButton = this.eGui.querySelector('.text');
			this.clickEventListener = () => { this.clickHandler(textValue); }
			this.eButton?.addEventListener('click', this.clickEventListener);
		}
	}
}

export default MarkerCellRenderer
