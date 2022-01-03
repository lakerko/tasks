import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  constructor(
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) { }

  openConfirmDialog(data?: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmDialogComponent, { data })
      .afterClosed();
  }

  openSnackBar(message: string, action: string = 'Dismiss', config?: MatSnackBarConfig<any>): Observable<any> {
    return this.snackBar
      .open(message, action, config)
      .afterDismissed();
  }
}
