import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnimalCreate {
  nome: string;
  descricao: string;
  dataNascimento: string;
  especie: string;
  habitat: string;
  paisOrigem: string;
}

export interface Animal extends AnimalCreate {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'http://localhost:8080/api/animals';

  constructor(private http: HttpClient) { }

  getAllAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  getAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`);
  }

  createAnimal(animal: AnimalCreate): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal);
  }

  updateAnimal(id: number, animal: AnimalCreate): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}/${id}`, animal);
  }

  deleteAnimal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAnimalsByHabitat(habitat: string): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/filter?habitat=${habitat}`);
  }
} 