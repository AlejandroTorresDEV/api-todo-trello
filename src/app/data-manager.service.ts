import { Injectable } from '@angular/core';
import { List, Task } from './models.interface';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  data: { lists: Array<List> } = {
    lists: [],
  };

  constructor(private authService: AuthService, private router: Router) {}

  loadDataFromBackend() {
    this.authService
      .getLists()
      .then((rawLists: Array<any>) => {
        console.log(rawLists);
        const lists = rawLists.map(rawList => ({
          listId: rawList.id,
          createdAt: rawList.createdAt,
          modifiedAt: rawList.updatedAt,
          name: rawList.name,
          tasks: [],
        }));
        Promise.all(
          lists.map(async (list: List) => {
            list.tasks = await this.authService.getTasks(list.listId);
            list.tasks = list.tasks.map((rawTask: any) => ({
              listId: rawTask.idlist,
              taskId: rawTask.id,
              text: rawTask.task,
              completed: false,
              color: 'white',
              createdAt: new Date(rawTask.createdAt),
              modifiedAt: new Date(rawTask.updatedAt),
            }));
            return list;
          }),
        ).then(lists => {
          this.data.lists = lists;
        });
      })
      .catch(() => this.router.navigate(['/login']));
  }

  getDataUser(){
    this.loadDataFromBackend();
    return this.data;
  }

  addNewList(name: string) {
    this.authService.newList(name).then(res => {
      console.log(res);
      this.loadDataFromBackend();
    });
  }

  addNewTask(text: string, list: List) {
    this.authService.newTask(text,list.listId).then(res => {
      console.log(res);
      this.loadDataFromBackend();
    });
  }
  deleteTask(task: Task) {
    this.data.lists = this.data.lists.map(listObj => {
      if (listObj.listId === task.listId) {
        listObj.tasks = listObj.tasks.filter(taskObj => taskObj.taskId !== task.taskId);
      }
      return listObj;
    });
  }

  deleteList(listId: number) {
    // this.data.lists = this.data.lists.filter(list => list.listId !== listId);
    this.authService.deleteList(listId).then(res => {
      this.loadDataFromBackend();
    });
  }

  editListName(list: List) {
    this.data.lists = this.data.lists.map(listObj => (listObj.listId === list.listId ? list : listObj));
  }
  editTask(newTask: Task) {
    this.data.lists = this.data.lists.map(list => {
      if (list.listId === newTask.listId) {
        list.tasks = list.tasks.map(task => {
          if (task.taskId === newTask.taskId) {
            return newTask;
          }
          return task;
        });
      }

      return list;
    });
  }
}
