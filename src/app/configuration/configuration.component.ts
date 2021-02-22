import { Component, OnInit } from '@angular/core';
import { ConfigurationFormService } from './configuration-form.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Configuration } from './models/configuration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {
  configForm: FormGroup;
  configFormSub: Subscription;
  configItems: FormArray;

  cronJobActive: FormControl;
  cronJobInterval: FormControl;

  min = Configuration.minCronJobInterval;
  max = Configuration.maxCronJobInterval;

  constructor(
    private formService: ConfigurationFormService,
    private router: Router
  ) {}

  ngOnInit() {
    this.configFormSub = this.formService.configFormChange.subscribe(
      (config) => {
        this.configForm = config;
        this.configItems = this.configForm.get('configItems') as FormArray;
        this.cronJobActive = this.configForm.get(
          'cronJobActive'
        ) as FormControl;
        this.cronJobInterval = this.configForm.get(
          'cronJobInterval'
        ) as FormControl;
        this.setCronJobIntervalState();
      }
    );
  }

  addConfigItem() {
    this.formService.addConfigItem();
  }

  deleteConfigItem(index: number) {
    this.formService.deleteConfigItem(index);
  }

  cronJobActiveChange() {
    this.setCronJobIntervalState();
  }

  private setCronJobIntervalState() {
    if (!this.cronJobActive.value) {
      this.cronJobInterval.disable();
    } else {
      this.cronJobInterval.enable();
    }
  }

  submit() {
    this.formService.submit(this.configForm.value);
    this.router.navigate(['status']);
  }
}
