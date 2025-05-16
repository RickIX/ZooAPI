import { Component, OnInit } from '@angular/core';
import { Cuidado, CuidadoService } from '../services/cuidado.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cuidados-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cuidados-list.component.html',
  styleUrl: './cuidados-list.component.css'
})
export class CuidadosListComponent implements OnInit {
  cuidados: Cuidado[] = [];

  constructor(private cuidadoService: CuidadoService) { }

  ngOnInit(): void {
    this.loadCuidados();
  }

  loadCuidados(): void {
    this.cuidadoService.getAllCuidados().subscribe({
      next: (data: Cuidado[]) => {
        this.cuidados = data;
      },
      error: (error: any) => {
        console.error('Erro ao carregar cuidados:', error);
      }
    });
  }

  deleteCuidado(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cuidado?')) {
      this.cuidadoService.deleteCuidado(id).subscribe({
        next: () => {
          console.log('Cuidado excluído com sucesso!');
          this.loadCuidados();
        },
        error: (error: any) => {
          console.error('Erro ao excluir cuidado:', error);
        }
      });
    }
  }
}
