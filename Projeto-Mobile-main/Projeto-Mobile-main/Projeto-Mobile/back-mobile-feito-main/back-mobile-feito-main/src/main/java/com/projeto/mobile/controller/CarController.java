package com.projeto.mobile.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.mobile.entity.CarEntity;
import com.projeto.mobile.repository.CarRepository;
import com.projeto.mobile.service.CarService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private CarService carService;
    
    @Autowired
    private CarRepository carRepository;


    @GetMapping("/listar")
    public List<CarEntity> getAllCars() {
        return carService.getAllCars();
    }

    @PostMapping("/salvar")
    public CarEntity createCar(@RequestBody CarEntity car) {
        return carService.saveCar(car);
    }

    @DeleteMapping("/deletar/{id}")
    public void deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<CarEntity> atualizarCarro(@PathVariable Long id, @RequestBody CarEntity carAtualizado) {
        Optional<CarEntity> optionalCar = carRepository.findById(id);

        if (!optionalCar.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        CarEntity carroExistente = optionalCar.get();
        
        carroExistente.setNome(carAtualizado.getNome());
        carroExistente.setImagem(carAtualizado.getImagem());
        carroExistente.setDescricao(carAtualizado.getDescricao());
        carroExistente.setRating(carAtualizado.getRating());
        carroExistente.setIsFavorite(carAtualizado.getIsFavorite());

        carRepository.save(carroExistente);

        return ResponseEntity.ok(carroExistente);
    }



}
