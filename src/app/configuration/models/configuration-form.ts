import { Configuration } from './configuration';
import { FormControl, FormArray, Validators } from '@angular/forms';

export class ConfigurationForm {
  name = new FormControl();
  configItems = new FormArray([]);
  cronJobActive = new FormControl();
  cronJobInterval = new FormControl();

  constructor(config: Configuration) {
    if (config.name) {
      this.name.setValue(config.name);
    }

    if (config.configItems) {
      this.configItems.setValue([config.configItems]);
    }

    if (typeof config.cronJobActive !== 'undefined') {
      this.cronJobActive.setValue(config.cronJobActive);
    }

    if (config.cronJobInterval) {
      this.cronJobInterval.setValue(config.cronJobInterval);
    }

    this.cronJobInterval.setValidators([
      Validators.required,
      Validators.min(Configuration.minCronJobInterval),
      Validators.max(Configuration.maxCronJobInterval)
    ]);
  }
}
