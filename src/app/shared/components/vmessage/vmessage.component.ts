import { Component, Input } from '@angular/core';

// Componente padrão de mensagem que aparecem na tela como alertas (visual)

@Component(
    {
        selector: 'sc-vmessage',
        templateUrl: './vmessage.component.html'
    }
)

export class VMessageComponent
{
    @Input() text = '';

}