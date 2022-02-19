import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskById(id: string, status: TaskStatus) {
    this.tasks.find((task) => task.id === id);
  }

  deleteTaskbyId(id: string): string {
    // const taskIndex = this.tasks.findIndex((task) => task.id === id);
    // this.tasks.splice(taskIndex);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return `Task ${id} deleted !`;
  }
}
