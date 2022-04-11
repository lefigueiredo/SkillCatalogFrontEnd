import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { TabelaModule } from '../idiomas/idioma/table/tabela.module';
import { MainComponentModule } from '../main/components/main.component.module';
import { MainModule } from '../main/main.module';
import { FormacaoComponent } from './formacao/formacao.component';
import { FormacaoService } from './formacao/formacao.service';

import { TabelaFormacaoModule } from './table/tabela.formacao.module';

@NgModule(
    {
        declarations: 
        [
            FormacaoComponent
        ],
        
        imports:
        [ 
            CommonModule,   
            RouterModule,
            FormsModule,
            ReactiveFormsModule,
            NzFormModule,
            MainModule,
            MainComponentModule,
            NzSelectModule,
            NzTableModule,
            TabelaModule,
            MatDatepickerModule,
            MatFormFieldModule,
            MatNativeDateModule,
            MatInputModule,
            NzDatePickerModule,
            TabelaFormacaoModule
        ],

        providers: 
        [
            FormacaoService
        ]
    }
)
export class FormacaoModule {}