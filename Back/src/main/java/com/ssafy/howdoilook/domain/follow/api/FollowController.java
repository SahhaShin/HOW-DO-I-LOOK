package com.ssafy.howdoilook.domain.follow.api;

import com.ssafy.howdoilook.domain.follow.dto.request.FollowDeleteRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.request.FollowSaveRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.response.FolloweeResponseDto;
import com.ssafy.howdoilook.domain.follow.dto.response.FollowerResponseDto;
import com.ssafy.howdoilook.domain.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @PostMapping("")
    public ResponseEntity<Long> saveFollow(@RequestBody FollowSaveRequestDto followSaveRequestDto, @AuthenticationPrincipal UserDetails userDetails){
        Long id = followService.saveFollow(followSaveRequestDto,userDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    @DeleteMapping("")
    public ResponseEntity<?> deleteFollow(@RequestBody FollowDeleteRequestDto followDeleteRequestDto, @AuthenticationPrincipal UserDetails userDetails){
        followService.deleteFollow(followDeleteRequestDto,userDetails);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }
    //나를 팔로워 하는사람
    @GetMapping("/follower/{userId}")
    public ResponseEntity<Page<FollowerResponseDto>> selectFollower(@PathVariable(name = "userId") Long userId, Pageable page){
        Page<FollowerResponseDto> followerResponseDtos = followService.selectFollowerList(userId, page);
        return ResponseEntity.status(HttpStatus.OK).body(followerResponseDtos);
    }


    //내가 팔로우 하는사랑
    @GetMapping("/followee/{userId}")
    public ResponseEntity<Page<FolloweeResponseDto>> selectFollowee(@PathVariable(name = "userId") Long userId, Pageable page){
        Page<FolloweeResponseDto> followeeResponseDtos = followService.selectFolloweeList(userId, page);
        return ResponseEntity.status(HttpStatus.OK).body(followeeResponseDtos);
    }
}
