package com.ssafy.howdoilook.domain.ootd.service;

import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import com.ssafy.howdoilook.domain.clothesOotd.entity.ClothesOotd;
import com.ssafy.howdoilook.domain.clothesOotd.entity.SlotType;
import com.ssafy.howdoilook.domain.clothesOotd.entity.SlotTypeInterface;
import com.ssafy.howdoilook.domain.clothesOotd.repository.ClothesOotdRepository;
import com.ssafy.howdoilook.domain.ootd.dto.request.OotdSaveRequestDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.GetOotdListDto;
import com.ssafy.howdoilook.domain.ootd.entity.Ootd;
import com.ssafy.howdoilook.domain.ootd.repository.OotdRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final ClothesRepository clothesRepository;
    private final ClothesOotdRepository clothesOotdRepository;

    @Transactional
    public Long saveOotd(OotdSaveRequestDto ootdSaveRequestDto) {
        User user = userRepository.findById(ootdSaveRequestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        List<Ootd> findOotd = ootdRepository.findByUser_IdAndOrder(ootdSaveRequestDto.getUserId(), ootdSaveRequestDto.getOrder());

        if(!findOotd.isEmpty()){ // ootd가 등록된 적이 있는 경우
            for (SlotTypeInterface slotType : SlotType.values()) {
                updateClothesOotd(findOotd, slotType,ootdSaveRequestDto);
            }

            return findOotd.get(0).getId();
        }


        // 아예 ootd가 등록된 적이 없는 경우
        Ootd ootd = ootdRepository.save(Ootd.builder().user(user).order(ootdSaveRequestDto.getOrder()).build());

        for (SlotTypeInterface slotType : SlotType.values()) {
            saveClothesOotd(ootd, ootdSaveRequestDto.getSlotId(slotType.getSlotType()), slotType.getSlotType());
        }

        /**
         * 모든 슬롯이 다 채워져 있지 않을 수 있으니까 그 때 예외 처리 필요
         */

        return ootd.getId();

    }

    private void updateClothesOotd(List<Ootd> findOotd, SlotTypeInterface slotType, OotdSaveRequestDto ootdSaveRequestDto) {
        List<ClothesOotd> findClothesOotdList = clothesOotdRepository.findByOotd_IdAndType(findOotd.get(0).getId(), slotType.getSlotType());

        if (findClothesOotdList.isEmpty()) {
            saveClothesOotd(findOotd.get(0), ootdSaveRequestDto.getSlotId(slotType.getSlotType()), slotType.getSlotType());
        } else {
            findClothesOotdList.get(0).update(clothesRepository.findById(ootdSaveRequestDto.getSlotId(slotType.getSlotType()))
                    .orElseThrow(() -> new IllegalArgumentException("해당 옷이 존재하지 않습니다.")));
        }
    }

    private void saveClothesOotd(Ootd ootd, Long clothesId, SlotType type) {
        if (clothesId == null) {
            return; // ID 값이 null이면 메서드 종료
        }

        Clothes clothes = clothesRepository.findById(clothesId).orElse(null);

        System.out.println(clothes);

        if(clothes != null) {
            ClothesOotd clothesOotd = ClothesOotd.builder()
                    .ootd(ootd)
                    .clothes(clothes)
                    .type(type)
                    .build();
            clothesOotdRepository.save(clothesOotd);
        }
    }

    public List<GetOotdListDto> findOotdList(Long userId) {

        List<GetOotdListDto> ootds = new ArrayList<>();
        List<Ootd> findOotds = ootdRepository.findByUser_Id(userId);

        for(int i = 0; i < findOotds.size(); i++) {
            List<Ootd> ootd = ootdRepository.findByUser_IdAndOrder(userId, i+1);
            if (ootd.isEmpty()) {
                continue;
            }
            Long ootdId = ootd.get(0).getId();
            Integer order = i+1;

            List<ClothesTypeListDto> topsList = findClothesByType(userId, ootdId, SlotType.TOP, "TOP");
            List<ClothesTypeListDto> bottomsList = findClothesByType(userId, ootdId, SlotType.BOTTOM, "BOTTOM");
            List<ClothesTypeListDto> shoesList = findClothesByType(userId, ootdId, SlotType.SHOE, "SHOE");
            List<ClothesTypeListDto> accessories1List = findClothesByType(userId, ootdId, SlotType.ACCESSORY1, "ACCESSORY");
            List<ClothesTypeListDto> accessories2List = findClothesByType(userId, ootdId, SlotType.ACCESSORY2, "ACCESSORY");
            List<ClothesTypeListDto> accessories3List = findClothesByType(userId, ootdId, SlotType.ACCESSORY3, "ACCESSORY");

            GetOotdListDto getOotdListDto = GetOotdListDto.builder()
                    .ootdId(ootdId)
                    .order(order)
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

    private List<ClothesTypeListDto> findClothesByType(Long userId, Long ootdId, SlotType slotType, String clothesType) {
        List<ClothesTypeListDto> clothesList = new ArrayList<>();
        clothesList.addAll(ootdRepository.findOotdClothes(ootdId, slotType));
        /**
         * 1번 ootd랑 2번 ootd에 같은 옷이 들어가게 될 때 중복 출력 문제
         */
        clothesList.addAll(ootdRepository.findClothesList(userId, clothesType, ootdId));
        return clothesList;
    }
}
