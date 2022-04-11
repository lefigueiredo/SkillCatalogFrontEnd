import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { FuncProficiencia } from '../funcProficiencia';
import { NgEventBus } from 'ng-event-bus';

@Component(
{
    selector: 'sc-table-prof',
    templateUrl: './tabela.proficiencia.component.html',
    styleUrls: ['./tabela.proficiencia.component.css'],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])
    ]
})

export class TabelaProficienciaComponent implements OnInit
{
    @Input() colList:string[] = [];
    @Input() rowList:FuncProficiencia[] = [];
    @Input() skillTypes:string[] = [];
        
    col1!:string;
    col2!:string;
    col3!:string;

    type1!:string;
    type2!:string;
    type3!:string;
    type4!:string;

    expandedElement!: any;

    rowReuse!: string;
    rowEscrita!: string;
    rowRefactor!: string;
    rowProblema!:string;
    rowNome!:string;
    rowId!:string;

    constructor(private eventBus: NgEventBus) {
    }

    ngOnInit(): void
    { 
        this.col1 = this.colList[0];        
        this.col2 = this.colList[1];
        this.col3 = this.colList[2];

        this.type1 = this.skillTypes[0];
        this.type2 = this.skillTypes[1];
        this.type3 = this.skillTypes[2];
        this.type4 = this.skillTypes[3];
    }

    cellClicked(element:any) 
    {
        this.rowReuse = element.reuse  
        this.rowRefactor = element.refactor
        this.rowEscrita = element.escrita
        this.rowProblema = element.problema
        this.rowNome = element.nome
        this.rowId = element.id
    }

    cellClickedi(element:any)
    {
      this.eventBus.cast('radarProf', element.nome+ ";" + element.escrita + "," + element.refactor + "," + element.reuse + "," + element.problema);
      this.eventBus.cast('rafarProfClicked', 'clicked!')
    }
}

