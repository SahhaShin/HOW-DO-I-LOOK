package com.ssafy.howdoilook.domain.clothes.repository;

import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {
}
