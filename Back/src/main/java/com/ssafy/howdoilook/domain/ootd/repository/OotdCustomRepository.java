package com.ssafy.howdoilook.domain.ootd.repository;

import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.OotdListResponseDto;

import java.util.List;

public interface OotdCustomRepository {

    List<ClothesTypeListDto> findOotdIdList(Long userId, String type, Long ootdId);
    List<ClothesTypeListDto> findClothesList(Long userId, String type, Long ootdId);
}
