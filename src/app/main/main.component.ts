import { Component, OnInit           } from '@angular/core';
import { HttpClient                  } from '@angular/common/http';
import { NobelService                } from './../nobel.service';

@Component({
    selector: 'main-sel',
    styleUrls: [ './main.component.css' ],
    templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {

    prizeApiUrl     : string   = 'http://api.nobelprize.org/v1/prize.json';
    laureatesApiUrl : string   = 'http://api.nobelprize.org/v1/laureate.json';

    prizesCats      : string[] = ['physics', 'chemistry', 'medicine', 'literature', 'peace', 'economics'];
    prizesIcons     : string[] = ['fa fa-thermometer-2', 'fa fa-flask', 'fa fa-heartbeat', 'fa fa-pencil', 'fa fa-hand-peace-o', 'fa fa-usd'];
    parsedPrizes    : any[]    = [];

    classObj = this;

    constructor(
        private http: HttpClient,
        private nobelService: NobelService
    ) { }

    initCallback(): void {
        let tempPrizes = [];
        tempPrizes = this.nobelService.getNobelPrizes( 'medicine' );
        if ( tempPrizes.length > 0 ) {

            for ( var i = 0 ; i < this.prizesCats.length ; i++ ) {

                let currCategory = this.prizesCats[ i ];
                let catAggrPrize = this.nobelService.getNobelPrizes( currCategory );
                let tempTotal    = 0;

                for ( let j = 0; j < catAggrPrize.length; j++ ) {
                    tempTotal += catAggrPrize[ j ].laureates.length;
                }

                // display it
                this.parsedPrizes.push({
                    'index': i,
                    'prizesIcons': this.prizesIcons[ i ],
                    'category': currCategory,
                    'sum': tempTotal
                });

            }
        }
    }

    ngOnInit(): void {
        this.nobelService.initData( this.initCallback.bind(this) );
    }    
}
