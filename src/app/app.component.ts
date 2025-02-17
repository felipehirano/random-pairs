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

  get teamsAreBalanced(): boolean {
    // Habilita apenas quando houver pelo menos um par para sortear
    // (mesmo número de jogadores em ambos os times e maior que zero)
    return this._direitas.length === this._esquerdas.length && this._direitas.length > 0;
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

    while (tempDireitas.length > 0 && tempEsquerdas.length > 0) {
      // Sorteia um jogador da direita
      const direitaIndex = Math.floor(Math.random() * tempDireitas.length);
      const jogadorDireita = tempDireitas[direitaIndex];
      tempDireitas.splice(direitaIndex, 1);

      // Sorteia um jogador da esquerda
      let esquerdaIndex = Math.floor(Math.random() * tempEsquerdas.length);
      
      // Regra especial para o 'guguinha'
      if (jogadorDireita.toLowerCase() === 'guguinha') {
        esquerdaIndex = tempEsquerdas.findIndex(e => e.toLowerCase() === 'lemos');
        if (esquerdaIndex === -1) {
          esquerdaIndex = Math.floor(Math.random() * tempEsquerdas.length);
        }
      }

      const jogadorEsquerda = tempEsquerdas[esquerdaIndex];
      tempEsquerdas.splice(esquerdaIndex, 1);

      // Adiciona a dupla sorteada
      this.duplasSorteadas.push(
        `Dupla ${this.duplasSorteadas.length + 1} - ${jogadorDireita} e ${jogadorEsquerda}`
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
