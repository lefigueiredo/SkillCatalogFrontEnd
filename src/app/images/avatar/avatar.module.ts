import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

import { ImageCropperModule } from 'ngx-image-cropper';
import { MainComponentModule } from '../../main/components/main.component.module';
import { DemoNgZorroAntdModule } from '../../main/demongzorroantdmodule';
import { MainModule } from '../../main/main.module';
import { AvatarComponent } from './avatar.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../profile.service';


@NgModule(
  {
    declarations: 
    [
      AvatarComponent
    ],

    imports: 
    [
      CommonModule,
      RouterModule,
      ImageCropperModule,
      MainModule,
      MainComponentModule,
      NzTableModule,
      DemoNgZorroAntdModule,
      FileUploadModule
    ],

    exports:
    [
      AvatarComponent
    ],

    providers: 
        [
            ProfileService
        ]
  }
)

export class AvatarModule { }