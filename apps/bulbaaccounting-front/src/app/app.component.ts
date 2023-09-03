import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';

interface ISampleDataResponse {
  message: string;
}

@Component({
  selector: 'rocky-pear-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bulbaaccounting-front';

  public sampleData: string = '';

  protected subscriptions: Subscription = new Subscription();

  constructor(
    private httpClient: HttpClient,
  ) {
    this.getDataFromApi();
  }

  protected getDataFromApi() {
    this.subscriptions.add(
      this.httpClient.get<ISampleDataResponse>('http://localhost:3000/api').pipe(
        tap({
          next: ({ message }) => {
            console.log('===> message', message);
            this.sampleData = message;
          }
        })
      ).subscribe(),
    )
  }
}
