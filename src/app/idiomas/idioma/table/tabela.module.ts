import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import { TabelaComponent } from './tabela.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TableDialogComponent } from './tabela.dialog.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { TableDeleteComponent } from './tabela.delete.component';
import { IdiomaRadarComponent } from './tabela.radar.component';
import { ChartModule } from 'primeng/chart';

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
            ChartModule
        ],
        
        declarations:
        [
            TabelaComponent,
            TableDialogComponent,
            TableDeleteComponent,
            IdiomaRadarComponent
        ],

        exports:
        [
            TabelaComponent,
            MatTableModule,
            NzModalModule,
            NzButtonModule,
            NzNotificationModule,
            IdiomaRadarComponent
        ]
    }
)

export class TabelaModule{}