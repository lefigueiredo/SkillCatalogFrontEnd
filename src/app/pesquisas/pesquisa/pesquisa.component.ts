import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { ProfileService } from 'src/app/images/profile.service';

import { AllSearch } from './pesquisa';
import { PesquisaService } from './pesquisa.service';

@Component(
    {
        styleUrls: ['./pesquisa.component.css'],
        templateUrl: './pesquisa.component.html'
    }
)
export class PesquisaComponent implements OnInit {

    allSearch!: AllSearch[];
    listaImg:any =[];
    listaIdiomas:any =[];
    listaIdiomasNv:any =[];
    listaFormacoes:any =[];
    listaFormacoesInf:any =[];
    listaProficiencias:any =[];
    listaProficienciasNv:any =[];
    img64:any
    
    constructor(
        private pesquisaService: PesquisaService,
        private activatedRoute: ActivatedRoute,
        private profileService: ProfileService
    ) {}

    ngOnInit() 
    {
        this.allSearch = this.activatedRoute.snapshot.data.allSearch;
    }

    clear(table: Table) {
        table.clear();
    }

    cellClicked(element:any)
    {
        this.listaImg = []
        this.listaIdiomas = this.ajustList(element[0], 'Idiomas')
        this.listaIdiomasNv = this.ajustList(element[0], 'IdiomasNivel')
        this.listaFormacoes = this.ajustList(element[0], 'Formacoes')
        this.listaFormacoesInf = this.ajustList(element[0], 'FormacoesInf')
        this.listaProficiencias = this.ajustList(element[0], 'Proficiencias')
        this.listaProficienciasNv = this.ajustList(element[0], 'ProficienciasNivel')

        this.profileService.getImgByUserId(element[0].Id, 'perfil').subscribe(imh =>
            {
              if (imh.dado === 'vazio')
              {
                this.listaImg = '../../assets/icons/profile.png'
              } else {
                this.img64 = imh
                this.listaImg = 'data:image/jpeg;base64,' + this.img64
              }
            }
        );
    }

    ajustList(list:any, element:any)
    {
        var lista = [];
        var listaString = JSON.stringify(list[element]);
        listaString = listaString.replace(/\"/g, ' ');
        lista = listaString.split(',');

        if (lista[0] == 'null')
        {
            lista = ['Nenhum dado cadastrado!'];
        }

        return lista
    }

}