import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

import { ImageCropperModule } from 'ngx-image-cropper';
import { MainComponentModule } from '../main/components/main.component.module';
import { DemoNgZorroAntdModule } from '../main/demongzorroantdmodule';
import { MainModule } from '../main/main.module';
import { ProfileComponent } from './profile.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from './profile.service';
import { AvatarModule } from './avatar/avatar.module';
import { PwdComponent } from './psw/pwd.component';
import { PwdModule } from './psw/pwd.module';


@NgModule(
  {
    declarations: 
    [
      ProfileComponent
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
      FileUploadModule,
      AvatarModule,
      PwdModule
    ],

    exports:
    [
      ProfileComponent
    ],

    providers: 
        [
            ProfileService
        ]
  }
)

export class ProfileModule { }