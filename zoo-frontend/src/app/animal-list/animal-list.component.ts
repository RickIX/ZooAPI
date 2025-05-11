import { Component, OnInit } from '@angular/core';
import { Animal, AnimalService } from '../animal.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.css'
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.animalService.getAllAnimals().subscribe({
      next: (data) => {
        this.animals = data;
      },
      error: (error) => {
        console.error('Erro ao carregar animais:', error);
      }
    });
  }

  deleteAnimal(id: number): void {
    if (confirm('Tem certeza que deseja excluir este animal?')) {
      this.animalService.deleteAnimal(id).subscribe({
        next: () => {
          console.log('Animal excluído com sucesso!');
          this.loadAnimals();
        },
        error: (error) => {
          console.error('Erro ao excluir animal:', error);
        }
      });
    }
  }
}
