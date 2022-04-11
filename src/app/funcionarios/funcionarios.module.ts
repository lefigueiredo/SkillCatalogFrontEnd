import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { FuncionarioComponent } from './funcionario/funcionario.component';

 
@NgModule(
    {
        declarations:
        [
            FuncionarioComponent
        ],

        imports: 
        [
            HttpClientModule,
            CommonModule
        ]
    }
)
export class FuncionariosModule {}