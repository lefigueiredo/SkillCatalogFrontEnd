import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { IdiomaComponent } from './idioma/idioma.component';
import { IdiomaService } from './idioma/idioma.service';
import { TabelaModule } from './idioma/table/tabela.module';
import { MainModule } from '../main/main.module';
import { MainComponentModule } from '../main/components/main.component.module';
import { ProfileModule } from '../images/profile.module';
import { IdiomaNewComponent } from './idioma/addNew/idioma.new.component';
import { ChartModule } from 'primeng/chart';

@NgModule(
    {
        declarations: 
        [
            IdiomaComponent,
            IdiomaNewComponent
        ],
        
        imports:
        [ 
            CommonModule,   
            VMessageModule,
            RouterModule,
            FormsModule,
            ReactiveFormsModule,
            NzRadioModule,
            NzFormModule,
            MainModule,
            MainComponentModule,
            NzPopoverModule,
            NzSelectModule,
            NzTableModule,
            TabelaModule,
            ProfileModule,
            ChartModule
        ],

        providers: 
        [
            IdiomaService
        ]
    }
)
export class IdiomaModule {}