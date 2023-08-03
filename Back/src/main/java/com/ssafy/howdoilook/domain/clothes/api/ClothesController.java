package com.ssafy.howdoilook.domain.clothes.api;

import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesSaveRequestDto;
import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesUpdateDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesDetailResponseDto;
import com.ssafy.howdoilook.domain.clothes.dto.response.ClothesListResponseDto;
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
                                         @RequestPart("s3upload") MultipartFile multipartFile) throws Exception {

        clothesSaveRequestDto.setPhotoLink(imageService.saveImage(multipartFile));

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(clothesService.saveClothes(clothesSaveRequestDto));
    }

    @PutMapping("/{clothesId}")
    public ResponseEntity<Long> updateClothes(@PathVariable("clothesId") Long clothesId,
                                           @RequestPart ClothesUpdateDto clothesUpdateDto,
                                           @RequestPart("s3upload") MultipartFile multipartFile) throws IOException {

        return ResponseEntity.status(HttpStatus.CREATED).body(clothesService.updateClothes(clothesId, clothesUpdateDto, multipartFile));
    }

    @DeleteMapping("{clothesId}")
    public ResponseEntity<Long> deleteClothes(@PathVariable("clothesId") Long clothesId) {

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(clothesService.deleteClothes(clothesId));
    }

    @GetMapping("list")
    public ResponseEntity<List<ClothesListResponseDto>> findClothesList(@RequestParam(value = "type") String type,
                                                                        @RequestParam(value = "userId") Long userId,
                                                                        @RequestParam(value = "page") int page) {

        return ResponseEntity.status(HttpStatus.OK).body(clothesService.findClothesList(type, userId, page));
    }

    @GetMapping("detail/{clothesId}")
    public ResponseEntity<ClothesDetailResponseDto> findClothesDetail(@PathVariable("clothesId") Long clothesId) {

        return ResponseEntity.status(HttpStatus.OK).body(clothesService.findClothesDetail(clothesId));
    }
}
