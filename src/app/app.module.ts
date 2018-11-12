import "zone.js/dist/zone-mix";
import "reflect-metadata";
import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ElectronService } from "./providers/electron.service";
import { WebviewDirective } from "./directives/webview.directive";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { BusinessModule } from "./business/business.module";
import { AuthModule } from "./common/auth/auth.module";
import { init_app, Bootstrapper } from "./common/core/bootstrapper.service";
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, HomeComponent, WebviewDirective],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BusinessModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    ElectronService,
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [Bootstrapper],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
