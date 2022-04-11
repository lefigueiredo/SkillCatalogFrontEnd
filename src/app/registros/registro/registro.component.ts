import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { NgEventBus } from 'ng-event-bus';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RegistroService } from './registro.service';
import { Registro } from './registros';
  
@Component(
    {
        styleUrls: ['./registro.component.css'],
        templateUrl: './registro.component.html'
    }
)

export class RegistroComponent implements OnInit
{
    userForm!: FormGroup;

    user$: Observable<User>;
    user!: User;
    allRegistros!: any[];
    enUsLocale = en_US;
    dataI: any;
    dataF: any;
    userNv: boolean;

    listOfColumn = ['Funcionário', 'Função', 'icon']
    listOfType = ['TIME', 'USUÁRIO', 'EMAIL']
    radioValue = '';

    mapNivelSkill: any =
    {
        'admin': "ADMINISTRADOR",
        'usuario': "USUÁRIO",
        'rh': "RH"
    }
    
    constructor(
        private formBuilder: FormBuilder, 
        private registroService: RegistroService,
        private router: Router,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private i18n: NzI18nService,
        private eventBus: NgEventBus,
        private notification: NzNotificationService
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => 
            {
                this.user = user
                this.userNv = user.nv === 'admin'
            }
        )
        this.userNv = (this.user.nv == "admin");
    }

    ngOnInit(): void
    {
        this.eventBus.on('registro').subscribe((meta: MetaData) => 
        {
            if (meta.data == 'success') 
            {
                this.registroService.getAllRegistros().subscribe(registroUser => 
                    {
                        this.allRegistros = registroUser;     
                        this.traduzRegistro()               
                    }
                )
            }
        });

        this.userNv = (this.user.nv == "admin");
        this.allRegistros = this.activatedRoute.snapshot.data.allReg;
        this.traduzRegistro()

        this.userForm = this.formBuilder.group(
        {
            userName: ['', Validators.required],
            userEmail: ['', Validators.required], 
            userType: ['', Validators.required],  
            userOccupation: ['', Validators.required],   
            userTeam: ['', Validators.required]
        })
    }
    
    sendFormacao()
    {            
        const newFormacao = this.userForm.getRawValue()   
        this.registroService
            .sendRegistro(newFormacao)
            .subscribe(
                () =>
                {
                    this.registroService.getAllRegistros().subscribe(registroUser => {
                        this.allRegistros = registroUser;
                        this.traduzRegistro()
                        this.userForm.reset()
                        this.notification.success( // msg de sucesso
                            'Novo funcionário adicionado com sucesso!!',
                            '',
                            { nzPlacement: 'bottomLeft' }
                        )
                        this.eventBus.cast('registro', 'success');
                    });
                }, 
                err => 
                {
                    this.notification.warning( // msg de sucesso
                        JSON.stringify(err.error.msg).replace('"', ''),
                        '',
                        { nzPlacement: 'bottomLeft' }
                    )
                    this.userForm.reset();
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

    traduzRegistro() {
        for (let i = 0; i < this.allRegistros.length; i++) {
            this.allRegistros[i].tipo_display = this.mapNivelSkill[this.allRegistros[i].usuarioNv];
        }
    }
}
