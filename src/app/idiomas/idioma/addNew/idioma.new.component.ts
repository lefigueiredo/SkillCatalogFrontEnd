import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


import { IdiomaService } from '../idioma.service';

import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component(
    {
        selector: 'sc-idioma-new',
        templateUrl: './idioma.new.component.html',
        styleUrls: ['./idioma.new.component.css']
    }
)

export class IdiomaNewComponent implements OnInit
{
    idiomaForm!: FormGroup;
    errorMsg: string;

    constructor(
        private formBuilder: FormBuilder,  
        private idiomaService: IdiomaService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private eventBus: NgEventBus,
        private notification: NzNotificationService,
    ) {}

    ngOnInit(): void
    {           
        this.idiomaForm = this.formBuilder.group(
        { 
            nome: ['', Validators.required]            
        }) 
    } 
    
    emitEvent(event: string)
    {
        this.eventBus.cast('newidioma', event);
    }
    
    sendIdioma()
    {            
        const newIdioma = this.idiomaForm.getRawValue()       
        this.idiomaService
            .addNewIdioma(newIdioma)
            .subscribe(
                () => 
                {
                    this.errorMsg = ''
                    this.idiomaForm.reset()
                    this.notification.success( // msg de sucesso
                        'Idioma ' + newIdioma.nome + ' adicionado com sucesso!!',
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
                    this.idiomaForm.reset();
                }
            )
    }
}
