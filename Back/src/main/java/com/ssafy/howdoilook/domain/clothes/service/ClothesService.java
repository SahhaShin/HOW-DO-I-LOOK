package com.ssafy.howdoilook.domain.clothes.service;

import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesSaveRequestDto;
import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesUpdateDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesListResponseDto;
import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.s3upload.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClothesService {

    private final ClothesRepository clothesRepository;
    private final UserRepository userRepository;
    private final ImageService imageService;

    @Transactional
    public Long saveClothes(ClothesSaveRequestDto clothesSaveRequestDto) {
        User user = userRepository.findById(clothesSaveRequestDto.getUserId())
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

    public Long deleteClothes(Long clothesId) {

        Clothes findClothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new IllegalArgumentException("해당 옷이 존재하지 않습니다."));

        imageService.deleteImage(findClothes.getPhotoLink());
        clothesRepository.deleteById(clothesId);
        return clothesId;
    }

    public List<ClothesListResponseDto> findClothesList(String clothesType) {
        List<ClothesListResponseDto> findClothesListResponseDtoList = new ArrayList<>();

        if(clothesType.equals("ALL")) {
            List<Clothes> findClothesList = clothesRepository.findAll();

            for(Clothes clothes : findClothesList) {
                findClothesListResponseDtoList.add(new ClothesListResponseDto(clothes));
            }
        } else {
            List<Clothes> findClothesList = clothesRepository.findByType(clothesType);

            for(Clothes clothes : findClothesList) {
                findClothesListResponseDtoList.add(new ClothesListResponseDto(clothes));
            }
        }

        return findClothesListResponseDtoList;
    }
}
