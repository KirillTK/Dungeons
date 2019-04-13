import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service).toBeTruthy();
  });

  it('should return Math task Object', function () {
    const service: TasksService = TestBed.get(TasksService);
    expect(service.getMathTask() instanceof Object).toBe(true);
  });

  it('should return Compare task Object', function () {
    const service: TasksService = TestBed.get(TasksService);
    expect(service.getCompareTask() instanceof Object).toBe(true);
  });

  it('should return EngToRusTask task Object', function () {
    const service: TasksService = TestBed.get(TasksService);
    expect(service.getCompareTask() instanceof Object).toBe(true);
  });

  it('should return RusToEngTask task Object', function () {
    const service: TasksService = TestBed.get(TasksService);
    expect(service.getRusToEngTast() instanceof Object).toBe(true);
  });

  it('should return RightOrder task Object', function () {
    const service: TasksService = TestBed.get(TasksService);
    expect(service.getDragOrderTask() instanceof Object).toBe(true);
  });


  it ('should return Quiz task Object', function () {
    const service: TasksService = TestBed.get(TasksService);
    expect(service.getQuizTask() instanceof Object).toBe(true);
  });



});
