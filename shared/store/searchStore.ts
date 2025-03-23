import { makeAutoObservable, reaction } from "mobx";

import { SEARCH_QUERY_LENGTH } from "@/constants";

class SearchStore {
  userInput: string = "";
  debouncedUserInput: string = "";
  isOpened: boolean = false;
  private debounceTimer: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    reaction(
      () => this.userInput,
      (input) => {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => {
          if (input.length > SEARCH_QUERY_LENGTH) {
            this.setDebouncedUserInput(input);
          }
          this.debounceTimer = null;
        }, 500);
      }
    );
    reaction(
      () => this.userInput.length > SEARCH_QUERY_LENGTH,
      (shouldOpen) => {
        this.isOpened = shouldOpen;
      }
    );
  }

  setUserInput(newInput: string) {
    this.userInput = newInput;
  }

  setIsOpened(value: boolean) {
    this.isOpened = value;
  }

  setDebouncedUserInput(input: string) {
    this.debouncedUserInput = input;
  }
}

export const searchStore = new SearchStore();
