import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { User } from '../../../core/user/user';
import { IdiomaService } from '../idioma.service';
import { UserService } from 'src/app/core/user/user.service';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Chart } from 'chart.js';

@Component({
  selector: 'sc-radar-idioma',
  templateUrl: './tabela.radar.component.html',
})
export class IdiomaRadarComponent implements OnInit {
  user$: Observable<User>;
  user!: User;
  avg: any;

  data: any;
  options: any;

  chartSkills: Chart;
  
  constructor(
    private idiomaService: IdiomaService,
    private userService: UserService,
    private eventBus: NgEventBus
  ) {
    this.user$ = userService.getUser();
    this.user$.subscribe((user) => {
      this.user = user;
    });
    Chart.defaults.color = "#efefef"
  }

  ngOnInit(): void {
    this.eventBus.on('radar').subscribe((meta: MetaData) => {
      this.idiomaService.getAllAvg().subscribe((DadoAvg) => {
        this.avg = DadoAvg;

        var lista = [];
        var idiomaEvento = meta.data.split(';')[0];
        var listaNivelUser = meta.data.split(';')[1].split(',');

        for (let i = 0; i < listaNivelUser.length; i++) {
          listaNivelUser[i] = Math.ceil(parseFloat(listaNivelUser[i]) * 100);
        }

        for (let i = 0; i < this.avg.length; i++) {
          if (this.avg[i].idioma == idiomaEvento) {
            lista.push(Math.ceil(this.avg[i].media_escrita * 100));
            lista.push(Math.ceil(this.avg[i].media_leitura * 100));
            lista.push(Math.ceil(this.avg[i].media_audicao * 100));
            lista.push(Math.ceil(this.avg[i].media_fala * 100));
          }
        }
        
        let chartExists = false;
        if (this.chartSkills) {
          chartExists = true;
        }

        let chartProperties: any = {
          type: 'radar',
          data: {
            labels: ['Escrita', 'Leitura', 'Audição', 'Fala'],
            datasets: [
              {
                label: 'Meu idioma',
                backgroundColor: 'rgba(169,213,223,0.2)',
                borderColor: 'rgba(27,130,153,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: listaNivelUser,
              },
              {
                label: 'Idioma no geral',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: lista,
              },
            ],
          },
          options: {
            elements: {
              line: {
                borderWidth: 3,
              },
            },
            scales: {
              r: {
                angleLines: {
                  display: false,
                },
                suggestedMin: 0,
                suggestedMax: 100,
                min: 0,
                max: 100,
                ticks: {
                  display: false,
                },
              },
            },
            plugins: {
              tooltip: {
                enabled: false,
              },
              
            },
            
          },
        }

        if (chartExists) {
          this.chartSkills.data = chartProperties.data
          this.chartSkills.update()
        } else {
          this.chartSkills = new Chart("chartSkillsCanvas", chartProperties);
        }
      });
    });
  }
}
