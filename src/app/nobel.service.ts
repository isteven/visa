import { Injectable } from '@angular/core';
import { HttpClient                  } from '@angular/common/http';

@Injectable()
export class NobelService {

    constructor(
        private http: HttpClient,
    ) { }

    nobelPrizes = [];
    prizeCategories = [ 'physics', 'chemistry', 'medicine', 'literature', 'peace', 'economics' ];

    private getIndex( prizeCategory ): number {
        for ( var i = 0 ; i < this.prizeCategories.length ; i++ ) {
            if ( this.prizeCategories[ i ] === prizeCategory ) {
                return i;
            }
        }
        return 0;
    }

    // FYI on index: 0 = physics, 1 = chemistry, and so on
    saveNobelPrizes( prizeCategoryIndex, data ): void {
        this.nobelPrizes[ prizeCategoryIndex ] = data;
        var temp = JSON.stringify( this.nobelPrizes );
        localStorage.setItem( 'nobelPrizes', temp );
    }

    getNobelPrizes( prizeCategory ): any {
        var catIndex = this.getIndex( prizeCategory );
        var temp = JSON.parse( localStorage.getItem( 'nobelPrizes' ) );
        if ( temp ) {
            return temp[ catIndex ];
        }
        else return [];
    }

    prizeApiUrl     : string    = 'http://api.nobelprize.org/v1/prize.json';
    laureatesApiUrl : string    = 'http://api.nobelprize.org/v1/laureate.json';
    parsedPrizes    : any[]     = [];
    prizesCats      : string[]  = ['physics', 'chemistry', 'medicine', 'literature', 'peace', 'economics'];
    prizesIcons     : string[]  = ['fa fa-thermometer-2', 'fa fa-flask', 'fa fa-heartbeat', 'fa fa-pencil', 'fa fa-hand-peace-o', 'fa fa-usd'];
    laureates       : any       = []

    initData( callback ): void {
        // first, let's check if we have it in localStorage.
        // we can just check any data, say; medicine
        let tempPrizes = this.getNobelPrizes( 'medicine' );

        // if there's nobel data in localStorage, no need to do AJAX call.
        if ( tempPrizes.length > 0 ) {
            console.log( 'nobel.service.ts - initData(): Data exists in local storage');
            //console.log( tempPrizes );
            callback();
        }

        // if not, we need to get it from the web service.
        else {

            this.http.get( this.prizeApiUrl ).subscribe(data => {

                console.log( 'nobel.service.ts - initData(): No data, calling Nobel web service');

                let prizes  = data[ 'prizes' ];
                let grouped = this.groupBy(prizes, nobel => nobel.category);

                // we "halfway-aggregate" this for now
                for (var i = 0; i < this.prizesCats.length; i++) {

                    let currCategory = this.prizesCats[ i ];
                    let catAggrPrize = grouped.get( currCategory );
                    let tempTotal    = 0;

                    for ( let j = 0; j < catAggrPrize.length; j++ ) {
                        tempTotal += catAggrPrize[ j ].laureates.length;
                    }

                    // save the half-aggregated data to service. We're gonna use it later.
                    this.saveNobelPrizes( i, catAggrPrize );

                }

                callback();

            });
        }
    }

    // The halfway-aggregator function
    groupBy(list, keyGetter): any {

        const map = new Map();
        let result: any;

        list.forEach((item) => {

            const key = keyGetter(item);
            const collection = map.get(key);

            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });

        return map;
    }
}
