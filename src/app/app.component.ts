import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FormComponent } from "./components/form/form.component";
import { Location } from './models/location';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from "./components/card/card.component";
import { CommonModule } from '@angular/common';
import { CardListComponent } from "./components/card-list/card-list.component";
import { SituationDetailComponent } from "./components/situation-detail/situation-detail.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        HeaderComponent,
        FormComponent,
        HttpClientModule,
        CommonModule,
        CardListComponent,
        SituationDetailComponent,
        FooterComponent
    ]
})
export class AppComponent {

  title = 'academia';
  abertas  = [] as any;


  setAbertas(event: any) {    
    this.abertas = event;
  }
}
