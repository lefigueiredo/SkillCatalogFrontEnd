import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NewProficiencia } from './newProficiencia';
import { User } from '../../core/user/user';
import { ProficienciaService } from './proficiencia.service';
import { UserService } from 'src/app/core/user/user.service';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component(
    {
        templateUrl: './proficiencia.component.html',
        styleUrls: ['./proficiencia.component.css']
    }
)

export class ProficienciaComponent implements OnInit {
    proficienciaForm!: FormGroup;
    user$: Observable<User>;
    user!: User;
    allProficiencias: any;
    allFuncProficiencias: any;
    userNv: boolean;
    proficienciaClicked: boolean = false;

    radioValueW = '';
    radioValueL = '';
    radioValueS = '';
    radioValueR = '';

    escIni = 'Consigo implementar \ncorretamente uma função simples \nquando me é dado especificações \nespecíficas.';
    escInt = 'Consigo produzir implementações\n com pequenas funções \nquando são dadas funcionalidades \nque contém especificações complexas.';
    escAva = 'Consigo estimar quanto tempo \nleva e quanto de memória \nmeus códigos utilizam quando \nsão executados. ';
    escFlu = 'Eu consigo quebrar aplicações\n de arquiteturas complexas \nem  componentes menores que podem \nser implementados separadamente e por\n terceiros.';
    leiIni = 'Consigo adaptar meu código \nsem precisar revisar ele inteiro\n antes. Consigo alterar quando\n sou instruído por alguém mais \nexperiente.';
    leiInt = 'Consigo determinar se uma \nalteração requer um grande \nrefactor ou não. Consigo alterar \nsozinho meus códigos quando\n é solicitado por alguém mais\n experiente.';
    leiAva = 'Consigo alterar código de \nterceiros quando uma pessoa \nfamiliarizada com o código me\n da instruções bem precisas.';
    leiFlu = 'Eu consigo fazer a engenharia\n reversa do código de outras\n pessoas sem as especificações\n originais do projeto e mensurar \no esforço para adaptá-la numa nova\n aplicação.';
    audIni = 'Consigo inserir fragmentos \nde outros códigos, renomeando \nvariáveis para fazerem sentido \nno meu código.';
    audInt = 'Dada uma biblioteca com várias \nfunções e documentação detalhada,\n consigo reutilizá-la no meu código.';
    audAva = 'Consigo reconhecer de antemão\n quando um código precisa de uma\n arquitetura genérica para ser \nreutilizada.';
    audFlu = 'Consigo descobrir e explorar\n comportamentos de aplicações sem \ndocumentações.';
    falIni = 'Consigo distinguir entre \nsoluções corretas ou incorretas \npara os meus códigos. ';
    falInt = 'Consigo distinguir output\n incorretos no meu código quando \nos input são inseridos incorretamente.\n Consigo isolar e arrumar bugs \ndos meus códigos.';
    falAva = 'Consigo inspecionar meu código\n para checar se existe algum \nerro. Eu escrevo e uso testes\n unitários automatizados quando \nsão aplicáveis.';
    falFlu = 'Eu consigo acompanhar e \ndescobrir o que gerou \ncomportamentos inesperados nos \nsistemas que desenvolvi.';

    listOfColumn = ['Proficiência', 'Nível', 'icon']
    listOfType = ['REFACTOR', 'ESCREVENDO', 'SOLUCIONANDO', 'REUSO',]

    mapNivelSkill: any =
    {
        0.2: "INICIANTE",
        0.5: "INTERMEDIARIO",
        0.8: "AVANÇADO",
        1: "EXPERT"
    }

    errorMsg!: string;

    constructor(
        private formBuilder: FormBuilder,
        private proficienciaService: ProficienciaService,
        private router: Router,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private notification: NzNotificationService,
        private eventBus: NgEventBus
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
        this.eventBus.on('proficiencia').subscribe((meta: MetaData) =>
        {
            if (meta.data == 'success') 
            {
                this.proficienciaService.getFuncProficiencia(this.user.id).subscribe(proficienciaUser => {
                    this.allFuncProficiencias = proficienciaUser;                    
                    this.traduzProficiencia()
                })
            }
        });

        this.eventBus.on('rafarProfClicked').subscribe(_ => {
            this.proficienciaClicked = true;
        });

        this.eventBus.on('newProficiencia').subscribe((meta: MetaData) =>
        {
            if (meta.data == 'success') 
            {
                this.proficienciaService.getAllProficiencia().subscribe(Newproficiencia => {
                    this.allProficiencias = Newproficiencia;
                    this.allProficiencias.sort((a:any, b:any) => (a.nome > b.nome ? 1 : -1));
                    this.traduzProficiencia()
                })
            }
        });

        this.allProficiencias = this.activatedRoute.snapshot.data.proficiencias
        this.allProficiencias.sort((a:any, b:any) => (a.nome > b.nome ? 1 : -1));
        this.allFuncProficiencias = this.activatedRoute.snapshot.data.funcAllProficiencias

        this.traduzProficiencia()

        this.proficienciaForm = this.formBuilder.group(
            {
                refactor: ['', Validators.required],
                reuse: ['', Validators.required],
                escrita: ['', Validators.required],
                problema: ['', Validators.required],
                proficiencia: ['', Validators.required]
            }
        )
    }

    sendProficiencia() {

        const newProficiencia = this.proficienciaForm.getRawValue() as NewProficiencia
        this.proficienciaService
            .sendProficiencia(newProficiencia, this.user.id)
            .subscribe(
                () => {
                    this.allFuncProficiencias = this.proficienciaService.getFuncProficiencia(this.user.id).subscribe(proficienciasUser => {
                        this.allFuncProficiencias = proficienciasUser;
                        this.traduzProficiencia(); // refresh tabela de meus idiomas
                        this.errorMsg = ''
                        this.proficienciaForm.reset()
                        this.notification.success( // msg de sucesso
                            'Proficiência adicionada com sucesso!!',
                            '',
                            { nzPlacement: 'bottomLeft' }
                        )
                    });
                },
                err => {
                    this.notification.warning( // msg de sucesso
                        JSON.stringify(err.error.msg).replace('"', ''),
                        '',
                        { nzPlacement: 'bottomLeft' }
                    )
                    this.proficienciaForm.reset();
                }
            )
    }

    traduzProficiencia() {
        for (let i = 0; i < this.allFuncProficiencias.length; i++) {
            this.allFuncProficiencias[i].escrita_display = this.mapNivelSkill[this.allFuncProficiencias[i].escrita];
            this.allFuncProficiencias[i].reuse_display = this.mapNivelSkill[this.allFuncProficiencias[i].reuse];
            this.allFuncProficiencias[i].problema_display = this.mapNivelSkill[this.allFuncProficiencias[i].problema];
            this.allFuncProficiencias[i].refactor_display = this.mapNivelSkill[this.allFuncProficiencias[i].refactor];
        }
    }
}
