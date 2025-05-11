package com.zoomanagement.zoo_api.repository;

import com.zoomanagement.zoo_api.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findByHabitat(String habitat);
}