import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTableFilterComponent } from './task-table-filter.component';

describe('TableFilterComponent', () => {
  let component: TaskTableFilterComponent;
  let fixture: ComponentFixture<TaskTableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTableFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
