import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgEventBus } from 'ng-event-bus';
import { NzNotificationService, NzNotificationPlacement } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { FormacaoService } from '../formacao/formacao.service';


@Component(
    {
        selector: 'sc-forma-dialog',
        templateUrl: './tabela.formacao.dialog.html',
        styleUrls: ['./tabela.formacao.dialog.css']
    }
)
  
export class TableFormacaoDialogComponent implements OnInit 
{    
    @Input('fullElement') fullElement!: any;
    @Input() dateI!: any;
    @Input() dateF!: any;

    isVisible = false;

    customForm!: FormGroup;
    user$: Observable<User>;
    user!: User;

    placement = 'topRight';

    constructor(
        private formBuilder: FormBuilder, 
        private formacaoService: FormacaoService,
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
            instituicao: ['', Validators.required],
            diploma: ['', Validators.required],
            area: ['', Validators.required],
            data_inicio: ['', Validators.required],
            data_fim: ['', Validators.required]
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
        this.eventBus.cast('formacao', event);
    }

    updateItem()
    {
        const newItem = this.customForm.getRawValue() 
        this.formacaoService
            .updateFormacao(newItem, this.fullElement?.id)
            .subscribe(
                (data) => 
                {
                this.notification.success( // msg de sucesso
                    'Formação Acadêmica atualizada com sucesso!!',
                    '',
                    { nzPlacement: 'bottomRight' }
                )

                this.handleOk();
                this.emitEvent('success'); //enviando notificação para Topico que vai ser ouvido
                },
                err => 
                {
                this.notification.warning( // msg de erro
                    'Formação Acadêmica não foi alterada!!',
                    'Selecione todas as opções!',
                    { nzPlacement: 'bottomRight' }
                )
                this.customForm.reset();
                }
            )
    } 
}