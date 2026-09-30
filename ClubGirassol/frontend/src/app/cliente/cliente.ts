import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  styleUrl: './cliente.css',
  templateUrl: './cliente.html',
})
export class ClienteComponent implements OnInit {

  clienteForm!: FormGroup;
  clientes = signal<Cliente[]>([]);
  idEditando = signal<number | null>(null);
  mensagem = signal('');

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.listar();
  }

  private criarFormulario(): void {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required]
    });
  }

  public listar(): void {
    this.clienteService.listar().subscribe({
      next: (res) => this.clientes.set(res),
      error: () => this.mensagem.set('Nao foi possivel carregar os clientes. O backend esta rodando?')
    });
  }

  public salvar(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const cliente: Cliente = this.clienteForm.getRawValue();
    const id = this.idEditando();

    if (id !== null) {
      this.clienteService.atualizar(id, cliente).subscribe(() => {
        this.finalizar('Cliente atualizado com sucesso!');
      });
    } else {
      this.clienteService.criar(cliente).subscribe(() => {
        this.finalizar('Cliente cadastrado com sucesso!');
      });
    }
  }

  public editar(cliente: Cliente): void {
    this.idEditando.set(cliente.id ?? null);
    this.clienteForm.patchValue(cliente);
  }

  public excluir(id?: number): void {
    if (id == null) {
      return;
    }
    if (!confirm('Deseja realmente excluir este cliente?')) {
      return;
    }
    this.clienteService.deletar(id).subscribe(() => {
      this.clientes.update((lista) => lista.filter((cliente) => cliente.id !== id));
      if (this.idEditando() === id) {
        this.cancelarEdicao();
      }
      this.mensagem.set('Cliente excluido com sucesso!');
    });
  }

  public cancelarEdicao(): void {
    this.idEditando.set(null);
    this.clienteForm.reset();
  }

  private finalizar(mensagem: string): void {
    this.mensagem.set(mensagem);
    this.cancelarEdicao();
    this.listar();
  }
}
