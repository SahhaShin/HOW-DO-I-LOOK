package com.ssafy.howdoilook.domain.ootd.service;

import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import com.ssafy.howdoilook.domain.clothesOotd.entity.ClothesOotd;
import com.ssafy.howdoilook.domain.clothesOotd.entity.SlotType;
import com.ssafy.howdoilook.domain.clothesOotd.entity.SlotTypeInterface;
import com.ssafy.howdoilook.domain.clothesOotd.repository.ClothesOotdRepository;
import com.ssafy.howdoilook.domain.ootd.dto.request.OotdSaveRequestDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesAllTypeListDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.ClothesTypeListDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.GetOotdListDto;
import com.ssafy.howdoilook.domain.ootd.entity.Ootd;
import com.ssafy.howdoilook.domain.ootd.repository.OotdRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.expression.AccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OotdService {

    private final OotdRepository ootdRepository;
    private final UserRepository userRepository;
    private final ClothesRepository clothesRepository;
    private final ClothesOotdRepository clothesOotdRepository;

    @Transactional
    public Long saveOotd(OotdSaveRequestDto ootdSaveRequestDto, UserDetails userDetails) throws AccessException {
        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(ootdSaveRequestDto.getUserId())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        Optional<Ootd> findOotd = ootdRepository.findByUser_IdAndOrder(ootdSaveRequestDto.getUserId(), ootdSaveRequestDto.getOrder());

        if(findOotd.isPresent()){ // ootd가 등록된 적이 있는 경우
            for (SlotTypeInterface slotType : SlotType.values()) {
                updateClothesOotd(findOotd.get(), slotType,ootdSaveRequestDto);
            }

            return findOotd.get().getId();
        }


        // 아예 ootd가 등록된 적이 없는 경우
        Ootd ootd = ootdRepository.save(Ootd.builder().user(user).order(ootdSaveRequestDto.getOrder()).build());

        for (SlotTypeInterface slotType : SlotType.values()) {
            saveClothesOotd(ootd, ootdSaveRequestDto.getSlotId(slotType.getSlotType()), slotType.getSlotType());
        }

        return ootd.getId();

    }

    private void updateClothesOotd(Ootd findOotd, SlotTypeInterface slotType, OotdSaveRequestDto ootdSaveRequestDto) {
        Optional<ClothesOotd> findClothesOotd = clothesOotdRepository.findByOotd_IdAndType(findOotd.getId(), slotType.getSlotType());

        Long slotId = ootdSaveRequestDto.getSlotId(slotType.getSlotType());

        if(slotId == null) {
            throw new IllegalStateException("슬롯에 빈칸이 들어올 수는 없습니다.");
        }

        if (findClothesOotd.isEmpty()) {
            saveClothesOotd(findOotd, slotId, slotType.getSlotType());
        } else {
            findClothesOotd.get().update(clothesRepository.findById(slotId)
                    .orElseThrow(() -> new EmptyResultDataAccessException("해당 옷이 존재하지 않습니다.", 1)));
        }
    }

    private void saveClothesOotd(Ootd ootd, Long clothesId, SlotType type) {

        Clothes clothes = clothesRepository.findById(clothesId).orElse(null);

        if(clothes != null) {
            ClothesOotd clothesOotd = ClothesOotd.builder()
                    .ootd(ootd)
                    .clothes(clothes)
                    .type(type)
                    .build();
            clothesOotdRepository.save(clothesOotd);
        } else {
            throw new RuntimeException("해당 옷이 존재하지 않습니다.");
        }
    }

    public List<GetOotdListDto> findOotdList(Long userId) {

        List<GetOotdListDto> ootds = new ArrayList<>();
        List<Ootd> findOotds = ootdRepository.findByUser_Id(userId);

        for(int i = 1; i <= findOotds.size(); i++) {
            Ootd ootd = ootdRepository.findByUser_IdAndOrder(userId, i).orElse(null);
            if (ootd == null) {
                List<ClothesAllTypeListDto> topsList = ootdRepository.findByTypeAndUser_Id(ClothesType.TOP, userId);
                List<ClothesAllTypeListDto> bottomsList = ootdRepository.findByTypeAndUser_Id(ClothesType.BOTTOM, userId);
                List<ClothesAllTypeListDto> shoesList = ootdRepository.findByTypeAndUser_Id(ClothesType.SHOE, userId);
                List<ClothesAllTypeListDto> accessories1List = ootdRepository.findByTypeAndUser_Id(ClothesType.ACCESSORY, userId);
                List<ClothesAllTypeListDto> accessories2List = ootdRepository.findByTypeAndUser_Id(ClothesType.ACCESSORY, userId);
                List<ClothesAllTypeListDto> accessories3List = ootdRepository.findByTypeAndUser_Id(ClothesType.ACCESSORY, userId);
                continue;
            }
            Long ootdId = ootd.getId();
            Integer order = i;

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
