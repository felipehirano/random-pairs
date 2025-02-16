import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public name = 'desafio';
  public newDireita = '';
  public newEsquerda = '';

  private _direitas = [];
  private _esquerdas = [];

  // private _direitas = [
  //   'Ken',
  //   'Jojo',
  //   'Coutinho',
  //   'Teixeira',
  //   'Vinao',
  //   'Tutz',
  //   'Jp',
  //   'Dias',
  // ];
  // private _esquerdas = [
  //   'Bileta',
  //   'Alan',
  //   'Lemos',
  //   'Ciro',
  //   'Monteiro',
  //   'Guguinha',
  //   'Caio Manuel',
  //   'Jonathan',
  // ];

  public participantesDireita = [];
  public participantesEsquerda = [];

  // public participantesDireita = [...this._direitas];
  // public participantesEsquerda = [...this._esquerdas];

  private _choosedDireita = '';
  private _choosedEsquerda = '';

  public duplasSorteadas = [];

  public raffle() {
    for (let i = 1; i <= this.participantesDireita.length; i++) {
      this._choosedDireita =
        this._direitas[Math.floor(Math.random() * this._direitas.length)];

      if (this._choosedDireita === 'guguinha') {
        this._choosedEsquerda = 'lemos';
      } else {
        this._choosedEsquerda =
          this._esquerdas[Math.floor(Math.random() * this._esquerdas.length)];
      }

      this._choosedEsquerda =
        this._esquerdas[Math.floor(Math.random() * this._esquerdas.length)];

      console.log(
        `Dupla ${i} - ${this._choosedDireita} e ${this._choosedEsquerda}`
      );

      this.duplasSorteadas.push(
        `Dupla ${i} - ${this._choosedDireita} e ${this._choosedEsquerda}`
      );

      const indexDireitaToBeRemoved = this._direitas.indexOf(
        this._choosedDireita
      );
      const indexEsquerdaToBeRemoved = this._esquerdas.indexOf(
        this._choosedEsquerda
      );

      this._direitas.splice(indexDireitaToBeRemoved, 1);
      this._esquerdas.splice(indexEsquerdaToBeRemoved, 1);
    }
  }

  public addDireita() {
    if (this.newDireita) {
      this._direitas.push(this.newDireita);
      this.participantesDireita = [...this._direitas];

      this.newDireita = '';
    }
  }

  public addEsquerda() {
    if (this.newEsquerda) {
      this._esquerdas.push(this.newEsquerda);
      this.participantesEsquerda = [...this._esquerdas];

      this.newEsquerda = '';
    }
  }

  public clear() {
    this._direitas = [];
    this._esquerdas = [];

    this.participantesDireita = [...this._direitas];
    this.participantesEsquerda = [...this._esquerdas];
    this.duplasSorteadas = [];
  }
}
