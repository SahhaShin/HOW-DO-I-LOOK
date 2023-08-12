package com.ssafy.howdoilook.domain.feedPhoto.api;

import com.ssafy.howdoilook.domain.feed.dto.response.PhotoResponseDto;
import com.ssafy.howdoilook.domain.feedPhoto.service.FeedPhotoService;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feedphoto")
public class FeedPhotoController {
    private final FeedPhotoService feedPhotoService;

    @GetMapping("")
    public ResponseEntity<Page<PhotoResponseDto>> selectPhoto(Pageable pageable){
        Page<PhotoResponseDto> photoResponseDtos = feedPhotoService.selectPhoto(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(photoResponseDtos);
    }
    @GetMapping("/hashtag")
    public ResponseEntity<Page<PhotoResponseDto>> selectPhotoByHashtag(@RequestParam(name = "hashtag") List<String> hashtagList, Pageable pageable){
        Page<PhotoResponseDto> photoResponseDtos = feedPhotoService.selectPhotoByHashtag(hashtagList, pageable);
        return ResponseEntity.status(HttpStatus.OK).body(photoResponseDtos);
    }


}
