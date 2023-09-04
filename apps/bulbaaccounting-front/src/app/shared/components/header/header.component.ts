import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';

interface ISampleDataResponse {
  message: string;
}

@Component({
  selector: 'bulba-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public sampleData = '';

  protected subscriptions: Subscription = new Subscription();

  constructor(
    private httpClient: HttpClient,
    protected changeDetectorReference: ChangeDetectorRef,
  ) {
    //
  }

  ngOnInit(): void {
    this.getDataFromApi();
  }

  protected getDataFromApi() {
    this.subscriptions.add(
      this.httpClient.get<ISampleDataResponse>('http://localhost:3000/api').pipe(
        tap({
          next: ({ message }) => {
            console.log('===> message', message);
            this.sampleData = message;
            this.changeDetectorReference.markForCheck();
          }
        })
      ).subscribe(),
    )
  }
}
