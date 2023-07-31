package com.ssafy.howdoilook.domain.clothesOotd.repository;

import com.ssafy.howdoilook.domain.clothesOotd.entity.ClothesOotd;
import com.ssafy.howdoilook.domain.clothesOotd.entity.SlotType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClothesOotdRepository extends JpaRepository<ClothesOotd, Long> {

    List<ClothesOotd> findByOotd_IdAndType(Long ootdId, SlotType type);
}
