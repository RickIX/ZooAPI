import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cuidado, CuidadoService } from '../services/cuidado.service';

@Component({
  selector: 'app-cuidado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cuidado-form.component.html',
  styleUrl: './cuidado-form.component.css'
})
export class CuidadoFormComponent implements OnInit {
  cuidadoForm!: FormGroup;
  cuidadoId: number | null = null;
  isEditMode = false;
  formTitle = 'Cadastrar Novo Cuidado';

  constructor(
    private fb: FormBuilder,
    private cuidadoService: CuidadoService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.cuidadoForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      frequencia: ['', Validators.required]
    });


    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.cuidadoId = +idParam;
        this.isEditMode = true;
        this.formTitle = 'Editar Cuidado';
        this.loadCuidado(this.cuidadoId);
      }
    });
  }

  loadCuidado(id: number): void {
    this.cuidadoService.getCuidadoById(id).subscribe({
      next: (cuidado) => {

        this.cuidadoForm.patchValue(cuidado);
      },
      error: (error) => {
        console.error('Erro ao carregar cuidado para edição:', error);

      }
    });
  }

  saveCuidado(): void {
    if (this.cuidadoForm.valid) {
      const cuidado: Cuidado = this.cuidadoForm.value;

      if (this.isEditMode) {
        this.cuidadoService.updateCuidado(this.cuidadoId!, cuidado).subscribe({
          next: () => {
            console.log('Cuidado atualizado com sucesso!');
            this.router.navigate(['/cuidados']);
          },
          error: (error) => {
            console.error('Erro ao atualizar cuidado:', error);
          }
        });
      } else {

         const cuidadoToCreate = { ...cuidado, id: undefined };
        this.cuidadoService.createCuidado(cuidadoToCreate).subscribe({
          next: () => {
            console.log('Cuidado cadastrado com sucesso!');
            this.router.navigate(['/cuidados']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar cuidado:', error);

          }
        });
      }
    } else {

      this.cuidadoForm.markAllAsTouched();
    }
  }


  get f() { return this.cuidadoForm.controls; }
}
