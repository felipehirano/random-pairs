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
      // Processa múltiplos nomes separados por vírgula ou quebra de linha
      const nomes = this.processMultipleNames(this.newDireita);
      nomes.forEach(nome => {
        if (nome && !this._direitas.includes(nome)) {
          this._direitas.push(nome);
        }
      });
      this.newDireita = '';
    }
  }

  public addEsquerda(): void {
    if (this.newEsquerda.trim()) {
      // Processa múltiplos nomes separados por vírgula ou quebra de linha
      const nomes = this.processMultipleNames(this.newEsquerda);
      nomes.forEach(nome => {
        if (nome && !this._esquerdas.includes(nome)) {
          this._esquerdas.push(nome);
        }
      });
      this.newEsquerda = '';
    }
  }

  public removeDireita(index: number): void {
    this._direitas.splice(index, 1);
  }

  public removeEsquerda(index: number): void {
    this._esquerdas.splice(index, 1);
  }

  private processMultipleNames(input: string): string[] {
    // Divide por vírgula ou quebra de linha, remove espaços extras e filtra vazios
    return input
      .split(/[,\n]/)
      .map(nome => nome.trim())
      .filter(nome => nome.length > 0);
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
