export class ConfigItem {
  static criteria = [
    { value: 'latest', text: 'Latest' },
    { value: 'ard-mediathek-home', text: 'From ARD-Mediathek home page' },
    { value: 'today', text: 'Most views in last 24 hours' },
    { value: 'week', text: 'Most views in last 7 days' },
    { value: 'month', text: 'Most views in last 30 days' }
  ];

  static readonly default = 10;
  static readonly min = 0;
  static readonly max = 100;

  criterion: string;
  value: number;

  constructor(criterion?: string, value?: number) {
    this.criterion = criterion || ConfigItem.criteria[0].value;
    this.value = value || ConfigItem.default;
  }
}
