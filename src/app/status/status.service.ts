import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  availabilityChange = new Subject();
  availabilitySub: Subscription;

  constructor(private socket: Socket) {
    this.socket.on('connect', () => this.setSubscriptions());
    this.socket.on('disconnect', () => this.unsetSubscriptions());
  }

  setSubscriptions() {
    console.log('Subscribe state change events');
    this.availabilitySub = this.socket
      .fromEvent('availability')
      .subscribe((a) => this.handleAvailabilityUpdate(a));
    this.socket.emit('availability');
  }

  unsetSubscriptions() {
    console.log('Unsubscribe state change events');
    this.availabilitySub.unsubscribe();
  }

  handleAvailabilityUpdate(availability) {
    this.availabilityChange.next(availability);
  }
}
