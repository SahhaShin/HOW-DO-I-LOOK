package com.ssafy.howdoilook.domain.clothes.repository;

import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {

    Page<Clothes> findByType(ClothesType type, Pageable pageable);
}
