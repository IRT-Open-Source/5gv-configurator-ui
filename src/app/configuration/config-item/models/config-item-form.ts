import { ConfigItem } from './config-item';
import { FormControl, Validators } from '@angular/forms';

export class ConfigItemForm {
  criterion = new FormControl();
  value = new FormControl();

  constructor(configItem: ConfigItem) {
    this.criterion.setValue(configItem.criterion);

    this.value.setValue(configItem.value);
    this.value.setValidators([
      Validators.required,
      Validators.min(ConfigItem.min),
      Validators.max(ConfigItem.max)
    ]);
  }
}
