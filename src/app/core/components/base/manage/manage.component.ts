import { Component, signal } from '@angular/core';
import { Switch } from '../../../../shared/utils/switch';

@Component({
  imports: [],
  template: '',
})
export abstract class Manage<T> {
  createPanel = new Switch();
  editPanel = new Switch();
  deletePanel = new Switch();

  currentAction = signal<T | undefined>(undefined);

  setAndOpenCreatePanel() {
    document.body.classList.add("overflow-hidden");
    this.createPanel.open();
  }

  setAndCloseCreatePanel() {
    document.body.classList.remove("overflow-hidden");
    this.createPanel.close();
  }

  setAndOpenEditPanel(action: T) {
    document.body.classList.add("overflow-hidden");
    this.currentAction.set(action);
    this.editPanel.open();
  }

  setAndCloseEditPanel() {
    document.body.classList.remove("overflow-hidden");
    this.currentAction.set(undefined);
    this.editPanel.close();
  }

  setAndOpenDeletePanel(action: T) {
    document.body.classList.add("overflow-hidden");
    this.currentAction.set(action);
    this.deletePanel.open();
  }

  setAndCloseDeletePanel() {
    document.body.classList.remove("overflow-hidden");
    this.currentAction.set(undefined);
    this.deletePanel.close();
  }
}
