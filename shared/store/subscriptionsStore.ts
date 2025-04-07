import { makeAutoObservable } from "mobx";

class SubscriptionsStore {
  subscriptions: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSubscriptions(subscriptions: string[]) {
    this.subscriptions = [...new Set(subscriptions)];
  }

  addSubscription(id: string) {
    if (!this.subscriptions.includes(id)) {
      this.subscriptions = [...this.subscriptions, id];
    }
  }

  removeSubscription(id: string) {
    this.subscriptions = this.subscriptions.filter(
      (subscription) => subscription !== id
    );
  }
}

export const subscriptionStore = new SubscriptionsStore();
