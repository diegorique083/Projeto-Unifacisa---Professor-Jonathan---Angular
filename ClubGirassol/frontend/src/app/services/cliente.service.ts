import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({ providedIn: 'root' })
export class ClienteService {

  private readonly api = '/api/cliente';

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.api);
  }

  buscarPorId(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.api}/${id}`);
  }

  criar(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.api, cliente);
  }

  atualizar(id: number, cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(`${this.api}/${id}`, cliente);
  }

  deletar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.api}/${id}`);
  }
}
