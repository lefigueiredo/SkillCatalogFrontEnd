import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { NzNotificationService, NzNotificationPlacement } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { IdiomaService } from 'src/app/idiomas/idioma/idioma.service';


@Component(
  {
    selector: 'sc-table-dialog',
    templateUrl: './tabela.dialog.component.html',
    styleUrls: ['./tabela.dialog.component.css']
  })
export class TableDialogComponent implements OnInit {
  
  @Input() rowItemId!: string;
  @Input() rowLeitura!: string;
  @Input() rowEscrita!: string;
  @Input() rowAudicao!: string;
  @Input() rowFala!:string;

  isVisible = false;

  customForm!: FormGroup;
  user$: Observable<User>;
  user!: User;

   placement = 'topRight';

  constructor(
    private formBuilder: FormBuilder, 
    private idiomaService: IdiomaService,
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
      leitura: ['', Validators.required],
      escrita: ['', Validators.required],
      audicao: ['', Validators.required],
      fala: ['', Validators.required],
      idioma: ['']               
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
    this.eventBus.cast('idioma', event);
  }

  updateItem()
  {
    const newItem = this.customForm.getRawValue() 
    newItem.idioma = this.rowItemId
    this.idiomaService
        .updateIdioma(this.user.id, newItem)
        .subscribe(
            (data) => 
            {
              this.notification.success( // msg de sucesso
                this.rowItemId + ' atualizado com sucesso!!',
                '',
                { nzPlacement: 'bottomRight' }
              )

              this.handleOk();
              this.emitEvent('success'); //enviando notificação para Topico que vai ser ouvido
            },
            err => 
            {
              this.notification.warning( // msg de erro
                'Idioma não foi alterado!!',
                'Selecione todas as opções!',
                { nzPlacement: 'bottomRight' }
              )
              this.customForm.reset();
            }
        )
  } 
}