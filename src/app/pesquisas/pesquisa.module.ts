import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion'; 
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MainModule } from '../main/main.module';
import { MainComponentModule } from '../main/components/main.component.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PesquisaService } from './pesquisa/pesquisa.service';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
 
@NgModule(
    {
        declarations:
        [
           PesquisaComponent
        ],

        imports: 
        [
            CommonModule,
            TableModule,
            ButtonModule,
            RatingModule,
            AccordionModule,
            MainModule,
            MainComponentModule,
            NzFormModule,
            NzSelectModule,
            NzTableModule,
            TooltipModule,
            RippleModule
        ],

        providers: 
        [
            PesquisaService
        ]
    }
)
export class PesquisaModule {}