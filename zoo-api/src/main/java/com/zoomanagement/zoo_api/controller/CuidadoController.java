package com.zoomanagement.zoo_api.controller;

import com.zoomanagement.zoo_api.model.Cuidado;
import com.zoomanagement.zoo_api.repository.CuidadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cuidados")
@CrossOrigin(origins = "http://localhost:4200")
public class CuidadoController {

    @Autowired
    private CuidadoRepository cuidadoRepository;


    @GetMapping
    public List<Cuidado> getAllCuidados() {
        return cuidadoRepository.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Cuidado> getCuidadoById(@PathVariable Long id) {
        Optional<Cuidado> cuidado = cuidadoRepository.findById(id);
        return cuidado.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Cuidado> createCuidado(@RequestBody Cuidado cuidado) {
        Cuidado savedCuidado = cuidadoRepository.save(cuidado);
        return new ResponseEntity<>(savedCuidado, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Cuidado> updateCuidado(@PathVariable Long id, @RequestBody Cuidado cuidadoDetails) {
        Optional<Cuidado> optionalCuidado = cuidadoRepository.findById(id);

        if (optionalCuidado.isPresent()) {
            Cuidado existingCuidado = optionalCuidado.get();
            existingCuidado.setNome(cuidadoDetails.getNome());
            existingCuidado.setDescricao(cuidadoDetails.getDescricao());
            existingCuidado.setFrequencia(cuidadoDetails.getFrequencia());

            Cuidado updatedCuidado = cuidadoRepository.save(existingCuidado);
            return ResponseEntity.ok(updatedCuidado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCuidado(@PathVariable Long id) {
        if (cuidadoRepository.existsById(id)) {
            cuidadoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}