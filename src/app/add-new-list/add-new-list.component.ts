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
      let text = ev.target.value.trim();
      let capitaliceText = text.charAt(0).toUpperCase() + text.slice(1);
      this.dataService.addNewList(capitaliceText);
      ev.target.value = '';
    }
  }

  logoutUser(){
    this.authService.logoutUser();
  }
}
