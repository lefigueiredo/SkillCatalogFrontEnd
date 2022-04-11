import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NewUser } from './new-user';
import { signupService } from './signup.service';
import { UserDoesntExistValidatorService } from './user-doesnt-exist.validator.service';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';

@Component(
    {
        //selector: 'sc-signup', // Colocar como component para aparecer na tela para add posteriormente
        templateUrl: './signup.component.html',
        providers: [UserDoesntExistValidatorService]
    }
)
export class SignUpComponent implements OnInit
{
    signupForm!: FormGroup;
    profileImg:any

    constructor(
        private formBuilder: FormBuilder, 
        private userNotTakenValidatorService: UserDoesntExistValidatorService,
        private signupService: signupService,
        private router: Router,
        private platformDetectorService: PlataformDetectorService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void
    {    
        if (this.activatedRoute.snapshot.data.profile['dado'] === 'vazio')
        {
            this.profileImg = '../../assets/icons/profile.png'
        }

        else
        {
            this.profileImg = 'data:image/jpeg;base64,' + this.activatedRoute.snapshot.data.profile

        }

        this.signupForm = this.formBuilder.group(
            { userEmail: 
                [
                    '', 
                    [
                        Validators.required,
                        Validators.email
                    ]                    
                ],
                userType: ['', Validators.required],
                userName: ['', 
                    [
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(255)
                    ]
                ],
                userOccupation: ['', 
                    [
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(70)
                    ]
                ],
                userTeam: ['', 
                    [
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(45)
                    ]
                ]
            }
        )
    }   
    
    signup()
    {
        const newUser = this.signupForm.getRawValue() as NewUser
        this.signupService
            .signup(newUser)
            .subscribe(
                () => this.router.navigate(['']), // se der boa, joga pra tela de login
                err => 
                {
                    console.log(err)
                    this.signupForm.reset();
                }
            )
    }
}
