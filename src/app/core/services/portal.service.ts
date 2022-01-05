import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  ComponentPortal,
  ComponentType,
  Portal,
  TemplatePortal,
} from '@angular/cdk/portal';

import { from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private viewContainerRef!: ViewContainerRef;
  private actionsPortal$ = new Subject<Portal<any> | null>();

  get actionsPortal() {
    return from(this.actionsPortal$);
  }

  /** Sets the view container ref needed for setPanelContent */
  setViewContainerRef(vcr: ViewContainerRef) {
    this.viewContainerRef = vcr;
  }

  setActionsPortal(actionsPortal: Portal<any>) {
    this.actionsPortal$.next(actionsPortal);
  }

  setPanelContent(componentOrTemplateRef: ComponentType<any> | TemplateRef<any>) {
    let portal: Portal<any>;
    if (componentOrTemplateRef instanceof TemplateRef) {
      portal = new TemplatePortal(componentOrTemplateRef, this.viewContainerRef);
    } else {
      portal = new ComponentPortal(componentOrTemplateRef);
    }

    this.actionsPortal$.next(portal);
  }

  clearActionsPortal() {
    this.actionsPortal$.next(null);
  }

}
