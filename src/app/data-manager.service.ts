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

  deleteList(listId: number) {
    this.authService.deleteList(listId).then(res => {
      this.loadDataFromBackend();
    });
  }

  deleteTask(listId: number) {
    this.authService.deleteAllTask(listId).then(res => {
      console.log("Respuesta"+res);
      this.loadDataFromBackend();
    });
  }

  editListName(list: List) {
    this.data.lists = this.data.lists.map(listObj => (listObj.listId === list.listId ? list : listObj));
  }

  addNewTask(text: string, list: List) {
    this.authService.newTask(text,list.listId).then(res => {
      this.loadDataFromBackend();
    }).catch(error =>{
      
    });
  }

  editTask(newTask: Task) {
    this.authService.editTask(newTask.taskId,newTask.text).then(res => {
      this.loadDataFromBackend();
    });
  }

}
