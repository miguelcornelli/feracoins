import { Component, OnInit, Input } from '@angular/core';
import { Contato } from '../app/contatos/shared/contato';
import { ContatoService } from '../app/contatos/shared/contato.service';
import { ContatoDataService } from '../app/contatos/shared/contato-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'project-fera-coins';
  contato: Contato
  key: string = '';
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService) { }
 
  ngOnInit() {
    this.contato = new Contato();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato && data.key) {
        this.contato = new Contato();
        this.contato.nome = data.contato.nome;
        this.contato.email = data.contato.email;
        this.key = data.key;
      }
    })
  }
 
  onSubmit() {
    if (this.key) {
      this.contatoService.update(this.contato, this.key);
    } else {
      this.contatoService.insert(this.contato);
    }
 
    this.contato = new Contato();
  }
}