import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { HelpComponent } from './pages/help/help.component';
import { MarketAnalysisComponent } from './pages/market-analysis/market-analysis.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'wallet',
    component: WalletComponent,
  },
  {
    path: 'market',
    component: MarketAnalysisComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponent = [
  HomeComponent,
  WalletComponent,
  MarketAnalysisComponent,
  HelpComponent,
];
