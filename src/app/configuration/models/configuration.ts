import { ConfigItem } from '../config-item/models/config-item';

export class Configuration {
  static readonly defaultCronJobActive = false;
  static readonly defaultCronJobInterval = 10;
  static readonly minCronJobInterval = 1; // [hours]
  static readonly maxCronJobInterval = 168; // [hours] ~ 1 week

  name: string;
  configItems: ConfigItem[];
  cronJobActive: boolean;
  cronJobInterval: number;
  lastProcessed: number | null;

  constructor(
    name?: string,
    configItems?: ConfigItem[],
    cronJobActive?: boolean,
    cronJobInterval?: number
  ) {
    this.name = name || null;
    this.configItems = configItems;
    this.cronJobActive =
      typeof cronJobActive === 'undefined'
        ? Configuration.defaultCronJobActive
        : cronJobActive;
    this.cronJobInterval =
      cronJobInterval || Configuration.defaultCronJobInterval;
  }
}
