import { Component, OnInit        } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location                 } from '@angular/common';
import { HttpClient               } from '@angular/common/http';

@Component({
    selector: 'laureate-sel',
    templateUrl: './laureate.component.html',
})

export class LaureateComponent implements OnInit {

    laureates: any = [];
    selectedLaureate: any = {};
    laureateId: number = 0;
    laureatesApiUrl: string = 'http://api.nobelprize.org/v1/laureate.json';
    prizeCategory: string = '';

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.laureateId = params['laureateId'];
            this.prizeCategory = params['prizeCategory'];
            console.log( this.prizeCategory );
            this.http.get(this.laureatesApiUrl + '?id=' + this.laureateId ).subscribe(data => {
                this.selectedLaureate = data[ 'laureates' ].find(this.findById, { laureateId: this.laureateId });
            });
        });
    }

    findById( laureates ): any {
        return laureates.id === this.laureateId;
    }
}
