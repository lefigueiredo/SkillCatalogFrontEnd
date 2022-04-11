import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MainBoxExpComponent } from './main-box-exp/main-box-exp';
import { MainBoxFormaComponent } from './main-box-forma/main-box-forma';
import { MainBoxIdiComponent } from './main-box-idi/main-box-idi';
import { MainBoxTitleComponent } from './main-box-title/main-box-title';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { MainBoxProfComponent } from './main-box-prof/main-box-prof';

@NgModule(
    {
        declarations: 
        [
            MainBoxTitleComponent,
            MainBoxFormaComponent,
            MainBoxExpComponent,
            MainBoxIdiComponent,
            MainBoxProfComponent
        ],
        
        imports:
        [ 
            CommonModule,
            ReactiveFormsModule,
            HttpClientModule,
            HttpClientJsonpModule,
            NzProgressModule
        ],

        exports: 
        [
            MainBoxTitleComponent,
            MainBoxFormaComponent,
            MainBoxExpComponent,
            MainBoxIdiComponent,
            MainBoxProfComponent
        ]
    }
)
export class MainComponentModule {}