// 관심상품 아이콘 (STAR)
const wishIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M9.53415 2.02647C9.69975 1.60223 10.3001 1.60223 10.4657 2.02648L12.2109 6.49746C12.282 6.67951 12.4526 6.80347 12.6477 6.8148L17.4392 7.09301C17.8938 7.11941 18.0794 7.69036 17.727 7.97896L14.0142 11.0204C13.863 11.1442 13.7978 11.3448 13.8474 11.5339L15.0634 16.1768C15.1788 16.6174 14.6931 16.9702 14.3098 16.7243L10.2699 14.1331C10.1054 14.0276 9.89447 14.0276 9.72997 14.1331L5.69006 16.7243C5.30672 16.9702 4.82104 16.6174 4.93643 16.1768L6.15248 11.5339C6.20199 11.3448 6.13682 11.1442 5.98564 11.0204L2.27279 7.97896C1.92048 7.69036 2.106 7.11941 2.56065 7.09301L7.35212 6.8148C7.54722 6.80347 7.71784 6.67951 7.78891 6.49746L9.53415 2.02647Z" fill="#008859"/>
  </svg>
`;

const textTag = (clickable = false, text='') => clickable
                                                      ? `<button class="text" style="background:transparent;text-decoration:underline;color: #4C83D6;font-weight:medium;">${text}</button>`
                                                      : `<span class="text">${text}</span>`

/**
 * 관심상품 테이블 Cell Renderer
 */
class WishCellRenderer {
  eGui;
  eButton;
  cellValue;
  clickEventListener;

  init(params) {
    this.cellValue = params.value;
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
    if (this.eButton) {
      this.eButton.removeEventListener('click', this.clickEventListener);
    }
  }

  // custom
  renderCell() {
    const textValue = this.cellValue?.value || '-';
    const wishValue = Boolean(this.cellValue?.wish);
    const clickHandler = this.cellValue?.clickHandler;

    this.eGui.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:center;gap:4px;height:34px;">
            ${textTag(Boolean(this.cellValue?.value && clickHandler), textValue)}
            ${wishValue? wishIcon : ''}
          </div>
    `;

    this.destroy();

    if(clickHandler) {
      this.eButton = this.eGui.querySelector('.text');
      this.clickEventListener = () => { clickHandler(textValue); }
      this.eButton.addEventListener('click', this.clickEventListener);
    }
  }
}

export default WishCellRenderer;