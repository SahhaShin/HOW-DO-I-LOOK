package com.ssafy.howdoilook.domain.clothes.api;

import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesSaveRequestDto;
import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesUpdateDto;
import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import com.ssafy.howdoilook.domain.clothes.service.ClothesService;
import com.ssafy.howdoilook.global.s3upload.ImageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
                                         @RequestPart("s3upload") MultipartFile multipartFile) throws Exception {

        clothesSaveRequestDto.setPhotoLink(imageService.saveImage(multipartFile));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(clothesService.saveClothes(clothesSaveRequestDto));
    }

    @PutMapping("/{clothesId}")
    public ResponseEntity<?> updateClothes(@PathVariable("clothesId") Long clothesId,
                                           @RequestPart ClothesUpdateDto clothesUpdateDto,
                                           @RequestPart("s3upload") MultipartFile multipartFile) throws IOException {

        Long updateId = clothesService.updateClothes(clothesId, clothesUpdateDto, multipartFile);

        return ResponseEntity.ok().body(updateId);
    }

    @DeleteMapping("{clothesId}")
    public ResponseEntity<?> deleteClothes(@PathVariable("clothesId") Long clothesId) {

        Long deleteId = clothesService.deleteClothes(clothesId);

        return ResponseEntity.ok().body(deleteId);
    }

    @GetMapping("list")
    public ResponseEntity<?> findClothesList(@RequestParam(value = "type") String type,
                                             @RequestParam(value = "userId") Long userId,
                                             @RequestParam(value = "page") int page) {

        return ResponseEntity.ok().body(clothesService.findClothesList(type, userId, page));
    }

    @GetMapping("detail/{clothesId}")
    public ResponseEntity<?> findClothesDetail(@PathVariable("clothesId") Long clothesId) {

        return ResponseEntity.ok().body(clothesService.findClothesDetail(clothesId));
    }
}
