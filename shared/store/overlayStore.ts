import { makeAutoObservable } from 'mobx';

class OverlayStore {
  isAppeared = false;
  onOverlayClick: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAppeared(value: boolean) {
    this.isAppeared = value;
  }

  setOnOverlayClick(handler: (() => void) | null) {
    this.onOverlayClick = handler;
  }
}

export const overlayStore = new OverlayStore();
