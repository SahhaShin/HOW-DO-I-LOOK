package com.ssafy.howdoilook.domain.hashtag.api;


import com.ssafy.howdoilook.domain.hashtag.dto.response.HashTagResponseDto;
import com.ssafy.howdoilook.domain.hashtag.service.HashTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hashtag")
/**
 * 테스트용 컨트롤러
 */
public class HashTagController {

    public final HashTagService hashTagService;

    @GetMapping("/id")
    public ResponseEntity<?> findByHashTagId(@RequestParam(name = "id") Long id){
        HashTagResponseDto findHashTag = hashTagService.findByHashTagId(id);

        return ResponseEntity.ok()
                .body(findHashTag);
    }
    @GetMapping("/content")
    public ResponseEntity<?> findByHashTagContent(@RequestParam(name = "content") String content){
        HashTagResponseDto findHashTag = hashTagService.findByHashTagContent(content);
        return ResponseEntity.ok()
                .body(findHashTag);
    }
}
