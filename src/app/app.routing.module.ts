import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './core/header/header.component';
import { ExperienciaComponent } from './experiencias/experiencia/experiencia.component';
import { ExperienciaResolver } from './experiencias/experiencia/experiencia.resolver';
import { FormacaoComponent } from './formacoes/formacao/formacao.component';
import { FormacaoResolver } from './formacoes/formacao/formacao.resolver';
import { IdiomaFromFuncResolver } from './idiomas/idioma/idioma-fromFunc.resolver';
import { IdiomaComponent } from './idiomas/idioma/idioma.component';
import { IdiomaResolver } from './idiomas/idioma/idioma.resolver';
import { MainComponent } from './main/main.component';
import { MainBarColorResolver } from './main/resolver/main-bar-color.resolver';
import { MainExpResolver } from './main/resolver/main-exp.resolver';
import { MainFormaResolver } from './main/resolver/main-forma.resolver';
import { MainIdiResolver } from './main/resolver/main-idi.resolver';
import { MainProfResolver } from './main/resolver/main-prof.resolver';
import { MainProfsResolver } from './main/resolver/main-profs.resolver';
import { MainTimeResolver } from './main/resolver/main-time.resolver';
import { PesquisaComponent } from './pesquisas/pesquisa/pesquisa.component';
import { PesquisaResolver } from './pesquisas/pesquisa/pesquisa.resolver';
import { ProficienciaFromFuncResolver } from './proficiencias/proficiencia/proficiencia-fromFunc.resolver';
import { ProficienciaComponent } from './proficiencias/proficiencia/proficiencia.component';
import { ProficienciaResolver } from './proficiencias/proficiencia/proficiencia.resolver';
import { ProfileComponent } from './images/profile.component';
import { ProfileResolver } from './images/profile.resolver';
import { RegistroComponent } from './registros/registro/registro.component';
import { RegistroResolver } from './registros/registro/registro.resolver';
import { SocialComponent } from './sociais/social/social.component';
import { SocialResolver } from './sociais/social/social.resolver';
import { ProfileAvatarResolver } from './images/avatar/profile.avatar.resolver';
import { FormaaResolver } from './images/profile.formaaa.resolver';


// Trata todas as rotas do front

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'home'
  }, 

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },

  {
    path: 'idiomas',
    component: IdiomaComponent,
    resolve: 
    {
      idiomas: IdiomaResolver,
      funcAllIdiomas: IdiomaFromFuncResolver
    }
  },

  {
    path: 'main',
    component: MainComponent,
    resolve: 
    {
      time: MainTimeResolver,
      prof: MainProfResolver,
      exp: MainExpResolver,
      forma: MainFormaResolver,
      barColor: MainBarColorResolver,
      idi: MainIdiResolver,
      profs: MainProfsResolver,
      capa: ProfileResolver,
      formaa: FormaaResolver
    }
  },

  {
    path: 'formacoes',
    component: FormacaoComponent,
    resolve: 
    {
      formacoes: FormacaoResolver
    }
  },

  {
    path: 'proficiencias',
    component: ProficienciaComponent,
    resolve: 
    {
      proficiencias: ProficienciaResolver,
      funcAllProficiencias: ProficienciaFromFuncResolver
    }
  },

  {
    path: 'experiencias',
    component: ExperienciaComponent,
    resolve: 
    {
      experiencias: ExperienciaResolver
    }
  },

  {
    path: 'social',
    component: SocialComponent,
    resolve: 
    {
      sociais: SocialResolver
    }
  },

  {
    path: 'pesquisa',
    component: PesquisaComponent,
    resolve: 
    {
      allSearch: PesquisaResolver
    }
  },

  {
    path: 'registro',
    component: RegistroComponent,
    resolve: 
    {
      allReg: RegistroResolver
    }
  },

  {
    path: 'profile',
    component: ProfileComponent,
    resolve: 
    {
      capa: ProfileResolver,
      profile: ProfileAvatarResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
