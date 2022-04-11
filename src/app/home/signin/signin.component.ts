import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';
import { ProfileService } from 'src/app/images/profile.service';

//Componente referente ao login (visual)

@Component(
    {
        templateUrl: './signin.component.html',
        styleUrls: ['./signin.component.scss']
    }
)

export class SignInComponent implements OnInit
{
    loginForm!: FormGroup;
    @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;
    notMobile!: boolean;
    dialogPwdVisible = false;
    customForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlataformDetectorService,
        private eventBus: NgEventBus,
        private profileService: ProfileService,
        private notification: NzNotificationService
    ) { }
    
    ngOnInit(): void 
    {       
        this.loginForm = this.formBuilder.group(
            {
                userName: ['', Validators.required],
                psw: ['', Validators.required]
            }
        ); 
        
        this.customForm = this.formBuilder.group(
        { 
            email: ['', Validators.required]
        }) 
    }

    ngAfterViewInit()
    { 
        if (this.platformDetectorService.isPlatformBrowser())
        { 
            this.notMobile = true
            this.userNameInput.nativeElement.focus(); 
        } 
        else
        {
            this.notMobile = false;
        }
    }

    login()
    {
        const userName = this.loginForm.get('userName')?.value;
        const psw = this.loginForm.get('psw')?.value;

        this.authService
            .authenticate(userName, psw)
            .subscribe(()=> 
                {
                    this.router.navigate(['main'])                    
                },
                err => 
                {
                    console.log(err);
                    this.loginForm.reset();
                    this.platformDetectorService.isPlatformBrowser() && this.userNameInput.nativeElement.focus();
                }
            );
    }

    showModal(): void 
    {
        this.dialogPwdVisible = true;
    }

    handleOk(): void 
    {
        this.dialogPwdVisible = false;
    }

    handleCancel(): void 
    {
        this.dialogPwdVisible = false;
    }

    resetPassword() 
    {
        const reset = this.customForm.getRawValue()
        this.profileService
        .resetPws(reset.email)
        .subscribe(() => 
            {
                this.customForm.reset()
                this.notification.success( // msg de sucesso
                    'Senha enviada para o email com sucesso',
                    '',
                    { nzPlacement: 'topLeft' }
                )
                this.dialogPwdVisible = false;
            },
            err => 
            {
                this.customForm.reset();
                this.notification.error( // msg de sucesso
                    'Email inválido',
                    '',
                    { nzPlacement: 'topLeft' },
                )
            }
        )
    }

}
