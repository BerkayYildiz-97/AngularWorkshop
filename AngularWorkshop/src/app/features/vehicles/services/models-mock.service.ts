import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetModelListRequest } from '../models/get-model-list-request';
import { Observable, Subject } from 'rxjs';
import { GetModelListResponse } from '../models/get-model-list-response';
import { ModelListItemDto } from '../models/model-list-item-dto';

@Injectable()
export class ModelsMockService {
  private readonly apiControllerUrl = `${environment.API_URL}/models`;

  constructor(private httpClient: HttpClient) { }

  getList(request: GetModelListRequest): Observable<GetModelListResponse> {
    const subject = new Subject<GetModelListResponse>();

    const params = {
      _page: request.pageIndex + 1,
      _limit: request.pageSize,
    };

    this.httpClient
      .get<ModelListItemDto[]>(this.apiControllerUrl, {
        params, // params: params ile aynı görevi görür, JS içerisindeki kısa yazım şeklidir.
      }) // Observable çalışması için bir subcriber'ı olması gerekiyor.
      .subscribe({
        next: (response) => {
          const responseModel: GetModelListResponse = {
            pageIndex: request.pageIndex,
            pageSize: request.pageSize,
            totalCount: 16,
            items: response,
            hasNextPage: true,
            hasPreviousPage: request.pageIndex === 0 ? false : true,
          }; // Response'u oluşturmak için sahte bir response modeli oluşturuyoruz.

          subject.next(responseModel); // Response'u subject'e gönderiyoruz.
        },
        error: (error) => {
          subject.error(error);
        },
        complete: () => {
          subject.complete();
        },
      });

    return subject.asObservable();
  }
}
