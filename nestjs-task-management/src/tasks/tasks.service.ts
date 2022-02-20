import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTaskbyId(id: string): Promise<string> {
    //  This requires two sql queries
    // const found = await this.getTaskById(id);
    // console.log('found', found);
    // const task: Task = {
    //   id: found.id,
    //   title: found.title,
    //   description: found.description,
    //   status: found.status,
    // };
    // await this.tasksRepository.remove([task]);

    //  This requires only one sql query
    const result = await this.tasksRepository.delete(id);
    console.log('result', result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return `Task ${id} deleted !`;
  }
}
