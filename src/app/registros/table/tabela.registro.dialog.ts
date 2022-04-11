import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { NgEventBus } from 'ng-event-bus';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { RegistroService } from '../registro/registro.service';


@Component(
    {
        selector: 'sc-regis-dialog',
        templateUrl: './tabela.registro.dialog.html',
        styleUrls: ['./tabela.registro.dialog.css']
    }
)
  
export class RegistroDialogComponent implements OnInit 
{    
    @Input() rowFuncNome!: string;
    @Input() rowFuncCargo!: string;
    @Input() rowFuncTime!: string;
    @Input() rowUserEmail!: string;
    @Input() rowUserNv!: string;
    @Input() rowUserId!: string;

    isVisible = false;

    customForm!: FormGroup;
    user$: Observable<User>;
    user!: User;

    placement = 'topRight';

    constructor(
        private formBuilder: FormBuilder, 
        private registroService: RegistroService,
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
            userName: ['', Validators.required],
            userEmail: ['', Validators.required],
            userType: ['', Validators.required],
            userOccupation: ['', Validators.required],
            userTeam: ['', Validators.required]
        }) 
    }

    showModal(): void 
    {
        this.isVisible = true;
        console.log(this.rowUserNv)
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
        this.eventBus.cast('registro', event);
    }

    updateItem()
    {
        const newItem = this.customForm.getRawValue()
        console.log(newItem) 
        this.registroService
            .updateRegistro(newItem, this.rowUserId)
            .subscribe(
                (data) => 
                {
                this.notification.success( // msg de sucesso
                    'Funcionário ' + this.rowFuncNome + ' atualizado com sucesso!!',
                    '',
                    { nzPlacement: 'bottomRight' }
                )

                this.handleOk();
                this.emitEvent('success'); //enviando notificação para Topico que vai ser ouvido
                },
                err => 
                {
                this.notification.warning( // msg de erro
                    'Funcionário não foi alterado!!',
                    'Selecione todas as opções!',
                    { nzPlacement: 'bottomRight' }
                )
                this.customForm.reset();
                }
            )
    } 
}