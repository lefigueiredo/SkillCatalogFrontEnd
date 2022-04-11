import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { NzNotificationService, NzNotificationPlacement } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { ProficienciaService } from '../proficiencia.service';


@Component(
    {
        selector: 'sc-prof-dialog',
        templateUrl: './tabela.proficiencia.dialog.html',
        styleUrls: ['./tabela.proficiencia.dialog.css']
    })

export class ProficienciaDialogComponent implements OnInit {
  
    @Input() rowReuse!: string;
    @Input() rowEscrita!: string;
    @Input() rowRefactor!: string;
    @Input() rowProblema!:string;
    @Input() rowNome!:string;
    @Input() rowId!:string;

    isVisible = false;

    customForm!: FormGroup;
    user$: Observable<User>;
    user!: User;

    placement = 'topRight';

    constructor(
        private formBuilder: FormBuilder, 
        private proficienciaService: ProficienciaService,
        private userService: UserService,
        private cd: ChangeDetectorRef,
        private notification: NzNotificationService,
        private eventBus: NgEventBus
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user) 
    }

    
    ngOnInit():void 
    {    
        this.cd.detectChanges();

        this.customForm = this.formBuilder.group(
        { 
        reuse: ['', Validators.required],
        escrita: ['', Validators.required],
        problema: ['', Validators.required],
        refactor: ['', Validators.required]
        })
    }

    showModal(): void 
    {
        this.isVisible = true;
    }

    handleOk(): void 
    {
        this.isVisible = false;
    }

    handleCancel(): void 
    {
        this.isVisible = false;
    }

    emitEvent(event: string) // Emitindo evento para qe o componente pai possa atualizar a lista
    {
        this.eventBus.cast('proficiencia', event);
    }

    updateItem()
    {
        const newItem = this.customForm.getRawValue()
        this.proficienciaService
            .updateProficiencia(newItem, this.rowId)
            .subscribe(
                (data) => 
                {
                    this.notification.success( // msg de sucesso
                        'Proficiência ' + this.rowNome + ' atualizada com sucesso!!',
                        '',
                        { nzPlacement: 'bottomRight' }
                    )

                    this.handleOk();
                    this.emitEvent('success'); //enviando notificação para Topico que vai ser ouvido
                },
                err => 
                {
                    this.notification.warning( // msg de erro
                        'A Proficiência não foi alterada!!',
                        'Selecione todas as opções!',
                        { nzPlacement: 'bottomRight' }
                    )
                this.customForm.reset();
                }
            )
    } 
}