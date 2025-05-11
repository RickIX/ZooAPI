import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../services/animal.service';
import { Animal } from '../models/animal.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.css'
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];
  habitats: string[] = [];
  selectedHabitat: string = '';

  constructor(
    private animalService: AnimalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.animalService.getAnimals().subscribe({
      next: (data: Animal[]) => {
        this.animals = data;
        this.filteredAnimals = data;
        this.habitats = [...new Set(data.map((animal: Animal) => animal.habitat))];
      },
      error: (error: Error) => {
        console.error('Erro ao carregar animais:', error);
      }
    });
  }

  filterByHabitat(): void {
    if (this.selectedHabitat) {
      this.filteredAnimals = this.animals.filter(animal => animal.habitat === this.selectedHabitat);
    } else {
      this.filteredAnimals = this.animals;
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/animals/add']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/animals/edit', id]);
  }

  navigateToStats(): void {
    this.router.navigate(['/animals/stats']);
  }

  deleteAnimal(id: number): void {
    if (confirm('Tem certeza que deseja excluir este animal?')) {
      this.animalService.deleteAnimal(id).subscribe({
        next: () => {
          this.loadAnimals();
        },
        error: (error: Error) => {
          console.error('Erro ao excluir animal:', error);
        }
      });
    }
  }
}
