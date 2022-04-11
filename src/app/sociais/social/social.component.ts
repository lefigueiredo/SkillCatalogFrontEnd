import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { SocialService } from './social.service';
import { NewSocial } from './newSocial';


@Component(
    {
        templateUrl: './social.component.html'
    }
)

export class SocialComponent implements OnInit
{
    socialForm!: FormGroup;

    user$: Observable<User>;
    user!: User;
    allSociais!: any[];

    constructor(
        private formBuilder: FormBuilder, 
        private socialService: SocialService,
        private router: Router,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user)
    }

    ngOnInit(): void
    {            
        this.allSociais = this.activatedRoute.snapshot.data.sociais;
        this.socialForm = this.formBuilder.group(
            { 
                nome: ['', Validators.required],
                link: ['', Validators.required]             
            }
        )        
    }   
    
    sendSocial()
    {            
        const newSocial  = this.socialForm.getRawValue() as NewSocial       
        this.socialService
            .sendSocial(newSocial, this.user.id)
            .subscribe(
                () => this.router.navigate(['']), // se der boa, joga pra tela de login
                err => 
                {
                    console.log(err)
                    this.socialForm.reset();
                }
            )
    }
}
