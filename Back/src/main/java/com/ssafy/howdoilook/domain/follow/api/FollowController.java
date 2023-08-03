package com.ssafy.howdoilook.domain.follow.api;

import com.ssafy.howdoilook.domain.follow.dto.request.FollowDeleteRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.request.FollowSaveRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.response.FolloweeResponseDto;
import com.ssafy.howdoilook.domain.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @PostMapping("")
    public ResponseEntity<Long> saveFollow(@RequestBody FollowSaveRequestDto followSaveRequestDto){
        Long id = followService.saveFollow(followSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    @DeleteMapping("")
    public ResponseEntity<?> deleteFollow(@RequestBody FollowDeleteRequestDto followDeleteRequestDto){
        followService.deleteFollow(followDeleteRequestDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }
    //테스트용 api
    @GetMapping("/{userId}")
    public ResponseEntity<Page<FolloweeResponseDto>> selectFollowerAndFollowee(@PathVariable(name = "userId") Long userId, Pageable page){
        Page<FolloweeResponseDto> followeeResponseDtos = followService.selectFolloweeList(userId, page);
        return ResponseEntity.status(HttpStatus.OK).body(followeeResponseDtos);
    }
}
