import { IControl, Evented, Map } from "maplibre-gl";

export class ChangeStyleControl extends Evented implements IControl {
  _map: Map;
  _controlContainer: HTMLElement;
  _fullscreen: boolean;
  _fullscreenchange: string;
  _fullscreenButton: HTMLButtonElement;
  _container: HTMLElement;
  _prevCooperativeGesturesEnabled: boolean;

  onAdd(map: Map): HTMLElement {
    this._map = map;
    if (!this._container) this._container = this._map.getContainer();
    this._controlContainer = DOM.create('div', 'maplibregl-ctrl maplibregl-ctrl-group');
    this._setupUI();
    return this._controlContainer;
  }

  onRemove() {
    DOM.remove(this._controlContainer);
    this._map = null;
    window.document.removeEventListener(this._fullscreenchange, this._onFullscreenChange);
  }

  _setupUI() {
    const button = this._fullscreenButton = DOM.create('button', (('maplibregl-ctrl-fullscreen')), this._controlContainer);
    DOM.create('span', 'maplibregl-ctrl-icon', button).setAttribute('aria-hidden', 'true');
    button.type = 'button';
    this._updateTitle();
    this._fullscreenButton.addEventListener('click', this._onClickFullscreen);
    window.document.addEventListener(this._fullscreenchange, this._onFullscreenChange);
  }

  _updateTitle() {
    const title = this._getTitle();
    this._fullscreenButton.setAttribute('aria-label', title);
    this._fullscreenButton.title = title;
  }

  _getTitle() {
    return this._map._getUIString(this._isFullscreen() ? 'FullscreenControl.Exit' : 'FullscreenControl.Enter');
  }

  _isFullscreen() {
    return this._fullscreen;
  }

  _onFullscreenChange = () => {
    let fullscreenElement =
      window.document.fullscreenElement ||
      (window.document as any).mozFullScreenElement ||
      (window.document as any).webkitFullscreenElement ||
      (window.document as any).msFullscreenElement;

    while (fullscreenElement?.shadowRoot?.fullscreenElement) {
      fullscreenElement = fullscreenElement.shadowRoot.fullscreenElement;
    }

    if ((fullscreenElement === this._container) !== this._fullscreen) {
      this._handleFullscreenChange();
    }
  };

  _handleFullscreenChange() {
    this._fullscreen = !this._fullscreen;
    this._fullscreenButton.classList.toggle('maplibregl-ctrl-shrink');
    this._fullscreenButton.classList.toggle('maplibregl-ctrl-fullscreen');
    this._updateTitle();

    if (this._fullscreen) {
      this.fire(new Event('fullscreenstart'));
      this._prevCooperativeGesturesEnabled = this._map.cooperativeGestures.isEnabled();
      this._map.cooperativeGestures.disable();
    } else {
      this.fire(new Event('fullscreenend'));
      if (this._prevCooperativeGesturesEnabled) {
        this._map.cooperativeGestures.enable();
      }
    }
  }

  _onClickFullscreen = () => {
    if (this._isFullscreen()) {
      this._exitFullscreen();
    } else {
      this._requestFullscreen();
    }
  };

  _exitFullscreen() {
    if (window.document.exitFullscreen) {
      (window.document as any).exitFullscreen();
    } else if ((window.document as any).mozCancelFullScreen) {
      (window.document as any).mozCancelFullScreen();
    } else if ((window.document as any).msExitFullscreen) {
      (window.document as any).msExitFullscreen();
    } else if ((window.document as any).webkitCancelFullScreen) {
      (window.document as any).webkitCancelFullScreen();
    } else {
      this._togglePseudoFullScreen();
    }
  }

  _requestFullscreen() {
    if (this._container.requestFullscreen) {
      this._container.requestFullscreen();
    } else if ((this._container as any).mozRequestFullScreen) {
      (this._container as any).mozRequestFullScreen();
    } else if ((this._container as any).msRequestFullscreen) {
      (this._container as any).msRequestFullscreen();
    } else if ((this._container as any).webkitRequestFullscreen) {
      (this._container as any).webkitRequestFullscreen();
    } else {
      this._togglePseudoFullScreen();
    }
  }

  _togglePseudoFullScreen() {
    this._container.classList.toggle('maplibregl-pseudo-fullscreen');
    this._handleFullscreenChange();
    this._map.resize();
  }
}