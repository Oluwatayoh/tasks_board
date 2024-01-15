import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class UtilityService {
  constructor() {}

  showLoading(): void {
    $('#loading-overlay').show();
  }

  hideLoading(): void {
    $('#loading-overlay').hide();
  }
}
