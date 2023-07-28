package com.ssafy.howdoilook.domain.ootd.service;

import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.GetOotdListDto;
import com.ssafy.howdoilook.domain.ootd.entity.Ootd;
import com.ssafy.howdoilook.domain.ootd.entity.OotdType;
import com.ssafy.howdoilook.domain.ootd.repository.OotdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OotdService {

    private final OotdRepository ootdRepository;

    public List<GetOotdListDto> findOotdList(Long userId) {

        List<GetOotdListDto> ootds = new ArrayList<>();

        List<Ootd> ootdIds = ootdRepository.findByUser_id(userId);
        List<OotdType> typeList = Arrays.asList(OotdType.TOP, OotdType.BOTTOM, OotdType.SHOE, OotdType.ACCESSORY1, OotdType.ACCESSORY2, OotdType.ACCESSORY3);

        for(int i = 0; i < ootdIds.size(); i++){
            GetOotdListDto ootd = new GetOotdListDto();

            Long ootdId = ootdIds.get(i).getId();

            ootd.setOotdId(ootdId);
            ootd.setTops(ootdRepository.findOotdIdList(userId, "TOP", ootdId));
            ootd.setBottoms(ootdRepository.findOotdIdList(userId, "BOTTOM", ootdId));
            ootd.setShoes(ootdRepository.findOotdIdList(userId, "SHOE", ootdId));

            List<ClothesTypeListDto> accessories1 = new ArrayList<>();
            accessories1.add(ootdRepository.findOotdIdList(userId, "ACCESSORY", ootdId).get(0));
            ootd.setAccessories1(accessories1);

            List<ClothesTypeListDto> accessories2 = new ArrayList<>();
            accessories2.add(ootdRepository.findOotdIdList(userId, "ACCESSORY", ootdId).get(1));
            ootd.setAccessories2(accessories2);

            List<ClothesTypeListDto> accessories3 = new ArrayList<>();
            accessories3.add(ootdRepository.findOotdIdList(userId, "ACCESSORY", ootdId).get(2));
            ootd.setAccessories3(accessories3);

            ootd.getTops().addAll(ootdRepository.findClothesList(userId, "TOP", ootdId));
            ootd.getBottoms().addAll(ootdRepository.findClothesList(userId, "BOTTOM", ootdId));
            ootd.getShoes().addAll(ootdRepository.findClothesList(userId, "SHOE", ootdId));
            ootd.getAccessories1().addAll(ootdRepository.findClothesList(userId, "ACCESSORY", ootdId));
            ootd.getAccessories2().addAll(ootdRepository.findClothesList(userId, "ACCESSORY", ootdId));
            ootd.getAccessories3().addAll(ootdRepository.findClothesList(userId, "ACCESSORY", ootdId));

            ootds.add(ootd);
        }
        return ootds;
    }
}
