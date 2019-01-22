import { Injectable } from '@angular/core';
import { List, Task } from './models.interface';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  data: { lists: Array<List> } = {
    lists: [],
  };

  jwt: string = localStorage.getItem('jwt');


  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {}

  loadDataFromBackend() {
    this
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
            list.tasks = await this.getTasks(list.listId);
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

  getLists() {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return this.http.get('https://apitrello.herokuapp.com/list', options).toPromise();
  }

  getTasks(idlist: number): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return new Promise((resolve, reject) => {
      this.http
        .get('https://apitrello.herokuapp.com/list/tasks/' + idlist, options)
        .toPromise()
        .then(tasks => {
          if (tasks) {
            resolve(tasks);
          } else {
            resolve([]);
          }
        })
        .catch(error => {
          console.log(error);
          resolve([]);
        });
    });
  }

  getDataUser(){
    this.loadDataFromBackend();
    return this.data;
  }

  addNewList(name: string) :any{
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    const body = { name };
    return new Promise((resolve, reject) => {
      this.http.post('https://apitrello.herokuapp.com/list/', body, options)
      .toPromise()
      .then(res => {
        console.log(res);
        this.loadDataFromBackend();
      })
    });
  }

  deleteList(listId: number) :any {
    this.authService.deleteList(listId).then(res => {
      this.loadDataFromBackend();
    });
  }

  deleteTask(listId: number) {
    this.authService.deleteAllTask(listId).then(res => {
      this.loadDataFromBackend();
    }).catch(maybeNotAndError =>{
      if (maybeNotAndError.status === 200) {}
    });
  }

  editListName(list: List) {
    this.authService.editList(list.listId,list.name).then(res => {
      this.loadDataFromBackend();
    });  
  }

  addNewTask(text: string, list: List) {
    this.authService.newTask(text,list.listId).then(res => {
      this.loadDataFromBackend();
    })
  }

  editTask(newTask: Task) {
    this.authService.editTask(newTask.taskId,newTask.text).then(res => {
      this.loadDataFromBackend();
    });
  }

}
