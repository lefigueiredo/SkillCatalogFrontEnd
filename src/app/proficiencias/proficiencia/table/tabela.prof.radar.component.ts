import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../../core/user/user';
import { UserService } from 'src/app/core/user/user.service';
import { NgEventBus } from 'ng-event-bus';
import { MetaData } from 'ng-event-bus/lib/meta-data';
import { Chart } from 'chart.js';
import { ProficienciaService } from '../proficiencia.service';

@Component({
  selector: 'sc-radar-proficiencia',
  templateUrl: './tabela.prof.radar.component.html',
})
export class ProficienciaRadarComponent implements OnInit {
  user$: Observable<User>;
  user!: User;
  avg: any;

  data: any;
  options: any;

  chartProficiencias: any;
  
  constructor(
    private proficienciaService: ProficienciaService,
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
    this.eventBus.on('radarProf').subscribe((meta: MetaData) => {
      this.proficienciaService.getAllAvg().subscribe((DadoAvg) => {

        this.avg = DadoAvg;

        var lista = [];
        var proficienciaEvento = meta.data.split(';')[0];
        var listaNivelUser = meta.data.split(';')[1].split(',');

        for (let i = 0; i < listaNivelUser.length; i++) {
          listaNivelUser[i] = Math.ceil(parseFloat(listaNivelUser[i]) * 100);
        }

        for (let i = 0; i < this.avg.length; i++) {
          if (this.avg[i].proficiencia == proficienciaEvento) {
            lista.push(Math.ceil(this.avg[i].media_escrita * 100));
            lista.push(Math.ceil(this.avg[i].media_refactor * 100));
            lista.push(Math.ceil(this.avg[i].media_reuse * 100));
            lista.push(Math.ceil(this.avg[i].media_problema * 100));
          }
        }

        let chartExists = false;
        if (this.chartProficiencias) {
          chartExists = true;
        }

        let chartProperties: any = {
          type: 'radar',
          data: {
            labels: ['Escrita', 'Refactor', 'Reuse', 'Problema'],
            datasets: [
              {
                label: 'Minha Proficiência',
                backgroundColor: 'rgba(169,213,223,0.2)',
                borderColor: 'rgba(27,130,153,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: listaNivelUser,
              },
              {
                label: 'Proficiência no geral',
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
          this.chartProficiencias.data = chartProperties.data
          this.chartProficiencias.update()
        } else {
          this.chartProficiencias = new Chart("chartProfsCanvas", chartProperties);
        }
      });
    });
  }
}
