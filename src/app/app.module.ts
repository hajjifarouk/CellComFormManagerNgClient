import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { DataTableModule } from "angular2-datatable";
import { Routing } from './app.routing';
import { AppComponent } from './app.component';
import { UserComponent } from './pages/user/user.component';
import { ShopComponent } from './pages/shop/shop.component';
import { FormComponent } from './pages/form/form.component';
import { PlanComponent } from './pages/plan/plan.component';
import { ReportComponent } from './pages/report/report.component';
import { MapComponent } from './pages/map/map.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { HomeComponent } from './pages/home/home.component';


import { UserService } from './services/user.service';
import { ShopService } from './services/shop.service';
import { FormService } from './services/form.service';
import { QuestionService } from './services/question.service';
import { PlanService } from './services/plan.service';
import { ReportService } from './services/report.service';

import { UserDataFilterPipe } from './pipes/user-data-filter.pipe';
import { QuestionComponent } from './pages/question/question.component';
import { ChoiceComponent } from './pages/choice/choice.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ShopComponent,
    FormComponent,
    PlanComponent,
    ReportComponent,
    MapComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
    AsideBarComponent,
    HomeComponent,
    UserDataFilterPipe,
    FileSelectDirective,
    FileDropDirective,
    QuestionComponent,
    ChoiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpModule,
    DataTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZexFLa1Izg7wJTJzP5pg3E7nNrA-P0ZU'
    }),
  ],
  providers: [UserService, ShopService, PlanService, FormService, ReportService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
