import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService} from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { RegistroService } from '../registro/registro.service';


@Component(
  {
    selector: 'sc-regis-delete',
    templateUrl: './tabela.registro.delete.html',
    styleUrls: ['./tabela.registro.delete.css']
  })
export class RegistroDeleteComponent implements OnInit {  

    @Input() id!: string;
    @Input() name!: string;

    isVisible = false;

    user$: Observable<User>;
    user!: User;

    placement = 'topRight';

    constructor(
        private registroService: RegistroService,
        private userService: UserService,
        private cd: ChangeDetectorRef,
        private notification: NzNotificationService,
        private eventBus: NgEventBus,
        private modal: NzModalService
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user) 
    }

    ngOnInit():void 
    {
        this.cd.detectChanges();
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
        this.eventBus.cast('registro', event);
    }

    deleteItem()
    {        
        this.registroService
            .deleteRegistro(this.id)
            .subscribe(() => 
                {
                    this.notification.success( // msg de sucesso
                        'Funcionário ' + this.name + ' deletado com sucesso!!',
                        '',
                        { nzPlacement: 'bottomRight' }
                    )

                    this.handleOk();
                    this.emitEvent('success'); //enviando notificação para Topico que vai ser ouvido
                },
                err => { }
            )
    } 

    showDeleteConfirm(): void 
    {
        this.modal.confirm(
        {
          nzTitle: 'Deletar Funcionário',
          nzContent: 'Tem certeza que deseja remover esse funcionário?',
          nzOkText: 'Deletar',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => this.deleteItem(),
          nzCancelText: 'Não',
          nzOnCancel: () => console.log('Cancel')
        });
    }
}