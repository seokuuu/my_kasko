import './customTableHeader.css';

function getAbsolutePositionCssWithRight(right=0) {
  return `position: absolute; top: 0; right: ${right || 0}px;`
}

export const BTN = {
  sortUp: 'customSortUpLabel',
  sortDown: 'customSortDownLabe',
  pin: 'customPinLabel',
  menu: 'customHeaderMenuButton',
  activeClass: 'active',
  inactiveClass: 'inactive'
}

const SORT_STATUS = {
  up: 'up',
  down: 'down',
  reset: 'reset'
}

const cssClassName = (name) => `.${name}`;

const isActivated = (targetEl) => targetEl.classList.contains(BTN.activeClass);

/**
 * @todo 구현
 * 1. 컬럼에 hover를 하였을 때 메뉴가 노출된다.
 * 2. acitve 클래스를 가진 메뉴는 기본 노출된다.
 * 3. 소팅은 up, down 만 있다.
 * 4. 소팅 기능이 동작한다.
 * 5. 핀 기능이 동작한다.
 */
class CustomTableHeader {
  agApi;
  agParams;
  eGui;
  // BTNS
  eMenuButton;
  eSortDownButton;
  eSortUpButton;
  ePinButton;
  // LISTENER
  onMenuClickListener;
  onSortAscRequestedListener;
  onSortDescRequestedListener;
  onRemoveSortListener;
  onSortChangedListener;
  onPinClickListener;
  // VARS
  sortStatus;

  init(agParams) {
    // RENDER
    this.renderElement(agParams);
    // TOGGLE FUNCTION
    this.toggleMenuFunction();
    this.toggleSortFunction();
    this.togglePinFunction();
  }


  // RENDER
  renderElement(agParams) {
    this.agParams = agParams;
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
        <div class="customHeaderWrapper">
          <div class="customHeaderLabel">${this.agParams.displayName}</div>
          <div class="${BTN.sortUp} ${BTN.inactiveClass}" style="${getAbsolutePositionCssWithRight(50)}">
              <i class="fa fa-long-arrow-alt-up"></i>
          </div>
          <div class="${BTN.sortDown} ${BTN.inactiveClass}" style="${getAbsolutePositionCssWithRight(40)}">
              <i class="fa fa-long-arrow-alt-down"></i>
          </div>
          <div class="${BTN.pin} ${BTN.inactiveClass}" style="${getAbsolutePositionCssWithRight(30)}">
          <i class="fa-solid fa-thumbtack"></i>
          </div>
          <div class="${BTN.menu}" style="${getAbsolutePositionCssWithRight(0)}">
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      `;

    this.eSortUpButton = this.eGui.querySelector(cssClassName(BTN.sortUp));
    this.eSortDownButton = this.eGui.querySelector(cssClassName(BTN.sortDown));
    this.ePinButton = this.eGui.querySelector(cssClassName(BTN.pin));
    this.eMenuButton = this.eGui.querySelector(cssClassName(BTN.menu));
  }

  // ADD MENU FUNC
  toggleMenuFunction() {
    if (this.agParams.enableMenu) {
      // menu register
      this.onMenuClickListener = this.onMenuClick.bind(this);
      // sort event handler
      this.eMenuButton.addEventListener('click', this.onMenuClickListener);
    } else {
      this.eMenuButton.remove();
    }
  }

  // ADD SORT FUNC
  toggleSortFunction() {
    if (this.agParams.enableSorting) {
      // sort event register
      this.onSortAscRequestedListener = this.onSortRequested.bind(this, 'asc');
      this.onSortDescRequestedListener = this.onSortRequested.bind( this,'desc');
      this.onRemoveSortListener = this.onSortRequested.bind(this, null);
      this.onSortChangedListener = this.onSortChanged.bind(this);
  
      // sort event handler
      this.eSortDownButton.addEventListener('click', e => this.onSortStatusChange(e, SORT_STATUS.down));
      this.eSortUpButton.addEventListener('click', e => this.onSortStatusChange(e, SORT_STATUS.up));
      this.agParams.column.addEventListener('sortChanged',this.onSortChangedListener);
      this.onSortChanged();
    } else {
      this.eSortUpButton.remove();
      this.eSortDownButton.remove();
    }
  }

  // ADD PIN FUNC
  togglePinFunction(agParams) {
    this.onPinClickListener = (e) => {
      console.log(this, e, agParams);
    }
    this.ePinButton.addEventListener('click', this.onPinClickListener);
  }
  

  // SORT CHANGE FN HELPER
  onSortStatusChange(e, sortStatus) {
    console.log(e, sortStatus);
    if(sortStatus === this.sortStatus) {
      this.onRemoveSortListener(e);
      this.sortStatus = SORT_STATUS.reset;
    } 
    else if(sortStatus === SORT_STATUS.down) {
      this.onSortAscRequestedListener(e);
      this.sortStatus = SORT_STATUS.down;
    } 
    else if(sortStatus === SORT_STATUS.up) {
      this.onSortDescRequestedListener(e);
      this.sortStatus = SORT_STATUS.up
    }
  }

  // SORT CHANGE HANDLER
  onSortChanged() {
    const deactivate = (toDeactivateItems) => {
      toDeactivateItems.forEach((toDeactivate) => {
        if(toDeactivate) {
          toDeactivate.className = toDeactivate.className.split(' ')[0];
        }
      });
    };

    const activate = (toActivate) => {
      if(toActivate) {
        toActivate.className = toActivate.className + ` ${BTN.activeClass}`;
      }
    };

    if (this.agParams.column.isSortAscending()) {
      deactivate([this.eSortUpButton]);
      activate(this.eSortDownButton);
    } else if (this.agParams.column.isSortDescending()) {
      deactivate([this.eSortDownButton]);
      activate(this.eSortUpButton);
    } else {
      deactivate([this.eSortUpButton, this.eSortDownButton]);
    }
  }

  getGui() {
    return this.eGui;
  }

  onMenuClick() {
    this.agParams.showColumnMenu(this.eMenuButton);
  }

  onSortRequested(order, event) {
    this.agParams.setSort(order, event.shiftKey);
  }

  destroy() {
    if (this.onMenuClickListener) {
      this.eMenuButton.removeEventListener('click', this.onMenuClickListener);
    }

    this.eSortDownButton.removeEventListener('click', this.onSortAscRequestedListener);
    this.eSortUpButton.removeEventListener('click', this.onSortDescRequestedListener);
    this.ePinButton.remove('click', this.onPinClickListener);
    this.agParams.column.removeEventListener('sortChanged', this.onSortChangedListener);
  }
}

export default CustomTableHeader