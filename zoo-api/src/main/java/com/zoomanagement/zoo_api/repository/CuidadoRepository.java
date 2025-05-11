package com.zoomanagement.zoo_api.repository; 

import com.zoomanagement.zoo_api.model.Cuidado; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuidadoRepository extends JpaRepository<Cuidado, Long> {
    
}