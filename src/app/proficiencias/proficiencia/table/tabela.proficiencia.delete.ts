import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService} from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { ProficienciaService } from '../proficiencia.service';


@Component(
  {
    selector: 'sc-prof-delete',
    templateUrl: './tabela.proficiencia.delete.html',
    styleUrls: ['./tabela.proficiencia.delete.css']
  })
export class TableProficienciaDeleteComponent implements OnInit {  

    @Input() id!: string;
    @Input() nome!: string;

    isVisible = false;

    user$: Observable<User>;
    user!: User;

    placement = 'topRight';

    constructor(
        private proficienciaService: ProficienciaService,
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
        this.eventBus.cast('proficiencia', event);
    }

    deleteItem()
    {        
        this.proficienciaService
            .deleteProficiencia(this.id)
            .subscribe(() => 
                {
                    this.notification.success( // msg de sucesso
                        'Proficiência deletada com sucesso!!',
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
          nzTitle: 'Deletar Proficiência ',
          nzContent: 'Tem certeza que deseja remover essa proficiência?',
          nzOkText: 'Deletar',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => this.deleteItem(),
          nzCancelText: 'Não',
          nzOnCancel: () => console.log('Cancel')
        });
    }
}