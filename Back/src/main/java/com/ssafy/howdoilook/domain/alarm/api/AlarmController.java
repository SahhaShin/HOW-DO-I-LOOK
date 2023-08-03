package com.ssafy.howdoilook.domain.alarm.api;


import com.ssafy.howdoilook.domain.alarm.dto.request.AlarmSaveRequestDto;
import com.ssafy.howdoilook.domain.alarm.dto.response.AlarmResponseDto;
import com.ssafy.howdoilook.domain.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {
    private final AlarmService alarmService;

    @GetMapping("/{userId}")
    public ResponseEntity<Page<AlarmResponseDto>> selectAlarm(@PathVariable(name = "userId") Long userId, @AuthenticationPrincipal UserDetails userDetails, Pageable pageable){
        Page<AlarmResponseDto> alarmResponseDtoList = alarmService.selectAlarmByUserId(userId,userDetails,pageable);
        return ResponseEntity.ok().body(alarmResponseDtoList);
    }
    @PostMapping("")
    public ResponseEntity<Long> saveAlarm(@RequestBody AlarmSaveRequestDto alarmSaveRequestDto){
        Long id = alarmService.saveAlarm(alarmSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    @PutMapping("/{alarmId}")
    public ResponseEntity<Long> readAlarm(@PathVariable(name = "alarmId") Long alarmId, @AuthenticationPrincipal UserDetails userDetails){
        Long id = alarmService.readAlarm(alarmId,userDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    @DeleteMapping("/{alarmId}")
    public ResponseEntity<String> deleteAlarm(@PathVariable(name = "alarmId") Long alarmId, @AuthenticationPrincipal UserDetails userDetails) {
        alarmService.deleteAlarm(alarmId,userDetails);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }


}
