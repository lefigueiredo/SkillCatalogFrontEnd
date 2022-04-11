import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from './funcionario.service';

@Component(
    {
        selector: 'ap-funcionario',
        templateUrl: 'funcionario.component.html'
    }
)

export class FuncionarioComponent implements OnInit
{
    @Input() id='';
    @Input() nome='';

    funcionarios: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void
  {
    this.funcionarios = this.activatedRoute.snapshot.data.userId;
  }
}