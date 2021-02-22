import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Configuration } from './models/configuration';
import { ConfigItemForm } from './config-item/models/config-item-form';
import { ConfigItem } from './config-item/models/config-item';
import { ConfigurationForm } from './models/configuration-form';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Aggregator } from '5gv-dto';
import * as constants from './../constants.json';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationFormService {
  private configForm: BehaviorSubject<
    FormGroup | undefined
  > = new BehaviorSubject(
    this.fb.group(new ConfigurationForm(new Configuration()))
  );

  configFormChange: Observable<FormGroup> = this.configForm.asObservable();
  // private currentConfig: Configuration = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.addConfigItem(); // Alternatively load existing config
  }

  addConfigItem() {
    const config = this.configForm.getValue();
    const configItems = config.get('configItems') as FormArray;

    configItems.push(this.fb.group(new ConfigItemForm(new ConfigItem())));
    this.configForm.next(config);
  }

  deleteConfigItem(i: number) {
    const config = this.configForm.getValue();
    const configItems = config.get('configItems') as FormArray;

    configItems.removeAt(i);
    this.configForm.next(config);
  }

  submit(configuration: Configuration) {
    configuration.name = new Date().toISOString();
    console.log(configuration);
    // this.currentConfig = configuration;

    const dest = constants['config-server-url'];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .post<Aggregator.ConfigDto>(
        dest,
        configuration as Aggregator.ConfigDto,
        httpOptions
      )
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        console.log('Sent', configuration);
      });
  }

  getCurrentConfig() {
    return this.http.get(`${constants['config-server-url']}/latest`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
