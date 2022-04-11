import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

import { signupService } from './signup.service';

@Injectable()
export class UserDoesntExistValidatorService 
{
    constructor(private signupService: signupService) {}

    checkUserEmailTaken()
    {
        return (control: AbstractControl) =>
        {
            return control
                .valueChanges
                .pipe(debounceTime(200)) // Espera eu fica x tempo sem digitar pra dai mandar a req
                .pipe(switchMap(userEmail => this.signupService.checkUserExists(userEmail)))
                .pipe(map(isTaken => isTaken ? { userEmailTaken: true} : null))
                .pipe(first())
        }
    }
}