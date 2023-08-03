package com.ssafy.howdoilook.domain.badge.api;

import com.ssafy.howdoilook.domain.badge.service.BadgeService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/badge")
public class BadgeController {

    private final BadgeService badgeService;
    
    @ApiOperation("해당 유저의 뱃지 목록 조회")
    @GetMapping("/list/{userId}")
    public ResponseEntity<?> getUserBadgeList(@PathVariable Long userId) {

        return ResponseEntity.ok()
                .body(badgeService.getUserBadgeList(userId));
    }

    @ApiOperation("특정 뱃지를 가진 유저 리스트 조회")
    @GetMapping("/user/list/{badgeType}")
    public ResponseEntity<?> getUserListByBadge(@PathVariable String badgeType) {

        return ResponseEntity.ok()
                .body(badgeService.getUserListByBadge(badgeType));
    }
}
