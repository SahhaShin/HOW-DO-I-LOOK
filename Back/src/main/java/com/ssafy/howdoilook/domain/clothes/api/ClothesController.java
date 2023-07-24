package com.ssafy.howdoilook.domain.clothes.api;

import com.ssafy.howdoilook.domain.clothes.service.ClothesService;
import com.ssafy.howdoilook.domain.user.dto.request.UserSignUpRequestDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/clothes")
public class ClothesController {

//    private final ClothesService clothesService;
//
//    @PostMapping("/")
//    public ResponseEntity<?> saveClothes(@RequestBody ClothesRegistRequestDto clothesRegistRequestDto) throws Exception {
//
//        return ResponseEntity.ok()
//                .body(clothesService.regist(userSignUpRequestDto));
//    }
}
