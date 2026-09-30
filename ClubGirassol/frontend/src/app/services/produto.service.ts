import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({ providedIn: 'root' })
export class ProdutoService {

  private readonly api = '/api/produto';

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(this.api);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.api}/${id}`);
  }

  criar(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(this.api, produto);
  }

  atualizar(id: number, produto: Produto): Observable<Produto> {
    return this.httpClient.put<Produto>(`${this.api}/${id}`, produto);
  }

  deletar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.api}/${id}`);
  }
}
