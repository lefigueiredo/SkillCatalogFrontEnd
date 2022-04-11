import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExperienciaComponent } from './experiencia/experiencia.component';

import { ExperienciaService } from './experiencia/experiencia.service';

@NgModule(
    {
        declarations: 
        [
            ExperienciaComponent
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
            ExperienciaService
        ]
    }
)
export class ExperienciaModule {}