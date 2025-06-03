package com.projeto.mobile.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.mobile.entity.CarEntity;

@Repository
public interface CarRepository extends JpaRepository<CarEntity , Long>{

}
