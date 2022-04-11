import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { UserService } from 'src/app/core/user/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { RegistroService } from '../registro/registro.service';

@Component(
    {
        selector: 'sc-table-regis',
        templateUrl: './tabela.registro.component.html',
        styleUrls: ['./tabela.registro.component.css'],
        animations: [
            trigger('detailExpand', [
                state('collapsed', style({ height: '0px', minHeight: '0' })),
                state('expanded', style({ height: '*' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ])
        ]
    }
)

export class TabelaRegistroComponent implements OnInit 
{
    @Input() colList: string[] = [];
    @Input() rowList: any[] = [];
    @Input() skillTypes: string[] = [];

    col1!: string;
    col2!: string;
    col3!: string;

    type1!: string;
    type2!: string;
    type3!: string;
    type4!: string;

    expandedElement!: any;

    user$: Observable<User>;
    user!: User;

    rowFuncNome!: string;
    rowFuncCargo!: string;
    rowFuncTime!: string;
    rowUserEmail!: string;
    rowUserNv!: string;
    rowUserId!: string;

    constructor(
        private eventBus: NgEventBus,
        private registroService: RegistroService,
        private userService: UserService
    ) 
    {        
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    ngOnInit(): void 
    {
        this.col1 = this.colList[0];
        this.col2 = this.colList[1];
        this.col3 = this.colList[2];

        this.type1 = this.skillTypes[0];
        this.type2 = this.skillTypes[1];
        this.type3 = this.skillTypes[2];
    }

    cellClicked(element:any) 
    {
        this.rowFuncNome = element.funcNome
        this.rowFuncCargo = element.funcCargo
        this.rowFuncTime = element.funcTime
        this.rowUserEmail = element.usuarioEmail
        this.rowUserNv = element.usuarioNv
        this.rowUserId = element.userarioId
    }
}

