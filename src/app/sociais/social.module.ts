import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SocialComponent } from './social/social.component';
import { SocialService } from './social/social.service';

@NgModule(
    {
        declarations: 
        [
            SocialComponent
        ],
        
        imports:
        [ 
            CommonModule,   
            RouterModule,
            FormsModule,
            ReactiveFormsModule
               
        ],

        providers: 
        [
            SocialService
        ]
    }
)
export class SocialModule {}