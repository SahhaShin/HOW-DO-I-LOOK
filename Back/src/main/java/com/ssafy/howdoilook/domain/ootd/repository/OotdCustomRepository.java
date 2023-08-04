package com.ssafy.howdoilook.domain.ootd.repository;

import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import com.ssafy.howdoilook.domain.clothesOotd.entity.SlotType;
import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesAllTypeListDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;

import java.util.List;

public interface OotdCustomRepository {

    ClothesTypeListDto findOotdClothes(Long ootdId, SlotType slotType);
    List<ClothesTypeListDto> findClothesList(Long clothesId, Long userId, String type, Long ootdId);
    List<ClothesTypeListDto> findByTypeAndUser_Id(ClothesType type, Long userId);
}
