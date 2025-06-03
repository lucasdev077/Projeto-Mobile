package com.projeto.mobile.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.mobile.entity.CarEntity;
import com.projeto.mobile.repository.CarRepository;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public List<CarEntity> getAllCars() {
        return carRepository.findAll();
    }

    public CarEntity saveCar(CarEntity car) {
        return carRepository.save(car);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    public CarEntity updateFavorite(Long id, Boolean isFavorite) {
        CarEntity car = carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found"));
        car.setIsFavorite(isFavorite);
        return carRepository.save(car);
    }
}
