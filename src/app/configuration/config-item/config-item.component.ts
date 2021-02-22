import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfigItem } from './models/config-item';

@Component({
  selector: 'app-config-item',
  templateUrl: './config-item.component.html',
  styleUrls: ['./config-item.component.css']
})
export class ConfigItemComponent implements OnInit {
  @Input() configItemForm: FormGroup;
  @Input() index: number;
  @Output() deleteConfigItem: EventEmitter<number> = new EventEmitter();

  criteria = ConfigItem.criteria;

  inputId = 'config-item-input-' + this.index;
  selectId = 'config-item-select-' + this.index;
  valueId = 'config-item-value-' + this.index;

  min = ConfigItem.min;
  max = ConfigItem.max;

  constructor() {
  }

  ngOnInit() {}

  delete() {
    this.deleteConfigItem.emit(this.index);
  }

  get value() {
    return this.configItemForm.get('value');
  }
}
