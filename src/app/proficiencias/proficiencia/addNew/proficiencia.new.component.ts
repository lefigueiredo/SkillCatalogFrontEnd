import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


import { ProficienciaService } from '../proficiencia.service';

import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component(
    {
        selector: 'sc-proficiencia-new',
        templateUrl: './proficiencia.new.component.html',
        styleUrls: ['./proficiencia.new.component.css']
    }
)

export class ProficienciaNewComponent implements OnInit
{
    proficienciaForm!: FormGroup;
    errorMsg: string;
    radioValueS:any;

    constructor(
        private formBuilder: FormBuilder,  
        private proficienciaService: ProficienciaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private eventBus: NgEventBus,
        private notification: NzNotificationService,
    ) {}

    ngOnInit(): void
    {           
        this.proficienciaForm = this.formBuilder.group(
        { 
            nome: ['', Validators.required],
            // tipo: ['', Validators.required]            
        }) 
    } 
    
    emitEvent(event: string)
    {
        this.eventBus.cast('newProficiencia', event);
    }
    
    sendIdioma()
    {            
        const newProficiencia = this.proficienciaForm.getRawValue()       
        this.proficienciaService
            .addNewProficiencia(newProficiencia)
            .subscribe(
                () => 
                {
                    this.errorMsg = ''
                    this.proficienciaForm.reset()
                    this.notification.success( // msg de sucesso
                        'Proficiencia ' + newProficiencia.nome + ' adicionada com sucesso!!',
                        '',
                        { nzPlacement: 'bottomLeft' }
                    )
                    this.emitEvent('success');
                },
                err => 
                {
                    this.notification.warning( // msg de sucesso
                        JSON.stringify(err.error.msg).replace('"',''),
                        '',
                        { nzPlacement: 'bottomLeft' }
                    )
                    this.proficienciaForm.reset();
                }
            )
    }
}
