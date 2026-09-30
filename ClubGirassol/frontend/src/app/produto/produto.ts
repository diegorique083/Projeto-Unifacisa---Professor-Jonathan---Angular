import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  styleUrl: './produto.css',
  templateUrl: './produto.html',
})
export class ProdutoComponent implements OnInit {

  produtoForm!: FormGroup;
  produtos = signal<Produto[]>([]);
  idEditando = signal<number | null>(null);
  mensagem = signal('');

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.listar();
  }

  private criarFormulario(): void {
    this.produtoForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      tamanho: ['', Validators.required],
      cor: ['', Validators.required],
      preco: ['', Validators.required]
    });
  }

  public listar(): void {
    this.produtoService.listar().subscribe({
      next: (res) => this.produtos.set(res),
      error: () => this.mensagem.set('Nao foi possivel carregar os produtos. O backend esta rodando?')
    });
  }

  public salvar(): void {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      return;
    }

    const produto: Produto = this.produtoForm.getRawValue();
    const id = this.idEditando();

    if (id !== null) {
      this.produtoService.atualizar(id, produto).subscribe(() => {
        this.finalizar('Produto atualizado com sucesso!');
      });
    } else {
      this.produtoService.criar(produto).subscribe(() => {
        this.finalizar('Produto cadastrado com sucesso!');
      });
    }
  }

  public editar(produto: Produto): void {
    this.idEditando.set(produto.id ?? null);
    this.produtoForm.patchValue(produto);
  }

  public excluir(id?: number): void {
    if (id == null) {
      return;
    }
    if (!confirm('Deseja realmente excluir este produto?')) {
      return;
    }
    this.produtoService.deletar(id).subscribe(() => {
      this.produtos.update((lista) => lista.filter((produto) => produto.id !== id));
      if (this.idEditando() === id) {
        this.cancelarEdicao();
      }
      this.mensagem.set('Produto excluido com sucesso!');
    });
  }

  public cancelarEdicao(): void {
    this.idEditando.set(null);
    this.produtoForm.reset();
  }

  private finalizar(mensagem: string): void {
    this.mensagem.set(mensagem);
    this.cancelarEdicao();
    this.listar();
  }
}
