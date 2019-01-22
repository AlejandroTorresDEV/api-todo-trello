import { Component, Input } from '@angular/core';
import { List } from '../models.interface';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() list: List;
  editing = false;
  oldName: string;
  newName: string = '';

  constructor(private dataService: DataManagerService) {}

  newTask(ev) {
    const text = ev.target.value.trim();

    if (text !== '') {
      this.dataService.addNewTask(text, this.list);
      ev.target.value = '';
    }
  }

  delete() {
    if (confirm('Do you really want to delete the list ' + this.list.name)) {
      this.dataService.deleteList(this.list.listId);
      this.dataService.deleteTask(this.list.listId);
    }
  }

  editName() {
    const text = this.newName;
    let capitaliceText = text.charAt(0).toUpperCase() + text.slice(1);
    this.list.name = capitaliceText;
    this.dataService.editListName(this.list);
    this.editing = false;
  }
  
  edit(node) {
    setTimeout(() => {
      node.focus();
    }, 0);
    this.editing = true;
  }
  
  cancelEdit() {
    this.editing = false;
  }
}
