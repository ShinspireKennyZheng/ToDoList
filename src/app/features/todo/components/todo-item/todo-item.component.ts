import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.less'
})
export class TodoItemComponent {
  @Input() task!: Task;
  @ViewChild('editModalContent') editModalContent!: TemplateRef<any>;

  editTitle = '';
  editDescription = '';

  constructor(private taskService: TaskService, private modal: NzModalService) { }

  onStatusChange(checked: boolean): void {
    this.taskService.updateTaskStatus(this.task.id, checked).subscribe();
  }

  openEditModal(): void {
    this.editTitle = this.task.title;
    this.editDescription = this.task.description || '';

    this.modal.create({
      nzTitle: '編輯任務',
      nzContent: this.editModalContent,
      nzOnOk: () => {
        return new Promise<void>((resolve, reject) => {
          this.taskService.updateTask(this.task.id, this.editTitle, this.editDescription).subscribe({
            next: () => resolve(),
            error: (err) => reject(err)
          });
        });
      }
    });
  }

  deleteTask(e: Event): void {
    e.stopPropagation();
    this.modal.confirm({
      nzTitle: '確定要刪除此任務嗎？',
      nzContent: '此動作無法復原。',
      nzOkText: '刪除',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        return new Promise<void>((resolve, reject) => {
          this.taskService.deleteTask(this.task.id).subscribe({
            next: () => resolve(),
            error: (err) => reject(err)
          });
        });
      },
      nzCancelText: '取消'
    });
  }
}
