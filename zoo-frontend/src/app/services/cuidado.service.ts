import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cuidado {
  id?: number;
  nome: string;
  descricao: string;
  frequencia: string;
  data: string;
  animalId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CuidadoService {
  private apiUrl = 'http://localhost:8080/api/cuidados';

  constructor(private http: HttpClient) { }

  getAllCuidados(): Observable<Cuidado[]> {
    return this.http.get<Cuidado[]>(this.apiUrl);
  }

  getCuidadoById(id: number): Observable<Cuidado> {
    return this.http.get<Cuidado>(`${this.apiUrl}/${id}`);
  }

  createCuidado(cuidado: Cuidado): Observable<Cuidado> {
    return this.http.post<Cuidado>(this.apiUrl, cuidado);
  }

  updateCuidado(id: number, cuidado: Cuidado): Observable<Cuidado> {
    return this.http.put<Cuidado>(`${this.apiUrl}/${id}`, cuidado);
  }

  deleteCuidado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCuidadosByAnimalId(animalId: number): Observable<Cuidado[]> {
    return this.http.get<Cuidado[]>(`${this.apiUrl}/animal/${animalId}`);
  }
} 