import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { TabelaFormacaoComponent } from './tabela.formacao.component';
import { TableFormacaoDialogComponent } from './tabela.formacao.dialog';
import { TableFormacaoDeleteComponent } from './tabela.formacao.delete';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule(
    {
        imports: 
        [
            CommonModule,
            MatTableModule,
            NzModalModule,
            NzButtonModule,
            FormsModule,
            ReactiveFormsModule,
            NzRadioModule,
            NzFormModule,
            NzPopoverModule,
            NzSelectModule,
            NzTableModule,
            NzNotificationModule,
            NzDatePickerModule
        ],
        
        declarations:
        [
            TabelaFormacaoComponent,
            TableFormacaoDialogComponent,
            TableFormacaoDeleteComponent
        ],

        exports:
        [
            TabelaFormacaoComponent,
            MatTableModule,
            NzModalModule,
            NzButtonModule,
            NzNotificationModule
        ]
    }
)

export class TabelaFormacaoModule{}