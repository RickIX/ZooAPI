package com.zoomanagement.zoo_api.repository; // <- Pacote correto

import com.zoomanagement.zoo_api.model.Cuidado; // Importa a entidade Cuidado
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuidadoRepository extends JpaRepository<Cuidado, Long> {
    // Métodos CRUD para Cuidado serão automaticamente fornecidos por JpaRepository
}