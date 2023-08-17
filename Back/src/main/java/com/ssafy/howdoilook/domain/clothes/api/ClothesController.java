package com.ssafy.howdoilook.domain.clothes.api;

import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesSaveRequestDto;
import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesUpdateDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesDetailResponseDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesListResponseDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesListWithTotalPageDto;
import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import com.ssafy.howdoilook.domain.clothes.service.ClothesService;
import com.ssafy.howdoilook.global.s3upload.ImageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.AccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/clothes")
public class ClothesController {

    private final ClothesService clothesService;
    private final ImageService imageService;
    private final ClothesRepository clothesRepository;

    @PostMapping("")
    public ResponseEntity<Long> saveClothes(@RequestPart ClothesSaveRequestDto clothesSaveRequestDto,
                                            @RequestPart("s3upload") MultipartFile multipartFile,
                                            @AuthenticationPrincipal UserDetails userDetails) throws Exception {

       clothesSaveRequestDto.setPhotoLink(imageService.saveImageAndRemoveBg(multipartFile));
        // clothesSaveRequestDto.setPhotoLink(imageService.saveImage(multipartFile));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(clothesService.saveClothes(clothesSaveRequestDto, userDetails));
    }

    @PutMapping("/{clothesId}")
    public ResponseEntity<Long> updateClothes(@PathVariable("clothesId") Long clothesId,
                                              @RequestBody ClothesUpdateDto clothesUpdateDto,
                                              @AuthenticationPrincipal UserDetails userDetails) throws Exception {

        return ResponseEntity.status(HttpStatus.CREATED).body(clothesService.updateClothes(clothesId, clothesUpdateDto, userDetails));
    }

    @DeleteMapping("{clothesId}")
    public ResponseEntity<?> deleteClothes(@PathVariable("clothesId") Long clothesId,
                                              @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        clothesService.deleteClothes(clothesId, userDetails);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @GetMapping("list")
    public ResponseEntity<ClothesListWithTotalPageDto> findClothesList(@RequestParam(value = "type") String type,
                                                                       @RequestParam(value = "userId") Long userId,
                                                                       @RequestParam(value = "page", required = false) Integer page,
                                                                       @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        return ResponseEntity.status(HttpStatus.OK).body(clothesService.findClothesList(type, userId, page, userDetails));
    }

    @GetMapping("detail/{clothesId}")
    public ResponseEntity<ClothesDetailResponseDto> findClothesDetail(@PathVariable("clothesId") Long clothesId,
                                                                      @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        return ResponseEntity.status(HttpStatus.OK).body(clothesService.findClothesDetail(clothesId, userDetails));
    }

    @GetMapping("list/forroom")
    public ResponseEntity<List<ClothesListResponseDto>> findClothesListForRoom(@RequestParam(value = "userId") Long userId,
                                                                         @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        return ResponseEntity.status(HttpStatus.OK).body(clothesService.findClothesListForRoom(userId, userDetails));
    }
}
