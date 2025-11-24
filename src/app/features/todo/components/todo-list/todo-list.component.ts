import { Component, OnInit } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.less'
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  get filteredTasks(): Task[] {
    if (this.filter === 'active') {
      return this.tasks.filter(t => !t.is_completed);
    } else if (this.filter === 'completed') {
      return this.tasks.filter(t => t.is_completed);
    }
    return this.tasks;
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
