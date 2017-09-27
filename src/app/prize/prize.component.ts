import { Component, OnInit        } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location                 } from '@angular/common';
import { HttpClient               } from '@angular/common/http';
import { NobelService             } from './../nobel.service';


@Component({
    selector  : 'prize-sel',
    providers : [],
    templateUrl: './prize.component.html',
    styleUrls: ['./prize.component.css']
})

export class PrizeComponent implements OnInit {

    prizesInADecade : any = [];
    aDecadePrizes   : any = [];
    selectedDecade  : any = [];
    urlCategory   : string;

    constructor(
        private http         : HttpClient,
        private nobelService : NobelService,
        private route        : ActivatedRoute,
        private location     : Location
    ) { }

    // showDecadesOfPrizes( prizesInADecade ): void {
    //     this.aDecadePrizes = prizesInADecade
    // }

    agregateData( data ): void {

        let prizesCategory  = this.nobelService.getNobelPrizes( this.urlCategory );

        let tempPrizes      = [];
        let tempPrizesCtr   = 0;
        let total   = 0;

        for ( var i = 0; i < prizesCategory.length ; i++ ) {

            total += prizesCategory[ i ].laureates.length;

            tempPrizes.push( prizesCategory[ i ] );

            if ( ( i + 1 ) % 10 == 0 || i == prizesCategory.length - 1 ) {

                this.prizesInADecade.push({
                    id: tempPrizesCtr,
                    yearStart: prizesCategory[ i - 9 ].year,
                    yearEnd: prizesCategory[ i ].year,
                    tempPrizes: tempPrizes
                });
                tempPrizes = [];
                tempPrizesCtr++;
            }
        }

        this.aDecadePrizes = this.prizesInADecade[ 0 ];
    }

    ngOnInit(): void {

        this.route.params.subscribe(params => {
            this.urlCategory = params[ 'prizeCategory' ];
        });

        this.nobelService.initData( this.agregateData.bind( this ) );
    }
}
