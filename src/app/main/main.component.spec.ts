import { RouterModule     } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TestBed          } from '@angular/core/testing';
import { APP_BASE_HREF    } from '@angular/common';
import { By               } from '@angular/platform-browser';
import { DebugElement     } from '@angular/core';

import { MainComponent    } from './../main/main.component';
import { NobelService     } from './../nobel.service';


describe('MainComponent', () => {

    let debugEl: DebugElement;
    let fixture: any;
    let app: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MainComponent
            ],
            providers: [
                NobelService,
                {provide: APP_BASE_HREF, useValue : '/' }
            ],
            imports: [
                HttpClientModule,
                RouterModule.forRoot([
                    {
                        path: 'main',
                        component: MainComponent
                    },
                    {
                        path: '*otherwise',
                        redirectTo: 'main',
                        pathMatch: 'full',
                    },
                ])
            ]
        });
        TestBed.compileComponents();
    });

    it( 'should create MainComponent', () => {
        fixture = TestBed.createComponent(MainComponent);
        app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it( 'should fetch 6 prizes', () => {
        let fixture = TestBed.createComponent(MainComponent);
        fixture.componentInstance.ngOnInit();
        let prizesAmount = fixture.componentInstance.parsedPrizes.length;
        expect( prizesAmount ).toEqual( 6 );
    });
});
