import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Animal, AnimalCreate, AnimalService } from '../services/animal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './animal-form.component.html',
  styleUrl: './animal-form.component.css'
})
export class AnimalFormComponent implements OnInit {
  animalForm!: FormGroup;
  animalId: number | null = null;
  isEditMode = false;
  formTitle = 'Cadastrar Novo Animal';

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.animalForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      especie: ['', Validators.required],
      habitat: ['', Validators.required],
      paisOrigem: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.animalId = +idParam;
        this.isEditMode = true;
        this.formTitle = 'Editar Animal';
        this.loadAnimal(this.animalId);
      }
    });
  }

  loadAnimal(id: number): void {
    this.animalService.getAnimalById(id).subscribe({
      next: (animal: Animal) => {
        this.animalForm.patchValue(animal);
      },
      error: (error: any) => {
        console.error('Erro ao carregar animal para edição:', error);
      }
    });
  }

  saveAnimal(): void {
    if (this.animalForm.valid) {
      const animalData: AnimalCreate = this.animalForm.value;

      if (this.isEditMode && this.animalId) {
        this.animalService.updateAnimal(this.animalId, animalData).subscribe({
          next: () => {
            console.log('Animal atualizado com sucesso!');
            this.router.navigate(['/animals']);
          },
          error: (error: any) => {
            console.error('Erro ao atualizar animal:', error);
          }
        });
      } else {
        this.animalService.createAnimal(animalData).subscribe({
          next: (animal: Animal) => {
            console.log('Animal cadastrado com sucesso!');
            this.router.navigate(['/animals']);
          },
          error: (error: any) => {
            console.error('Erro ao criar animal:', error);
          }
        });
      }
    } else {
      this.animalForm.markAllAsTouched();
    }
  }

  get f() { return this.animalForm.controls; }
}
