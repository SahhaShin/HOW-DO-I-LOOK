package com.ssafy.howdoilook.domain.clothes.service;

import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesSaveRequestDto;
import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesUpdateDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesDetailResponseDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesListResponseDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesListWithTotalPageDto;
import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import com.ssafy.howdoilook.domain.user.entity.ClosetAccess;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.s3upload.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.expression.AccessException;
import org.springframework.security.core.userdetails.UserDetails;
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
    public Long saveClothes(ClothesSaveRequestDto clothesSaveRequestDto, UserDetails userDetails) throws AccessException {
        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(clothesSaveRequestDto.getUserId())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

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
    public Long updateClothes(Long clothesId, ClothesUpdateDto clothesUpdateDto, UserDetails userDetails) throws IOException, AccessException {

        Clothes findClothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 옷이 존재하지 않습니다.", 1));

        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(findClothes.getUser().getId())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        // 이미지는 수정 못하도록 함
//        clothesUpdateDto.setPhotoLink(imageService.updateImage(clothesUpdateDto.getPhotoLink(), multipartFile));

        return findClothes.update(clothesUpdateDto);

    }

    @Transactional
    public void deleteClothes(Long clothesId, UserDetails userDetails) throws AccessException {

        Clothes findClothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new IllegalArgumentException("해당 옷이 존재하지 않습니다."));

        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(findClothes.getUser().getId())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        imageService.deleteImage(findClothes.getPhotoLink());
        clothesRepository.deleteById(clothesId);
    }

    public ClothesListWithTotalPageDto findClothesList(String type, Long userId, Integer page, UserDetails userDetails) throws AccessException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if(user.getClosetAccess().equals(ClosetAccess.PRIVATE)) {
            String clientEmail = userDetails.getUsername();

            if (!clientEmail.equals(user.getEmail())){
                throw new AccessException("접근 권한이 없습니다.");
            }
        }
        
        List<ClothesListResponseDto> findClothesListResponseDtoList = new ArrayList<>();

        PageRequest pageRequest;

        if (page != null) {
            pageRequest = PageRequest.of(page, 8);
        } else {
            pageRequest = PageRequest.of(0, Integer.MAX_VALUE);
        }


        if(type.equals("ALL")) {
            System.out.println(userId);
            Page<Clothes> findClothesList = clothesRepository.findByUser_Id(userId, pageRequest);

            for(Clothes clothes : findClothesList) {
                findClothesListResponseDtoList.add(new ClothesListResponseDto(clothes));
            }

            int totalPages = findClothesList.getTotalPages();
            ClothesListWithTotalPageDto result = ClothesListWithTotalPageDto.builder()
                    .totalPage(totalPages)
                    .clothesList(findClothesListResponseDtoList)
                    .build();

            return result;

        } else {
            ClothesType clothesType = ClothesType.valueOf(type);
            System.out.println(clothesType);
            Page<Clothes> findClothesList = clothesRepository.findByTypeAndUser_Id(clothesType, userId, pageRequest);

            for(Clothes clothes : findClothesList) {
                findClothesListResponseDtoList.add(new ClothesListResponseDto(clothes));
            }

            int totalPages = findClothesList.getTotalPages();
            ClothesListWithTotalPageDto result = ClothesListWithTotalPageDto.builder()
                    .totalPage(totalPages)
                    .clothesList(findClothesListResponseDtoList)
                    .build();

            return result;
        }
    }

    public ClothesDetailResponseDto findClothesDetail(Long clothesId, UserDetails userDetails) throws AccessException {
        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 옷이 존재하지 않습니다", 1));

        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(clothes.getUser().getId())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

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
