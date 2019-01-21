import { Component, Input } from '@angular/core';
import { Task } from '../models.interface';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: Task;
  editing = false;
  newTaskText = '';
  constructor(private dataService: DataManagerService) {}

  deleteTask() {
    //this.dataService.deleteTask(this.task.listId);
  }

  editStart() {
    this.editing = true;
  }

  editTaskText() {
    const text = this.newTaskText;
    let capitaliceText = text.charAt(0).toUpperCase() + text.slice(1);
    this.task.text = capitaliceText;
    this.dataService.editTask(this.task);
    this.editing = false;
  }
  cancelEdit() {
    this.editing = false;
  }
}
