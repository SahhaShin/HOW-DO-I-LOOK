package com.ssafy.howdoilook.domain.alarm.api;

import com.ssafy.howdoilook.domain.alarm.dto.request.AlarmSaveRequestDto;
import com.ssafy.howdoilook.domain.alarm.dto.response.AlarmResponseDto;
import com.ssafy.howdoilook.domain.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {
    private final AlarmService alarmService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> selectAlarm(@PathVariable(name = "userId") Long userId){
        List<AlarmResponseDto> alarmResponseDtoList = alarmService.selectAlarmByUserId(userId);
        return ResponseEntity.ok().body(alarmResponseDtoList);
    }
    @PostMapping("/")
    public Long saveAlarm(@RequestBody AlarmSaveRequestDto alarmSaveRequestDto){
        return alarmService.saveAlarm(alarmSaveRequestDto);
    }
    @PutMapping("/{alarmId}")
    public Long readAlarm(@PathVariable(name = "alarmId") Long id){
         return alarmService.readAlarm(id);
    }
    @DeleteMapping("/{alarmId}")
    public void deleteAlarm(@PathVariable(name = "alarmId") Long id){
        alarmService.deleteAlarm(id);
    }
}
