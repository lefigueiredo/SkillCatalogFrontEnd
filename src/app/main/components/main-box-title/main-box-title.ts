import { Component, Input } from '@angular/core';

@Component(
    {
        templateUrl: './main-box-title.html',
        selector: 'main-box-title',
        styleUrls: ['./main-box-title.css']
    }
)
export class MainBoxTitleComponent 
{
    @Input() formTitle: string = "";

    constructor() {}
}