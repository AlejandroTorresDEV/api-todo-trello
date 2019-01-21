import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataManagerService } from '../data-manager.service';


@Component({
  selector: 'app-add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.scss']
})
export class AddNewListComponent implements OnInit {

  constructor(private dataService: DataManagerService,private authService: AuthService) {}

  
  ngOnInit() {
  }

  addList(ev) {
    if (ev.target.value.trim() !== '') {
      this.dataService.addNewList(ev.target.value.trim());
      ev.target.value = '';
    }
  }

  logoutUser(){
    console.log("hola");
   // this.apiService.logoutUser();
  }

}
