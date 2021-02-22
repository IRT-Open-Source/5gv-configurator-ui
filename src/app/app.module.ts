import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigItemComponent } from './configuration/config-item/config-item.component';
import { ConfigurationFormService } from './configuration/configuration-form.service';
import { StatusComponent } from './status/status.component';
import { SocketIoModule } from 'ngx-socket-io';

const ioConfig = {
  url: 'http://localhost:3000',
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    ConfigItemComponent,
    StatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(ioConfig),
  ],
  providers: [ConfigurationFormService],
  bootstrap: [AppComponent],
})
export class AppModule {}
