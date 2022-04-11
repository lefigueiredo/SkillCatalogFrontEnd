import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { ExperienciaService } from './experiencia.service';
import { NewExperiencia } from './newExperiencia';


@Component(
    {
        templateUrl: './experiencia.component.html'
    }
)

export class ExperienciaComponent implements OnInit
{
    expForm!: FormGroup;

    user$: Observable<User>;
    user!: User;
    allExperiencias!: any[];

    constructor(
        private formBuilder: FormBuilder, 
        private experienciaService: ExperienciaService,
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
        this.allExperiencias = this.activatedRoute.snapshot.data.experiencias;
        this.expForm = this.formBuilder.group(
            { 
                titulo: ['', Validators.required],
                empresa: ['', Validators.required], 
                data_inicio: ['', Validators.required],
                data_fim: ['', Validators.required],               
            }
        )        
    }   
    
    sendExperiencia()
    {            
        const newExperiencia  = this.expForm.getRawValue() as NewExperiencia       
        this.experienciaService
            .sendExperiencia(newExperiencia, this.user.id)
            .subscribe(
                () => this.router.navigate(['']), // se der boa, joga pra tela de login
                err => 
                {
                    console.log(err)
                    this.expForm.reset();
                }
            )
    }
}
