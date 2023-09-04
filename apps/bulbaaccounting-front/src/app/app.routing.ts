import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';


export const appRoutes: Route[] = [
  {
    path: 'expense',
    loadChildren: () => import('./modules/expense/expense.module')
      .then(m => m.ExpenseModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
  //
}
