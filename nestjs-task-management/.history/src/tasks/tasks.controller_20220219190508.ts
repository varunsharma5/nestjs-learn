import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const task = this.tasksService.getTaskById(id);
    console.log('task', task);
    return task;
  }

  // @Post()
  // createTask(@Body() body) /*: Task*/ {
  //   console.log('body', body);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
