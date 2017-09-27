import { NgModule         } from '@angular/core';
import { BrowserModule    } from '@angular/platform-browser';
import { RouterModule     } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule      } from '@angular/forms';

import { AppComponent      } from './app.component';
import { LaureateComponent } from './laureate/laureate.component';
import { PrizeComponent    } from './prize/prize.component';
import { MainComponent     } from './main/main.component';
import { NobelService      } from './nobel.service';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LaureateComponent,
        PrizeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: 'laureate/:prizeCategory/:laureateId',
                component: LaureateComponent
            },
            {
                path: 'prize/:prizeCategory',
                component: PrizeComponent
            },
            {
                path: 'main',
                component: MainComponent
            },
            {
                path: '',
                redirectTo: 'main',
                pathMatch: 'full',
            },
            {
                path: '*otherwise',
                redirectTo: 'main',
                pathMatch: 'full',
            },
        ])
    ],
    providers: [ NobelService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
