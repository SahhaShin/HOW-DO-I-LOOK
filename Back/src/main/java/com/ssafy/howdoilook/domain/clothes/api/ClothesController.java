package com.ssafy.howdoilook.domain.clothes.api;

import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesSaveRequestDto;
import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesUpdateDto;
import com.ssafy.howdoilook.domain.clothes.service.ClothesService;
import com.ssafy.howdoilook.domain.user.dto.request.UserSignUpRequestDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/clothes")
public class ClothesController {

    private final ClothesService clothesService;

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
}
