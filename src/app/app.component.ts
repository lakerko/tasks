import { Component } from '@angular/core';

import { LoadingService } from './core/services/loading.service';
import { PortalService } from './core/services/portal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    public readonly portalService: PortalService,
    public readonly loadingService: LoadingService,
  ) {}
}
