package com.ssafy.howdoilook.domain.alarm.api;

import com.amazonaws.Response;
import com.ssafy.howdoilook.domain.alarm.dto.request.AlarmSaveRequestDto;
import com.ssafy.howdoilook.domain.alarm.dto.response.AlarmResponseDto;
import com.ssafy.howdoilook.domain.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {
    private final AlarmService alarmService;

    @GetMapping("/{userId}")
    public ResponseEntity<Page<AlarmResponseDto>> selectAlarm(@PathVariable(name = "userId") Long userId, Pageable pageable){
        Page<AlarmResponseDto> alarmResponseDtoList = alarmService.selectAlarmByUserId(userId, pageable);
        return ResponseEntity.ok().body(alarmResponseDtoList);
    }
    @PostMapping("/")
    public ResponseEntity<Long> saveAlarm(@RequestBody AlarmSaveRequestDto alarmSaveRequestDto){
        Long id = alarmService.saveAlarm(alarmSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    @PutMapping("/{alarmId}")
    public ResponseEntity<Long> readAlarm(@PathVariable(name = "alarmId") Long alarmId){
        Long id = alarmService.readAlarm(alarmId);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    @DeleteMapping("/{alarmId}")
    public ResponseEntity deleteAlarm(@PathVariable(name = "alarmId") Long alarmId) {
        alarmService.deleteAlarm(alarmId);
        return (ResponseEntity) ResponseEntity.status(HttpStatus.NO_CONTENT);
    }

}
