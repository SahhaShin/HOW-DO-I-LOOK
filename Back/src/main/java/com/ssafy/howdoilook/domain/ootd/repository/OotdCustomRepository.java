package com.ssafy.howdoilook.domain.ootd.repository;

import com.ssafy.howdoilook.domain.clothesOotd.entity.SlotType;
import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;

import java.util.List;

public interface OotdCustomRepository {

    ClothesTypeListDto findOotdClothes(Long ootdId, SlotType slotType);
    List<ClothesTypeListDto> findClothesList(Long clothesId, Long userId, String type);
}
