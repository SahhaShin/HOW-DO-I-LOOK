package com.ssafy.howdoilook.domain.clothes.service;

import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesSaveRequestDto;
import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesUpdateDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesDetailResponseDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesListResponseDto;
import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.s3upload.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public Long updateClothes(Long clothesId, ClothesUpdateDto clothesUpdateDto, MultipartFile multipartFile) throws IOException {

        Clothes findClothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new IllegalArgumentException("해당 옷이 존재하지 않습니다."));

        clothesUpdateDto.setPhotoLink(imageService.updateImage(clothesUpdateDto.getPhotoLink(), multipartFile));

        return findClothes.update(clothesUpdateDto);

    }

    public Long deleteClothes(Long clothesId) {

        Clothes findClothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new IllegalArgumentException("해당 옷이 존재하지 않습니다."));

        imageService.deleteImage(findClothes.getPhotoLink());
        clothesRepository.deleteById(clothesId);
        return clothesId;
    }

    public List<ClothesListResponseDto> findClothesList(String type, Long userId, int page) {

        List<ClothesListResponseDto> findClothesListResponseDtoList = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(page, 8);

        if(type.equals("ALL")) {
            System.out.println(userId);
            List<Clothes> findClothesList = clothesRepository.findByUser_Id(userId);

            for(Clothes clothes : findClothesList) {
                findClothesListResponseDtoList.add(new ClothesListResponseDto(clothes));
            }
        } else {
            ClothesType clothesType = ClothesType.valueOf(type);
            System.out.println(clothesType);
            Page<Clothes> findClothesList = clothesRepository.findByTypeAndUser_Id(clothesType, userId, pageRequest);

            for(Clothes clothes : findClothesList) {
                findClothesListResponseDtoList.add(new ClothesListResponseDto(clothes));
            }
        }

        return findClothesListResponseDtoList;
    }

    public ClothesDetailResponseDto findClothesDetail(Long clothesId) {
        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new IllegalArgumentException("해당 옷이 존재하지 않습니다"));

        ClothesDetailResponseDto clothesDetailResponseDto = ClothesDetailResponseDto.builder()
                .type(String.valueOf(clothes.getType()))
                .name(clothes.getName())
                .brand(clothes.getBrand())
                .info(clothes.getInfo())
                .photoLink(clothes.getPhotoLink())
                .build();

        return clothesDetailResponseDto;
    }
}
