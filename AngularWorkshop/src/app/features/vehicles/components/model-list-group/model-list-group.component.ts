import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModelListItemDto } from '../../models/model-list-item-dto';
import { PageResponse } from 'src/app/core/models/page-response';
import { ModelsMockService } from '../../services/models-mock.service';
import { GetModelListRequest } from '../../models/get-model-list-request';

@Component({
  selector: 'app-model-list-group',
  templateUrl: './model-list-group.component.html',
  styleUrls: ['./model-list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelListGroupComponent implements OnInit{
  modelsList!: PageResponse<ModelListItemDto>;
  selectedModelId: number | null = null;

  constructor(
    private modelsMockService: ModelsMockService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getList({ pageIndex: 0, pageSize: 3 });
  }

  getList(request: GetModelListRequest): void {
    const models = [...(this.modelsList?.items ?? [])]; // Buradaki item değerlerini yeni bir array referansıyla saklıyoruz.
    // [this.modelsList.items[0], this.modelsList.items[1], this.modelsList.items[2] ...];

    this.modelsMockService.getList(request).subscribe({
      next: (response) => {
        response.items = [...models, ...response.items];
        this.modelsList = {
          ...response,
          items: response.items[0] as any
        };

        this.changeDetector.detectChanges(); // Geliştirici state değiştirdiğinde değişiklikleri algılaması için kullanıyoruz.
      },
    });
  }

  onModelClick(modelId: number | null): void {
    // HTML tarafında bir event yaratılmasında, yani kullanıcı olay yarattığında, changeDetector state değişiklikleri algılıyor.
    this.selectedModelId = modelId;
    // this.changeDetector.detectChanges(); // Bu satırı yazmamıza gerek yok.
  }

  onViewMoreButtonClicked(): void {
    if (!this.modelsList.hasNextPage) return;

    this.getList({
      pageIndex: this.modelsList.pageIndex + 1,
      pageSize: this.modelsList.pageSize,
    });
  }





}
