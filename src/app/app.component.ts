import { Component } from '@angular/core';

interface Participant {
  name: string;
  team: 'direita' | 'esquerda';
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public newDireita = '';
  public newEsquerda = '';
  public duplasSorteadas: string[] = [];

  private _direitas: string[] = [];
  private _esquerdas: string[] = [];
  private _choosedDireita = '';
  private _choosedEsquerda = '';

  get participantesDireita(): string[] {
    return [...this._direitas];
  }

  get participantesEsquerda(): string[] {
    return [...this._esquerdas];
  }

  public addDireita(): void {
    if (this.newDireita.trim()) {
      this._direitas.push(this.newDireita.trim());
      this.newDireita = '';
    }
  }

  public addEsquerda(): void {
    if (this.newEsquerda.trim()) {
      this._esquerdas.push(this.newEsquerda.trim());
      this.newEsquerda = '';
    }
  }

  public raffle(): void {
    this.duplasSorteadas = [];
    const tempDireitas = [...this._direitas];
    const tempEsquerdas = [...this._esquerdas];

    for (let i = 1; i <= tempDireitas.length; i++) {
      const direitaIndex = Math.floor(Math.random() * tempDireitas.length);
      this._choosedDireita = tempDireitas[direitaIndex];
      tempDireitas.splice(direitaIndex, 1);

      let esquerdaIndex = Math.floor(Math.random() * tempEsquerdas.length);
      
      // Regra especial para o 'guguinha'
      if (this._choosedDireita.toLowerCase() === 'guguinha') {
        esquerdaIndex = tempEsquerdas.findIndex(e => e.toLowerCase() === 'lemos');
        if (esquerdaIndex === -1) {
          esquerdaIndex = Math.floor(Math.random() * tempEsquerdas.length);
        }
      }

      this._choosedEsquerda = tempEsquerdas[esquerdaIndex];
      tempEsquerdas.splice(esquerdaIndex, 1);

      this.duplasSorteadas.push(
        `Dupla ${i} - ${this._choosedDireita} e ${this._choosedEsquerda}`
      );
    }

    // Limpa os arrays originais após o sorteio
    this._direitas = [];
    this._esquerdas = [];
    
    // Limpa os campos de input
    this.newDireita = '';
    this.newEsquerda = '';
  }

  public clear(): void {
    this._direitas = [];
    this._esquerdas = [];
    this.duplasSorteadas = [];
  }
}
