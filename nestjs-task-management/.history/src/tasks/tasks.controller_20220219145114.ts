import { Body, Controller, Get, Post } from '@nestjs/common';
import { title } from 'process';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // @Post()
  // createTask(@Body() body) /*: Task*/ {
  //   console.log('body', body);
  // }

  @Post()
  createTask(@Body('title') title: string, @Body('description') description: string) {}
}
