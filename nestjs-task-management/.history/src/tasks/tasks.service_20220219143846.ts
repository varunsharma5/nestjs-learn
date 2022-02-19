import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: String, description: String): Task {
    const task: Task = {
      id: '',
      title,
      description,
      status: TaskStatus.OPEN
    };
  }
}
