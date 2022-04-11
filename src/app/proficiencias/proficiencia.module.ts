import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MainComponentModule } from '../main/components/main.component.module';
import { DemoNgZorroAntdModule } from '../main/demongzorroantdmodule';
import { MainModule } from '../main/main.module';

import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { ProficienciaNewComponent } from './proficiencia/addNew/proficiencia.new.component';
import { ProficienciaComponent } from './proficiencia/proficiencia.component';
import { ProficienciaService } from './proficiencia/proficiencia.service';
import { ProficienciaRadarComponent } from './proficiencia/table/tabela.prof.radar.component';
import { TabelaProficienciaModule } from './proficiencia/table/tabela.proficiencia.module';

@NgModule(
    {
        declarations: 
        [
            ProficienciaComponent,
            ProficienciaNewComponent,
            ProficienciaRadarComponent
        ],
        
        imports:
        [ 
            CommonModule,   
            VMessageModule,
            RouterModule,
            FormsModule,
            ReactiveFormsModule,
            MainModule,
            MainComponentModule,
            TabelaProficienciaModule,
            NzRadioModule,
            NzFormModule,            
            NzPopoverModule,
            NzSelectModule,
            NzTableModule,            
            NzFormModule

        ],

        providers: 
        [
            ProficienciaService
        ]
    }
)
export class ProficienciaModule {}