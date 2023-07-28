package com.ssafy.howdoilook.domain.follow.api;

import com.ssafy.howdoilook.domain.follow.dto.request.FollowDeleteRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.request.FollowSaveRequestDto;
import com.ssafy.howdoilook.domain.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
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
}
