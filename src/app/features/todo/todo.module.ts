import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodoAddComponent,
    TodoItemComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzListModule,
    NzEmptyModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    NzModalModule,
    NzIconModule,
    NzRadioModule
  ],
  exports: [
    TodoAddComponent,
    TodoItemComponent,
    TodoListComponent
  ]
})
export class TodoModule { }
