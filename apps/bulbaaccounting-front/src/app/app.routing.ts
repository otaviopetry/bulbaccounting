import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';


export const appRoutes: Route[] = [];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
})
export class AppRoutingModule {
  //
}
