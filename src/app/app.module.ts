import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataviewModule} from './dataview/dataview.module';
import {AboutComponent} from './about/about.component';
import {RouterModule, Routes} from '@angular/router';
import {DisplayComponent} from './dataview/display/display.component';


const appRoutes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: '', component: DisplayComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    AppRoutingModule,
    BrowserAnimationsModule,
    DataviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
