package com.zoomanagement.zoo_api.controller;

import com.zoomanagement.zoo_api.model.Animal;
import com.zoomanagement.zoo_api.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = "http://localhost:4200")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;


    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable Long id) {
        Optional<Animal> animal = animalRepository.findById(id);
        return animal.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Animal> createAnimal(@RequestBody Animal animal) {
        Animal savedAnimal = animalRepository.save(animal);
        return new ResponseEntity<>(savedAnimal, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Animal> updateAnimal(@PathVariable Long id, @RequestBody Animal animalDetails) {
        Optional<Animal> optionalAnimal = animalRepository.findById(id);

        if (optionalAnimal.isPresent()) {
            Animal existingAnimal = optionalAnimal.get();
            existingAnimal.setNome(animalDetails.getNome());
            existingAnimal.setDescricao(animalDetails.getDescricao());
            existingAnimal.setDataNascimento(animalDetails.getDataNascimento());
            existingAnimal.setEspecie(animalDetails.getEspecie());
            existingAnimal.setHabitat(animalDetails.getHabitat());
            existingAnimal.setPaisOrigem(animalDetails.getPaisOrigem());

            Animal updatedAnimal = animalRepository.save(existingAnimal);
            return ResponseEntity.ok(updatedAnimal);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        if (animalRepository.existsById(id)) {
            animalRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/filter")
    public List<Animal> getAnimalsByHabitat(@RequestParam String habitat) {
        return animalRepository.findByHabitat(habitat);
    }

}