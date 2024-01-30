import './customTableHeader.css';

function getAbsolutePositionCssWithRight(right=0) {
  return `position: absolute; top: 0; right: ${right || 0}px;`
}

const E_GUI_CSS = 'position: relative; width: 100%; padding:0 50px; text-align: center;'

class CustomTableHeader {
  agParams;
  eGui;
  eMenuButton;
  eSortDownButton;
  eSortUpButton;
  eSortRemoveButton;
  onMenuClickListener;
  onSortAscRequestedListener;
  onSortDescRequestedListener;
  onRemoveSortListener;
  onSortChangedListener;

  init(agParams) {
    this.agParams = agParams;
    this.eGui = document.createElement('div');
    this.eGui.style = E_GUI_CSS;
    this.eGui.innerHTML = `
            <div class="customHeaderMenuButton" style="${getAbsolutePositionCssWithRight(0)}">
              <i class="fa-solid fa-bars"></i>
            </div>
            <div class="customHeaderLabel">${this.agParams.displayName}</div>
            <div class="customSortDownLabel inactive" style="${getAbsolutePositionCssWithRight(30)}">
                <i class="fa fa-long-arrow-alt-down"></i>
            </div>
            <div class="customSortUpLabel inactive" style="${getAbsolutePositionCssWithRight(40)}">
                <i class="fa fa-long-arrow-alt-up"></i>
            </div>
            <div class="customSortRemoveLabel inactive" style="${getAbsolutePositionCssWithRight(20)}">
                <i class="fa fa-times"></i>
            </div>
        `;

    this.eMenuButton = this.eGui.querySelector('.customHeaderMenuButton');
    this.eSortDownButton = this.eGui.querySelector('.customSortDownLabel');
    this.eSortUpButton = this.eGui.querySelector('.customSortUpLabel');
    this.eSortRemoveButton = this.eGui.querySelector('.customSortRemoveLabel');

    if (this.agParams.enableMenu) {
      this.onMenuClickListener = this.onMenuClick.bind(this);
      this.eMenuButton.addEventListener('click', this.onMenuClickListener);
    } else {
      this.eGui.removeChild(this.eMenuButton);
    }

    if (this.agParams.enableSorting) {
      this.onSortAscRequestedListener = this.onSortRequested.bind(this, 'asc');
      this.eSortDownButton.addEventListener(
        'click',
        this.onSortAscRequestedListener
      );
      this.onSortDescRequestedListener = this.onSortRequested.bind(
        this,
        'desc'
      );
      this.eSortUpButton.addEventListener(
        'click',
        this.onSortDescRequestedListener
      );
      this.onRemoveSortListener = this.onSortRequested.bind(this, null);
      this.eSortRemoveButton.addEventListener(
        'click',
        this.onRemoveSortListener
      );

      this.onSortChangedListener = this.onSortChanged.bind(this);
      this.agParams.column.addEventListener(
        'sortChanged',
        this.onSortChangedListener
      );
      this.onSortChanged();
    } else {
      this.eGui.removeChild(this.eSortDownButton);
      this.eGui.removeChild(this.eSortUpButton);
      this.eGui.removeChild(this.eSortRemoveButton);
    }
  }

  onSortChanged() {
    const deactivate = (toDeactivateItems) => {
      toDeactivateItems.forEach((toDeactivate) => {
        toDeactivate.className = toDeactivate.className.split(' ')[0];
      });
    };

    const activate = (toActivate) => {
      toActivate.className = toActivate.className + ' active';
    };

    if (this.agParams.column.isSortAscending()) {
      deactivate([this.eSortUpButton, this.eSortRemoveButton]);
      activate(this.eSortDownButton);
    } else if (this.agParams.column.isSortDescending()) {
      deactivate([this.eSortDownButton, this.eSortRemoveButton]);
      activate(this.eSortUpButton);
    } else {
      deactivate([this.eSortUpButton, this.eSortDownButton]);
      activate(this.eSortRemoveButton);
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
    this.eSortDownButton.removeEventListener(
      'click',
      this.onSortAscRequestedListener
    );
    this.eSortUpButton.removeEventListener(
      'click',
      this.onSortDescRequestedListener
    );
    this.eSortRemoveButton.removeEventListener(
      'click',
      this.onRemoveSortListener
    );
    this.agParams.column.removeEventListener(
      'sortChanged',
      this.onSortChangedListener
    );
  }
}

export default CustomTableHeader