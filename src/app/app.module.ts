import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IconDefinition } from '@ant-design/icons-angular';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { CoreModule } from './core/core.module';
import { IdiomaModule } from './idiomas/idiomas.module';
import { FormacaoModule } from './formacoes/formacao.module';
import { ExperienciaModule } from './experiencias/experiencia.module';
import { SocialModule } from './sociais/social.module';
import { ProficienciaModule } from './proficiencias/proficiencia.module';
import { MainModule } from './main/main.module';
import { DemoNgZorroAntdModule } from './main/demongzorroantdmodule';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgEventBus } from 'ng-event-bus';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PesquisaModule } from './pesquisas/pesquisa.module';
import { RegistroModule } from './registros/registro.module';
import { ProfileModule } from './images/profile.module';

@NgModule(
  {
    declarations: 
    [
      AppComponent
    ],

    imports: 
    [
      BrowserModule,
      FuncionariosModule,
      CoreModule,
      AppRoutingModule,
      IdiomaModule,
      FormacaoModule,
      ExperienciaModule,
      SocialModule,
      ProficienciaModule,
      MainModule,
      DemoNgZorroAntdModule,
      NzLayoutModule,
      NzIconModule,
      RouterModule,
      NoopAnimationsModule,
      PesquisaModule,
      RegistroModule,
      ProfileModule
    ],

    providers: [
      NgEventBus
    ],

    bootstrap: 
    [
      AppComponent
    ]
  }
)

export class AppModule {}
