import { Component } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.less'
})
export class TodoAddComponent {
  title = '';
  loading = false;

  constructor(private taskService: TaskService) { }

  addTask(): void {
    if (!this.title.trim()) {
      return;
    }

    this.loading = true;
    this.taskService.addTask(this.title).subscribe({
      next: () => {
        this.title = '';
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
