import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { User } from '../../core/user/user';
import { UserService } from '../../core/user/user.service';
import { ProfileService } from '../profile.service';

@Component(
    {
        selector: 'sc-profile-pwd',
        templateUrl: './pwd.component.html',
        styleUrls: ['./pwd.component.css']
    }
)

export class PwdComponent implements OnInit
{
    pswForm!: FormGroup;
    errorMsg: string;
    user$: Observable<User>;
    user!: User;

    constructor(
        private formBuilder: FormBuilder,  
        private profileService: ProfileService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private eventBus: NgEventBus,
        private notification: NzNotificationService,
        private userService: UserService
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    ngOnInit(): void
    {           
        this.pswForm = this.formBuilder.group(
        { 
            oldPws: ['', Validators.required],
            newPsw: ['', Validators.required] 
        }) 
    }     
    
    sendIdioma()
    {            
        const newPsw = this.pswForm.getRawValue()       
        this.profileService
            .changePws(this.user.id, newPsw)
            .subscribe(
                () => 
                {
                    this.errorMsg = ''
                    this.pswForm.reset()
                    this.notification.success( // msg de sucesso
                        'Senha alterada com sucesso!!',
                        '',
                        { nzPlacement: 'bottomLeft' }
                    )
                },
                err => 
                {
                    this.notification.warning( // msg de sucesso
                        JSON.stringify(err.error.msg).replace('"',''),
                        '',
                        { nzPlacement: 'bottomLeft' }
                    )
                    this.pswForm.reset();
                }
            )
    }
}
