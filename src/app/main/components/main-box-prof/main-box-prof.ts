import { Component, Input } from '@angular/core';

@Component(
    {
        templateUrl: './main-box-prof.html',
        selector: 'main-box-prof',
        styleUrls: ['./main-box-prof.css']
    }
)
export class MainBoxProfComponent 
{
    @Input() formNome: string = "";
    @Input() formNv: string = "";
    @Input() barColor: string = "";

    constructor() {}
}