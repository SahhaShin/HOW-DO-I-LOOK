package com.ssafy.howdoilook.domain.blacklist.api;

import com.ssafy.howdoilook.domain.blacklist.dto.request.BlackListDeleteRequestDto;
import com.ssafy.howdoilook.domain.blacklist.dto.request.BlackListSaveRequestDto;
import com.ssafy.howdoilook.domain.blacklist.dto.response.BlackListSelectResponseDto;
import com.ssafy.howdoilook.domain.blacklist.service.BlackListService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/blacklist")
public class BlackListController {
    private final BlackListService blackListService;


    @PostMapping("/")
    public ResponseEntity<Long> saveBlackList(@RequestBody BlackListSaveRequestDto blackListSaveRequestDto){
        Long id = blackListService.saveBlackList(blackListSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<Page<BlackListSelectResponseDto>> selectBlackList(@PathVariable(name = "userId") Long userId, Pageable pageable){
        Page<BlackListSelectResponseDto> blackListByUserId = blackListService.findBlackListByUserId(userId, pageable);
        return ResponseEntity.ok().body(blackListByUserId);
    }
    @DeleteMapping("/")
    public ResponseEntity<String> deleteBlackList(@RequestBody BlackListDeleteRequestDto blackListDeleteRequestDto){
        blackListService.deleteBlackList(blackListDeleteRequestDto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

}