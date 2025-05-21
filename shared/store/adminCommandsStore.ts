import { makeAutoObservable, ObservableMap } from "mobx";

class AdminCommandsStore {
  private data = new ObservableMap<string, string[]>();

  constructor() {
    makeAutoObservable(this);
  }

  hasData(command: string, query: string) {
    const commandData = this.data.get(command);
    return command ? command.includes(query) : false;
  }

  addData(command: string, query: string) {
    const commandData = this.data.get(command) || [];
    this.data.set(command, [...commandData, query]);
  }

  changeData(command: string, query: string) {
    const commandData = this.data.get(command) || [];
    if (this.hasData(command, query)) {
      this.data.set(command, [...commandData, query]);
    }
  }
}

export const adminCommandsStore = new AdminCommandsStore();
