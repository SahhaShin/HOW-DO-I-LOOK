package com.ssafy.howdoilook.domain.ootd.service;

import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.GetOotdListDto;
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

    public List<GetOotdListDto> findOotdList(Long userId) {

        List<GetOotdListDto> ootds = new ArrayList<>();

        List<Ootd> ootdIds = ootdRepository.findByUser_id(userId);

        for(int i = 0; i < ootdIds.size(); i++){

            Long ootdId = ootdIds.get(i).getId();

            List<ClothesTypeListDto> topsList = ootdRepository.findOotdIdList(userId, "TOP", ootdId);
            List<ClothesTypeListDto> bottomsList = ootdRepository.findOotdIdList(userId, "BOTTOM", ootdId);
            List<ClothesTypeListDto> shoesList = ootdRepository.findOotdIdList(userId, "SHOE", ootdId);
            List<ClothesTypeListDto> ootdAccessories = ootdRepository.findOotdIdList(userId, "ACCESSORY", ootdId);
            List<ClothesTypeListDto> accessories1List = new ArrayList<>(List.of(ootdAccessories.get(0)));
            List<ClothesTypeListDto> accessories2List = new ArrayList<>(List.of(ootdAccessories.get(1)));
            List<ClothesTypeListDto> accessories3List = new ArrayList<>(List.of(ootdAccessories.get(2)));

            topsList.addAll(ootdRepository.findClothesList(userId, "TOP", ootdId));
            bottomsList.addAll(ootdRepository.findClothesList(userId, "BOTTOM", ootdId));
            shoesList.addAll(ootdRepository.findClothesList(userId, "SHOE", ootdId));
            List<ClothesTypeListDto> allAccessories = ootdRepository.findClothesList(userId, "ACCESSORY", ootdId);
            accessories1List.addAll(allAccessories);
            accessories2List.addAll(allAccessories);
            accessories3List.addAll(allAccessories);

            GetOotdListDto getOotdListDto = GetOotdListDto.builder()
                    .ootdId(ootdId)
                    .tops(topsList)
                    .bottoms(bottomsList)
                    .shoes(shoesList)
                    .accessories1(accessories1List)
                    .accessories2(accessories2List)
                    .accessories3(accessories3List)
                    .build();

            ootds.add(getOotdListDto);
        }
        return ootds;
    }
}
