package com.ssafy.howdoilook.domain.blacklist.api;

import com.ssafy.howdoilook.domain.blacklist.dto.request.BlackListDeleteRequestDto;
import com.ssafy.howdoilook.domain.blacklist.dto.request.BlackListSaveRequestDto;
import com.ssafy.howdoilook.domain.blacklist.dto.response.BlackListSelectResponseDto;
import com.ssafy.howdoilook.domain.blacklist.service.BlackListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/blacklist")
public class BlackListController {
    private final BlackListService blackListService;


    @PostMapping("/")
    public Long saveBlackList(@RequestBody BlackListSaveRequestDto blackListSaveRequestDto){
        return blackListService.saveBlackList(blackListSaveRequestDto);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<?> selectBlackList(@PathVariable(name = "userId") Long userId){
        List<BlackListSelectResponseDto> blackListByUserId = blackListService.findBlackListByUserId(userId);
        return ResponseEntity.ok().body(blackListByUserId);
    }
    @DeleteMapping("/")
    public void deleteBlackList(@RequestBody BlackListDeleteRequestDto blackListDeleteRequestDto){
        blackListService.deleteBlackList(blackListDeleteRequestDto);
    }

}
