import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarCardListComponent } from './components/car-card-list/car-card-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CarsMockService } from './services/cars-mock.service';
import { BrandListGroupComponent } from './components/brand-list-group/brand-list-group.component';
import { BrandsMockService } from './services/brands-mock.service';
import { ModelListGroupComponent } from './components/model-list-group/model-list-group.component';
import { ModelsMockService } from './services/models-mock.service';

@NgModule({
  declarations: [CarCardListComponent, BrandListGroupComponent, ModelListGroupComponent],
  exports: [CarCardListComponent, BrandListGroupComponent,ModelListGroupComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CarsMockService,
      useClass: CarsMockService,
    },
    {
      provide: BrandsMockService,
      useClass: BrandsMockService,
    },
    {
      provide: ModelsMockService,
      useClass: ModelsMockService,
    },
  ],
})
export class VehiclesModule {}
