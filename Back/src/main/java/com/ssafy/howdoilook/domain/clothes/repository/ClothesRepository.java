package com.ssafy.howdoilook.domain.clothes.repository;

import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {

//    Clothes clothes
//
//    @Override
//    Optional<Clothes> findById(Long aLong);
}
