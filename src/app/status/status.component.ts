import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigurationFormService } from '../configuration/configuration-form.service';
import { Configuration } from '../configuration/models/configuration';
import { StatusService } from './status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit, OnDestroy {
  config: Configuration = null;
  availabilitySub: Subscription;
  availability: {
    available: number;
    missing: number;
    expected: number;
  };
  availabilityProgBarStyle = 'width: 0%';
  intitialised = false;

  constructor(
    private configService: ConfigurationFormService,
    private status: StatusService
  ) {}

  ngOnInit(): void {
    this.showConfig();
    this.availabilitySub = this.status.availabilityChange.subscribe((a) =>
      this.handleAvailabilityUpdate(a)
    );
  }

  ngOnDestroy(): void {
    this.availabilitySub.unsubscribe();
  }

  private async showConfig() {
    this.configService
      .getCurrentConfig()
      .subscribe((response: Configuration[]) => {
        this.intitialised = true;
        this.config = response[0];
      });
  }

  handleAvailabilityUpdate(a): void {
    this.availabilityProgBarStyle = `width: ${
      (a.available / a.expected) * 100
    }%`;
    this.availability = a;
  }
}
