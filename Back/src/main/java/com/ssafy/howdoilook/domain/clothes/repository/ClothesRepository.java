package com.ssafy.howdoilook.domain.clothes.repository;

import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {

    @EntityGraph(attributePaths = {})
    @Override
    <S extends Clothes> S save(S entity);

//    @EntityGraph(attributePaths = {})
//    @Override
//    Optional<Clothes> findById(Long aLong);


}
