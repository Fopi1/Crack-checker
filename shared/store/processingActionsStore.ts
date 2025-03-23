import { makeAutoObservable, ObservableMap } from 'mobx';

import type { AddValue } from "@/types/api";

class ProcessingActionsStore {
  private processingActions = new ObservableMap<string, AddValue[]>();

  constructor() {
    makeAutoObservable(this,{},{autoBind:true});
  }

  hasAction(gameId: string, action: AddValue): boolean {
    const actions = this.processingActions.get(gameId);
    return actions ? actions.includes(action) : false;
  }

  addAction(gameId: string, action: AddValue): void {
    const currentActions = this.processingActions.get(gameId) || [];
    this.processingActions.set(gameId, [action, ...currentActions]);
  }

  removeAction(gameId: string, action: AddValue): void {
    const currentActions = this.processingActions.get(gameId);
    if (!currentActions) return;

    const updatedActions = currentActions.filter((a) => a !== action);
    this.processingActions.set(gameId, updatedActions);
  }
}

export const processingActionsStore = new ProcessingActionsStore();
