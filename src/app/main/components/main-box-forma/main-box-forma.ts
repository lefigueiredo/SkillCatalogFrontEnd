import { Component, Input } from '@angular/core';

@Component(
    {
        templateUrl: './main-box-forma.html',
        selector: 'main-box-forma',
        styleUrls: ['./main-box-forma.css']
    }
)
export class MainBoxFormaComponent 
{
    @Input() formInst: string = "";
    @Input() formDipl: string = "";
    @Input() formArea: string = "";
    @Input() formFim: string = "";

    constructor() {}
}