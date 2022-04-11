import { Component, Input } from '@angular/core';

@Component(
    {
        templateUrl: './main-box-idi.html',
        selector: 'main-box-idi',
        styleUrls: ['./main-box-idi.css']
    }
)

export class MainBoxIdiComponent
{
    @Input() formNome: string = "";
    @Input() formNv: string = "";
    @Input() barColor: string = "";

    constructor(
    ) {}
}