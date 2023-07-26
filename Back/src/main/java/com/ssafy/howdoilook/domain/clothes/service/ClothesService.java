package com.ssafy.howdoilook.domain.clothes.service;

import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesSaveRequestDto;
import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesUpdateDto;
import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClothesService {

    private final ClothesRepository clothesRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long saveClothes(ClothesSaveRequestDto clothesSaveRequestDto) {
        User user = userRepository.findById(clothesSaveRequestDto.getUserNo())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        Clothes clothes = Clothes.builder()
                .user(user)
                .type(ClothesType.valueOf(clothesSaveRequestDto.getType()))
                .photoLink(clothesSaveRequestDto.getPhotoLink())
                .name(clothesSaveRequestDto.getName())
                .brand(clothesSaveRequestDto.getBrand())
                .info(clothesSaveRequestDto.getInfo())
                .build();

        clothesRepository.save(clothes);

        return clothes.getId();

    }

    @Transactional
    public Long updateClothes(Long clothesId, ClothesUpdateDto clothesUpdateDto) {

        Clothes findClothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new IllegalArgumentException("해당 옷이 존재하지 않습니다."));

        return findClothes.update(clothesUpdateDto);

    }
}
