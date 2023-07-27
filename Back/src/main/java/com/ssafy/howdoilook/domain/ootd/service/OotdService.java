package com.ssafy.howdoilook.domain.ootd.service;

import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.OotdDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.OotdListResponseDto;
import com.ssafy.howdoilook.domain.ootd.entity.Ootd;
import com.ssafy.howdoilook.domain.ootd.repository.OotdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OotdService {

    private final OotdRepository ootdRepository;

    public List<ClothesTypeListDto> findOotdList(Long userId) {

//        List<OotdDto> ootds = new ArrayList<>();
//
//        List<Ootd> ootdIds = ootdRepository.findByUser_id(userId);
//        for(int i = 0; i < 2; i++){
//            OotdDto ootd = new OotdDto();
//            Long ootdId = ootdIds.get(i).getId();
//            ootd.setOotdId(ootdId);
//            ootd.setTops(ootdRepository.findOotdIdList(userId, "TOP", ootdId));
//            ootd.setBottoms(ootdRepository.findOotdIdList(userId, "BOTTOM", ootdId));
//            ootd.setShoes(ootdRepository.findOotdIdList(userId, "SHOE", ootdId));
//            ootd.setAccessories1(ootdRepository.findOotdIdList(userId, "ACCESSORY", ootdId).subList(0, 1));
//            ootd.setAccessories1(ootdRepository.findOotdIdList(userId, "ACCESSORY", ootdId).subList(1, 2));
//            ootd.setAccessories1(ootdRepository.findOotdIdList(userId, "ACCESSORY", ootdId).subList(2, 3));
//
//            ootd.getTops().addAll(ootdRepository.findClothesList(userId, "TOP", ootdId));
//            ootd.getBottoms().addAll(ootdRepository.findClothesList(userId, "BOTTOM", ootdId));
//            ootd.getShoes().addAll(ootdRepository.findClothesList(userId, "SHOE", ootdId));
//            ootd.getAccessories1().addAll(ootdRepository.findClothesList(userId, "ACCESSORY", ootdId));
//            ootd.getAccessories2().addAll(ootdRepository.findClothesList(userId, "ACCESSORY", ootdId));
//            ootd.getAccessories3().addAll(ootdRepository.findClothesList(userId, "ACCESSORY", ootdId));
//            ootds.add(ootd);
//        }
//        return ootds;

        return ootdRepository.findOotdIdList(userId, "ACCESSORY", 2L);
//        List<ClothesTypeListDto> findOotdIdList(Long userId, String type, Long ootdId)
    }
}
