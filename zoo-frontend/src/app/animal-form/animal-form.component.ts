import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Animal, AnimalService } from '../animal.service';
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
      id: [null],
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
      next: (animal) => {
        this.animalForm.patchValue(animal);
      },
      error: (error) => {
        console.error('Erro ao carregar animal para edição:', error);
      }
    });
  }

  saveAnimal(): void {
    if (this.animalForm.valid) {
      const animal: Animal = this.animalForm.value;

      if (this.isEditMode) {

        this.animalService.updateAnimal(this.animalId!, animal).subscribe({
          next: () => {
            console.log('Animal atualizado com sucesso!');
            this.router.navigate(['/animals']);
          },
          error: (error) => {
            console.error('Erro ao atualizar animal:', error);
          }
        });
      } else {
         const animalToCreate = { ...animal, id: undefined };
        this.animalService.createAnimal(animalToCreate).subscribe({
          next: () => {
            console.log('Animal cadastrado com sucesso!');
            this.router.navigate(['/animals']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar animal:', error);
          }
        });
      }
    } else {
      this.animalForm.markAllAsTouched();
    }
  }
  get f() { return this.animalForm.controls; }
}
