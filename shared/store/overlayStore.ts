import { makeAutoObservable } from "mobx";

import { searchStore } from "./searchStore";

class OverlayStore {
  isAppeared: boolean = false;
  onOverlayClick: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  removeOverlay() {
    this.isAppeared = false;
    this.onOverlayClick = null;
  }

  addOverlay(onClick?: () => void) {
    this.isAppeared = true;
    this.onOverlayClick = onClick || this.removeOverlay;
  }

  addSearchOverlay() {
    this.addOverlay(this.removeSearchOverlay);
    searchStore.setIsOpened(true);
  }

  removeSearchOverlay() {
    this.removeOverlay();
    searchStore.setIsOpened(false);
  }
}

export const overlayStore = new OverlayStore();
