import { Component, Input } from '@angular/core';

@Component(
    {
        templateUrl: './main-box-exp.html',
        selector: 'main-box-exp',
        styleUrls: ['./main-box-exp.css']
    }
)
export class MainBoxExpComponent 
{
    @Input() formTit: string = "";
    @Input() formEmp: string = "";
    @Input() formInicio: string = "";
    @Input() formFim: string = "";

    constructor() {}
}