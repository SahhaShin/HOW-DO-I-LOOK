package com.ssafy.howdoilook.domain.follow.api;

import com.ssafy.howdoilook.domain.follow.dto.request.FollowDeleteRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.request.FollowSaveRequestDto;
import com.ssafy.howdoilook.domain.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {
    private final FollowService followService;

    @PostMapping("/")
    public Long saveFollow(@RequestBody FollowSaveRequestDto followSaveRequestDto){
        return followService.saveFollow(followSaveRequestDto);
    }
    @DeleteMapping("/")
    public void deleteFollow(@RequestBody FollowDeleteRequestDto followDeleteRequestDto){
        followService.deleteFollow(followDeleteRequestDto);
    }
    //테스트용 api
    @GetMapping("/{userId}")
    public ResponseEntity<?> selectFollowerAndFollowee(@PathVariable(name = "userId") Long userId, Pageable page){
        return ResponseEntity.ok(followService.selectFolloweeList(userId,page));
    }
}
