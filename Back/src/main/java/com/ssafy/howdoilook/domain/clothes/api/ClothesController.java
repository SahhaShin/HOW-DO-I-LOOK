package com.ssafy.howdoilook.domain.clothes.api;

import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesSaveRequestDto;
import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesUpdateDto;
import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import com.ssafy.howdoilook.domain.clothes.service.ClothesService;
import com.ssafy.howdoilook.domain.user.dto.request.UserSignUpRequestDto;
import com.ssafy.howdoilook.global.s3upload.ImageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/clothes")
public class ClothesController {

    private final ClothesService clothesService;
    private final ImageService imageService;
    private final ClothesRepository clothesRepository;

    @PostMapping("")
    public ResponseEntity<?> saveClothes(@RequestBody ClothesSaveRequestDto clothesSaveRequestDto) throws Exception {

        return ResponseEntity.ok()
                .body(clothesService.saveClothes(clothesSaveRequestDto));
    }

    @PutMapping("/{clothesId}")
    public ResponseEntity<?> updateClothes(@PathVariable("clothesId") Long clothesId, @RequestBody ClothesUpdateDto clothesUpdateDto) {

        Long updateId = clothesService.updateClothes(clothesId, clothesUpdateDto);

        return ResponseEntity.ok().body(updateId);
    }

    @Transactional
    @DeleteMapping("{clothesId}")
    public ResponseEntity<?> deleteClothes(@PathVariable("clothesId") Long clothesId) {

        Clothes clothes = clothesRepository.findById(clothesId)
                .orElseThrow(() -> new IllegalArgumentException("해당 옷이 존재하지 않습니다"));

        imageService.deleteImage(clothes.getPhotoLink());
        Long deleteId = clothesService.deleteClothes(clothesId);

        return ResponseEntity.ok().body(deleteId);
    }
}
