import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FuncFormacao } from '../formacao/FuncFormacao';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { FormacaoService } from '../formacao/formacao.service';
import { UserService } from 'src/app/core/user/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';

@Component(
    {
        selector: 'sc-table-forma',
        templateUrl: './tabela.formacao.component.html',
        styleUrls: ['./tabela.formacao.component.css'],
        animations: [
            trigger('detailExpand', [
                state('collapsed', style({ height: '0px', minHeight: '0' })),
                state('expanded', style({ height: '*' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ])
        ]
    }
)

export class TabelaFormacaoComponent implements OnInit {
    @Input() colList: string[] = [];
    @Input() rowList: FuncFormacao[] = [];
    @Input() skillTypes: string[] = [];

    col1!: string;
    col2!: string;
    col3!: string;

    type1!: string;
    type2!: string;
    type3!: string;
    type4!: string;

    expandedElement!: any;

    fullElement!: any;
    rowId!: any;
    dateI!: any;
    dateF!: any;

    user$: Observable<User>;
    user!: User;

    constructor(
        private eventBus: NgEventBus,
        private formacaoService: FormacaoService,
        private userService: UserService
    ) 
    {        
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    ngOnInit(): void 
    {
        this.eventBus.on('formacao').subscribe((meta: MetaData) => {
            if (meta.data == 'success') {
                this.formacaoService.getAllFormacaoByFuncId(this.user.id).subscribe(formacaoUser => {
                    this.rowList = formacaoUser;                    
                })
            }
        });

        this.col1 = this.colList[0];
        this.col2 = this.colList[1];
        this.col3 = this.colList[2];

        this.type1 = this.skillTypes[0];
        this.type2 = this.skillTypes[1];
        this.type3 = this.skillTypes[2];
    }

    cellClicked(element: any) {
        this.fullElement = element
        this.rowId = element.id;
        this.dateI = new Date(element.data_inicio);
        this.dateF = new Date(element.data_fim);
    }
}

