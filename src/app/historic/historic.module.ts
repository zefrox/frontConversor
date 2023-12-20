import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricRoutingModule } from './historic-routing.module';
import { HistoricLayoutComponent } from './layouts/historic-layout.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistoricLayoutComponent
  ],
  imports: [
    CommonModule,
    HistoricRoutingModule,
    ReactiveFormsModule,
  ]
})
export class HistoricModule { }
