import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { signupService } from './signup/signup.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule(
    {
        declarations: 
        [
            SignInComponent,
            SignUpComponent,
            HomeComponent
        ],
        
        imports:
        [ 
            CommonModule,
            FormsModule,
            ReactiveFormsModule,            
            VMessageModule,
            RouterModule,
            HomeRoutingModule,
            NzModalModule,
            NzFormModule
        ],

        providers: 
        [
            signupService
        ]
    }
)
export class HomeModule {}