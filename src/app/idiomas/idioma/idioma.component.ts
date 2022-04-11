import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { NewIdioma } from './newIdioma';
import { User } from '../../core/user/user';
import { IdiomaService } from './idioma.service';
import { UserService } from 'src/app/core/user/user.service';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component(
    {
        templateUrl: './idioma.component.html',
        styleUrls: ['./idioma.component.css']
    }
)

export class IdiomaComponent implements OnInit
{
    idiomaForm!: FormGroup;
    user$: Observable<User>;
    user!: User;
    allIdiomas: any;
    allFuncIdiomas: any;
    userNv: boolean;
    idiomaClicked: boolean = false;

    radioValueW = '';
    radioValueL = '';
    radioValueS = '';
    radioValueR = '';

    escIni = 'Sou capaz de escrever um \npostal simples e curto e \nficha com dados pessoais.';
    escInt = 'Sou capaz de escrever um \ntexto articulado de forma \nsimples e descrever \nexperiências e impressões.';
    escAva = 'Sou capaz de escrever um \ntexto claro e pormenorizado \nsobre uma vasta gama \nde assuntos.';
    escFlu = 'Sou capaz de escrever textos \nnum estilo fluente e \napropriado. Também fazer \nresumos de âmbito profissional.';
    leiIni = 'Sou capaz de compreender \nnomes conhecidos, palavras \ne frases muito simples.';
    leiInt = 'Sou capaz de compreender \ntextos e compreender descrições\n de acontecimentos e sentimentos.';
    leiAva = 'Sou capaz de ler artigos \ne reportagens sobre assuntos \ncontemporâneos e compreender\n textos literários.';
    leiFlu = 'Sou capaz de ler com \nfacilidade praticamente todas as \nformas de texto escrito, tais\n como manuais e artigos \nespecializados.';
    audIni = 'Sou capaz de reconhecer \npalavras e expressões simples\n quando me falam de forma clara\n e pausada.';
    audInt = 'Sou capaz de compreender os \npontos essenciais de uma\n sequência falada. Sou capaz de\n compreender os pontos principais\n de muitos programas de rádio e TV.';
    audAva = 'Sou capaz de compreender \nexposições longas e palestras.\n Consigo compreender a maior \nparte de filmes, desde que \nseja a língua padrão.';
    audFlu = 'Não tenho nenhuma dificuldade\n em compreender qualquer \ntipo de enunciado oral mesmo\n quando se fala depressa.';
    falIni = 'Sou capaz de utilizar expressões\n e frases simples num ritmo\n mais lento.';
    falInt = 'Sou capaz de articular\n expressões de forma simples, \nexplicar ou justificar opiniões\n e planos.';
    falAva = 'Sou capaz de me exprimir de \nforma clara e detalhada, capaz\n de explicar um ponto de vista\n sobre um dado assunto.';
    falFlu = 'Sou capaz de, sem dificuldade \ne fluentemente, fazer uma exposição\n oral ou desenvolver uma argumentação \nmais lógica.';
    
    listOfColumn = ['Idioma', 'Nível', 'icon']
    listOfType = ['ESCRITA', 'LEITURA', 'AUDIÇÃO', 'FALA', ]

    mapNivelSkill:any = 
    {
        0.2: "INICIANTE",
        0.5: "INTERMEDIARIO",
        0.8: "AVANÇADO",
        1: "FLUENTE"
    }

    errorMsg!: string;
    
    constructor(
        private formBuilder: FormBuilder,  
        private idiomaService: IdiomaService,
        private router: Router,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private eventBus: NgEventBus,
        private notification: NzNotificationService
    ) 
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => 
            {
                this.user = user
                if (user)
                {
                this.userNv = user.nv === 'admin'
                }
            }
        )        
    }

    ngOnInit(): void
    {    
        this.eventBus.on('idioma').subscribe((meta: MetaData) => {
            if (meta.data == 'success')
            {
                this.idiomaService.getFuncIdioma(this.user.id).subscribe(idiomasUser => {
                    this.allFuncIdiomas = idiomasUser;
                    this.traduzIdioma()
                })
            }
        });

        this.eventBus.on('tabelaIdiomaRowClicked').subscribe(_ => {
            this.idiomaClicked = true;
        });

        this.eventBus.on('newidioma').subscribe((meta: MetaData) => {
            if (meta.data == 'success')
            {
                this.idiomaService.getAllIdiomas().subscribe(newIdioma => {
                    this.allIdiomas = newIdioma;
                    this.allIdiomas.sort((a:any, b:any) => (a.nome > b.nome ? 1 : -1));
                })
            }
        });
        

        this.allIdiomas = (this.activatedRoute.snapshot.data.idiomas)
        this.allIdiomas.sort((a:any, b:any) => (a.nome > b.nome ? 1 : -1)); 
        this.allFuncIdiomas = this.activatedRoute.snapshot.data.funcAllIdiomas

        this.traduzIdioma()

        this.idiomaForm = this.formBuilder.group(
        { 
            idioma: ['', Validators.required],
            escrita: ['', Validators.required],
            audicao: ['', Validators.required],
            leitura: ['', Validators.required],
            fala: ['', Validators.required],               
        })         
    }   
    
    sendIdioma()
    {            
        const newIdioma = this.idiomaForm.getRawValue() as NewIdioma        
        newIdioma.userId = this.user.id
        this.idiomaService
            .sendIdioma(newIdioma)
            .subscribe(
                () => 
                {
                    this.allFuncIdiomas = this.idiomaService.getFuncIdioma(this.user.id).subscribe(idiomasUser => {
                    this.allFuncIdiomas = idiomasUser;
                    this.traduzIdioma(); // refresh tabela de meus idiomas
                    this.errorMsg = ''
                    this.idiomaForm.reset()
                    this.notification.success( // msg de sucesso
                        'Idioma adicionado com sucesso!!',
                        '',
                        { nzPlacement: 'bottomLeft' }
                      )
                    });
                },
                err => 
                {
                    this.notification.warning( // msg de sucesso
                        JSON.stringify(err.error.msg).replace('"',''),
                        '',
                        { nzPlacement: 'bottomLeft' }
                    )
                    this.idiomaForm.reset();
                }
            )
    }

    traduzIdioma() {
        for (let i=0; i<this.allFuncIdiomas.length; i++)   
        {
            this.allFuncIdiomas[i].escrita_display = this.mapNivelSkill[this.allFuncIdiomas[i].escrita];
            this.allFuncIdiomas[i].fala_display = this.mapNivelSkill[this.allFuncIdiomas[i].fala];
            this.allFuncIdiomas[i].audicao_display = this.mapNivelSkill[this.allFuncIdiomas[i].audicao];
            this.allFuncIdiomas[i].leitura_display = this.mapNivelSkill[this.allFuncIdiomas[i].leitura]; 
        }
    }
}
