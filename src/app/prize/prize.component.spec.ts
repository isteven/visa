import { RouterModule,   } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TestBed          } from '@angular/core/testing';
import { APP_BASE_HREF    } from '@angular/common';
import { By               } from '@angular/platform-browser';
import { DebugElement     } from '@angular/core';
import { NgModel          } from '@angular/forms';
import { FormsModule      } from '@angular/forms';
import { PrizeComponent   } from './../prize/prize.component';
import { NobelService     } from './../nobel.service';


describe('PrizeComponent', () => {

    let debugEl: DebugElement;
    let fixture: any;
    let app: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PrizeComponent
            ],
            providers: [
                NobelService,
                {provide: APP_BASE_HREF, useValue : '/' }
            ],
            imports: [
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot([
                    {
                        path: 'prize/:prizeCategory',
                        component: PrizeComponent
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

    it( 'should create PrizeComponent', () => {
        fixture = TestBed.createComponent(PrizeComponent);
        app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it( 'should fetch 3 latest Physics Laureate', () => {
        let fixture = TestBed.createComponent(PrizeComponent);
        fixture.componentInstance.ngOnInit();
        setTimeout( function() {
            // don't use setTImeout in production. Use callback
            // or event emitter instead.
            let laureates = fixture.componentInstance.prizesInADecade[ 0 ].tempPrizes[ 0 ].laureates;
            expect( laureates.length ).toEqual( 3 );
        }, 1500 );
    });
});
