import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FuncIdiomas } from 'src/app/idiomas/idioma/funcIdiomas';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NgEventBus } from 'ng-event-bus';

@Component(
{
    selector: 'sc-table',
    templateUrl: './tabela.component.html',
    styleUrls: ['./tabela.component.css'],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ])
    ]
})

export class TabelaComponent implements OnInit
{
    @Input() colList:string[] = [];
    @Input() rowList:FuncIdiomas[] = [];
    @Input() skillTypes:string[] = [];
        
    col1!:string;
    col2!:string;
    col3!:string;

    type1!:string;
    type2!:string;
    type3!:string;
    type4!:string;

    expandedElement!: any;

    rowItemName!: string;
    rowLeitura!: string;
    rowEscrita!: string;
    rowAudicao!: string;
    rowFala!: string;

    constructor(
        private eventBus: NgEventBus
    ) {}

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
      this.rowItemName = element.nome  
      this.rowLeitura = element.leitura
      this.rowEscrita = element.escrita
      this.rowAudicao = element.audicao
      this.rowFala = element.fala
    }

    cellClickedi(element:any)
    {
      this.eventBus.cast('radar', element.nome+ ";" + element.leitura + "," + element.escrita + "," + element.audicao + "," + element.fala);
      this.eventBus.cast('tabelaIdiomaRowClicked', 'clicked!');
    }
}

