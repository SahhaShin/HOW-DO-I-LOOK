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

    @GetMapping("/{userId}")
    public ResponseEntity<Page<FolloweeResponseDto>> selectFollowerAndFollowee(@PathVariable(name = "userId") Long userId, @AuthenticationPrincipal UserDetails userDetails, Pageable page){
        Page<FolloweeResponseDto> followeeResponseDtos = followService.selectFolloweeList(userId,userDetails, page);
        return ResponseEntity.status(HttpStatus.OK).body(followeeResponseDtos);
    }
}
