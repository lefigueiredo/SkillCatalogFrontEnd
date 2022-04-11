import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService} from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { IdiomaService } from 'src/app/idiomas/idioma/idioma.service';


@Component(
  {
    selector: 'sc-table-delete',
    templateUrl: './tabela.delete.component.html',
    styleUrls: ['./tabela.delete.component.css']
  })
export class TableDeleteComponent implements OnInit {  

    @Input() idiomaName!: string;

    isVisible = false;

    user$: Observable<User>;
    user!: User;

    placement = 'topRight';

    constructor(
        private idiomaService: IdiomaService,
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
        this.eventBus.cast('idioma', event);
    }

    deleteItem()
    {
        const newItem:any = {idioma: this.idiomaName}
        this.idiomaService
            .deleteIdioma(this.user.id, newItem)
            .subscribe(() => 
                {
                    this.notification.success( // msg de sucesso
                        'Idioma deletado com sucesso!!',
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
          nzTitle: 'Deletar Idioma',
          nzContent: 'Tem certeza que deseja remover esse idioma?',
          nzOkText: 'Deletar',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => this.deleteItem(),
          nzCancelText: 'Não',
          nzOnCancel: () => console.log('Cancel')
        });
    }
}