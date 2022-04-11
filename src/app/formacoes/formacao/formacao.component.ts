import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../core/user/user';
import { FormacaoService } from './formacao.service';
import { UserService } from 'src/app/core/user/user.service';
import { NewFormacao } from './newFormacao';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { NgEventBus } from 'ng-event-bus';
import { FuncFormacao } from './FuncFormacao';
import { NzNotificationService } from 'ng-zorro-antd/notification';
  
@Component(
    {
        styleUrls: ['./formacao.component.css'],
        templateUrl: './formacao.component.html'
    }
)

export class FormacaoComponent implements OnInit
{
    formaForm!: FormGroup;

    user$: Observable<User>;
    user!: User;
    allFormations!: FuncFormacao[];
    enUsLocale = en_US;
    dataI: any;
    dataF: any;

    listOfColumn = ['Diploma', 'Área', 'icon']
    listOfType = ['INSTITUIÇÃO', 'INICIO', 'CONCLUSÃO']

    
    constructor(
        private formBuilder: FormBuilder, 
        private formacaoService: FormacaoService,
        private router: Router,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private i18n: NzI18nService,
        private eventBus: NgEventBus,
        private notification: NzNotificationService
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    ngOnInit(): void
    {
        this.i18n.setLocale(en_US);
        this.allFormations = this.activatedRoute.snapshot.data.formacoes;

        this.formaForm = this.formBuilder.group(
        {
            instituicao: ['', Validators.required],
            diploma: ['', Validators.required], 
            area: ['', Validators.required],
            data_inicio: ['', Validators.required],
            data_fim: ['', Validators.required],               
        })
    }
    
    sendFormacao()
    {            
        const newFormacao = this.formaForm.getRawValue() as NewFormacao    
        this.formacaoService
            .sendFormacao(newFormacao, this.user.id)
            .subscribe(
                () =>
                {
                    this.formacaoService.getAllFormacaoByFuncId(this.user.id).subscribe(formacaoUser => {
                        this.allFormations = formacaoUser;
                        this.formaForm.reset()
                        this.notification.success( // msg de sucesso
                            'Formação Acadêmica adicionada com sucesso!!',
                            '',
                            { nzPlacement: 'bottomLeft' }
                        )
                        this.eventBus.cast('formacao', 'success');
                    });
                }, 
                err => 
                {
                    this.notification.warning( // msg de sucesso
                        JSON.stringify(err.error.msg).replace('"', ''),
                        '',
                        { nzPlacement: 'bottomLeft' }
                    )
                    this.formaForm.reset();
                }
            )
    }
    
    confirmationValidator = (control: FormControl): { [s: string]: boolean } => 
    {
        if (!control.value) 
        {
            return { required: true };
        } 

        return {};
    };
}
