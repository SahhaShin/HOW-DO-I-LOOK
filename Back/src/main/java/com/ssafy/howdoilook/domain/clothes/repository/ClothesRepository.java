package com.ssafy.howdoilook.domain.clothes.repository;

import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesDetailResponseDto;
import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClothesRepository extends JpaRepository<Clothes, Long> {

    Page<Clothes> findByUser_Id(Long userId, Pageable pageable);

    List<Clothes> findByUser_IdAndType(Long userId, ClothesType type);

    Page<Clothes> findByTypeAndUser_Id(ClothesType type, Long userId, Pageable pageable);

    boolean existsByPhotoLink(String link);
}
