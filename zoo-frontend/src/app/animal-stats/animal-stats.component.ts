import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal, AnimalService } from '../services/animal.service';

interface HabitatStats {
  habitat: string;
  count: number;
}

interface SpeciesStats {
  especie: string;
  count: number;
}

interface CountryStats {
  pais: string;
  count: number;
}

@Component({
  selector: 'app-animal-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-stats.component.html',
  styleUrl: './animal-stats.component.css'
})
export class AnimalStatsComponent implements OnInit {
  totalAnimals: number = 0;
  habitatStats: HabitatStats[] = [];
  speciesStats: SpeciesStats[] = [];
  countryStats: CountryStats[] = [];

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.animalService.getAllAnimals().subscribe({
      next: (data: Animal[]) => {
        this.totalAnimals = data.length;
        this.calculateHabitatStats(data);
        this.calculateSpeciesStats(data);
        this.calculateCountryStats(data);
      },
      error: (error: any) => {
        console.error('Erro ao carregar estatísticas:', error);
      }
    });
  }

  private calculateHabitatStats(animals: Animal[]): void {
    const habitatMap = new Map<string, number>();
    animals.forEach(animal => {
      const count = habitatMap.get(animal.habitat) || 0;
      habitatMap.set(animal.habitat, count + 1);
    });
    this.habitatStats = Array.from(habitatMap.entries())
      .map(([habitat, count]) => ({ habitat, count }))
      .sort((a, b) => b.count - a.count);
  }

  private calculateSpeciesStats(animals: Animal[]): void {
    const speciesMap = new Map<string, number>();
    animals.forEach(animal => {
      const count = speciesMap.get(animal.especie) || 0;
      speciesMap.set(animal.especie, count + 1);
    });
    this.speciesStats = Array.from(speciesMap.entries())
      .map(([especie, count]) => ({ especie, count }))
      .sort((a, b) => b.count - a.count);
  }

  private calculateCountryStats(animals: Animal[]): void {
    const countryMap = new Map<string, number>();
    animals.forEach(animal => {
      const count = countryMap.get(animal.paisOrigem) || 0;
      countryMap.set(animal.paisOrigem, count + 1);
    });
    this.countryStats = Array.from(countryMap.entries())
      .map(([pais, count]) => ({ pais, count }))
      .sort((a, b) => b.count - a.count);
  }
} 