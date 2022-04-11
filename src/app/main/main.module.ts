import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main.component';
import { MainBoxTitleComponent } from './components/main-box-title/main-box-title';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { DemoNgZorroAntdModule } from './demongzorroantdmodule';
import { MainService } from './main.service';
import { MainComponentModule } from './components/main.component.module';



@NgModule(
    {
        declarations: 
        [
            MainComponent
        ],
        
        imports:
        [ 
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            HttpClientJsonpModule,
            DemoNgZorroAntdModule,
            BrowserAnimationsModule,
            ScrollingModule,
            DragDropModule,
            MainComponentModule
        ],

        providers: 
        [
            MainService
        ]
    }
)
export class MainModule {}