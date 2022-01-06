import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { GenericTask } from '../models/tasks.model';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mat-elevation-z8',
  },
})
export class TaskTableComponent implements AfterViewInit, OnChanges {
  @Input() tableData!: GenericTask[];
  @Input() filterValue!: string;
  @Output() onEditTask: EventEmitter<string> = new EventEmitter();
  @Output() onDeleteTask: EventEmitter<string> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  public displayedColumns: string[] = [ 'name', 'type', 'actions' ];
  public pageSizeOptions: number[] = [10, 25, 50, 100];
  public dataSource = new MatTableDataSource<GenericTask>([]);
  
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.setFilterPredicate();
    this.dataSource.filter = this.filterValue;
  }

  ngOnChanges(): void {
    this.dataSource.filter = this.filterValue;
    this.dataSource.data = this.tableData;
  }

  ngAfterViewInit(): void  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setFilterPredicate(): void {
    this.dataSource.filterPredicate = (row: any, filter: string) => {
      const [name, type] = filter.split('**|**');
      const isNameMatch: boolean = (row.name as string)
        .toLowerCase()
        .includes(name.toLocaleLowerCase());
      
      return type ? isNameMatch && row.type === type : isNameMatch;
    };
  }

}
