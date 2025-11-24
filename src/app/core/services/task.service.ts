import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Task } from '../models/task.model';
import { Observable, from, map, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasksSubject = new BehaviorSubject<Task[]>([]);

    constructor(private supabaseService: SupabaseService) {
        this.loadTasks();
        this.initRealtime();
    }

    private initRealtime() {
        this.supabaseService.client
            .channel('public:tasks')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
                this.loadTasks();
            })
            .subscribe();
    }

    private loadTasks() {
        this.supabaseService.client
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false })
            .then(({ data, error }) => {
                if (error) console.error(error);
                if (data) this.tasksSubject.next(data as Task[]);
            });
    }

    getTasks(): Observable<Task[]> {
        return this.tasksSubject.asObservable();
    }

    addTask(title: string, description?: string): Observable<Task> {
        const promise = this.supabaseService.client
            .from('tasks')
            .insert({ title, description })
            .select()
            .single()
            .then(({ data, error }) => {
                if (error) throw error;
                const newTask = data as Task;
                const currentTasks = this.tasksSubject.value;
                this.tasksSubject.next([newTask, ...currentTasks]);
                return newTask;
            });

        return from(promise);
    }

    updateTaskStatus(id: string, is_completed: boolean): Observable<Task> {
        const promise = this.supabaseService.client
            .from('tasks')
            .update({ is_completed })
            .eq('id', id)
            .select()
            .single()
            .then(({ data, error }) => {
                if (error) throw error;
                const updatedTask = data as Task;
                const currentTasks = this.tasksSubject.value.map(t => t.id === id ? updatedTask : t);
                this.tasksSubject.next(currentTasks);
                return updatedTask;
            });
        return from(promise);
    }

    updateTask(id: string, title: string, description?: string): Observable<Task> {
        const promise = this.supabaseService.client
            .from('tasks')
            .update({ title, description })
            .eq('id', id)
            .select()
            .single()
            .then(({ data, error }) => {
                if (error) throw error;
                const updatedTask = data as Task;
                const currentTasks = this.tasksSubject.value.map(t => t.id === id ? updatedTask : t);
                this.tasksSubject.next(currentTasks);
                return updatedTask;
            });
        return from(promise);
    }

    deleteTask(id: string): Observable<void> {
        const promise = this.supabaseService.client
            .from('tasks')
            .delete()
            .eq('id', id)
            .then(({ error }) => {
                if (error) throw error;
                const currentTasks = this.tasksSubject.value.filter(t => t.id !== id);
                this.tasksSubject.next(currentTasks);
            });
        return from(promise);
    }
}
