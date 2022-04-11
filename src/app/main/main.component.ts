import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formacao } from '../formacoes/formacao/formacao';
import { NzCardModule } from 'ng-zorro-antd/card';

import { MainService } from './main.service';
import { User } from '../core/user/user';
import { Observable } from 'rxjs';
import { UserService } from '../core/user/user.service';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { ProfileService } from '../images/profile.service';

@Component(
    {
        selector: 'sc-app-main',
        templateUrl: './main.component.html',
        styleUrls: ['./main.component.css']
    }
)
export class MainComponent implements OnInit
{
    user$: Observable<User>;
    user!: User;

    userCapa64 = 'data:image/png;base64,'
    capaImg:any

    funcTime!: string;
    funcProf!: string;
    funcProfs!: any;
    funcExp!: any;
    funcForma!: any;
    funcIdi!: any;
    funcFormaa!: string;

    constructor(
        private mainService: MainService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private eventBus: NgEventBus,
        private profileService: ProfileService
    )
    {
        this.user$ = userService.getUser();
        this.user$.subscribe(user => this.user = user) 
    }

    ngOnInit(): void
    {      
        if (this.activatedRoute.snapshot.data.capa['dado'] === 'vazio')
        {
            this.capaImg = '../../assets/teste.png'
        }
        
        else
        {
            this.capaImg = 'data:image/jpeg;base64,' + this.activatedRoute.snapshot.data.capa
        }
        
        var barColors =  this.activatedRoute.snapshot.data.barColor;

        var time = this.activatedRoute.snapshot.data.time;   
        this.funcTime = time.time

        var prof = this.activatedRoute.snapshot.data.prof;   
        this.funcProf = prof.prof

        var formac = this.activatedRoute.snapshot.data.formaa;   
        this.funcFormaa = formac.forma

        var profs = this.activatedRoute.snapshot.data.profs;  
        for (var i = 0; i < profs.length; i++) 
        {
            if (i<barColors.length) 
            {
                profs[i].barColor = barColors.reverse()[i].data;
            } else {
                profs[i].barColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            }
        }   
        this.funcProfs = profs

        var exp = this.activatedRoute.snapshot.data.exp;   
        this.funcExp = exp

        var form = this.activatedRoute.snapshot.data.forma;   
        this.funcForma = form

        var idi = this.activatedRoute.snapshot.data.idi;
        for (var i = 0; i < idi.length; i++) 
        {
            if (i<barColors.length) 
            {
                idi[i].barColor = barColors[i].data;
            } else {
                idi[i].barColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            }
        }  
        this.funcIdi = idi
    } 

    gridStyle = 
    {
        width: '25%',
        textAlign: 'center'
    };

    config()
    {
        this.router.navigate(['profile']);        
    }
}

    