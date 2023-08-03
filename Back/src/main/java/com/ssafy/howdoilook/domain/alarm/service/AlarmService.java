package com.ssafy.howdoilook.domain.alarm.service;

import com.ssafy.howdoilook.domain.alarm.dto.request.AlarmSaveRequestDto;
import com.ssafy.howdoilook.domain.alarm.dto.response.AlarmResponseDto;
import com.ssafy.howdoilook.domain.alarm.entity.Alarm;
import com.ssafy.howdoilook.domain.alarm.repository.AlarmRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.handler.AccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmService {
    private final UserRepository userRepository;
    private final AlarmRepository alarmRepository;


    @Transactional
    public Long saveAlarm(AlarmSaveRequestDto alarmSaveRequestDto){
        User sender = userRepository.findById(alarmSaveRequestDto.getAlarmSenderId()).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 sender입니다.",1));
        User receiver = userRepository.findById(alarmSaveRequestDto.getAlarmreceiverId()).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 receiver입니다.",1));

        Alarm alarm = Alarm.builder()
                .user(receiver)
                .senderUser(sender)
                .type(alarmSaveRequestDto.getType())
                .content(alarmSaveRequestDto.getContent())
                .check(false)
                .build();
        alarmRepository.save(alarm);
        return alarm.getId();
    }
    public Page<AlarmResponseDto> selectAlarmByUserId(Long userId, UserDetails userDetails , Pageable pageable){

        String clientEmail = userDetails.getUsername();
        User findUser = userRepository.findById(userId).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 User입니다.", 1));

        if (!clientEmail.equals(findUser.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        Page<Alarm> alarms = alarmRepository.selectAlarmByUserId(userId, pageable);
        List<Alarm> content = alarms.getContent();

        List<AlarmResponseDto> alarmResponseDtoList = new ArrayList<>();

        for (Alarm alarm : content) {
            AlarmResponseDto alarmResponseDto = AlarmResponseDto.builder()
                    .id(alarm.getId())
                    .userId(alarm.getUser().getId())
                    .alarmSenderId(alarm.getSenderUser().getId())
                    .alarmSenderName(alarm.getSenderUser().getName())
                    .alarmSenderNickName(alarm.getSenderUser().getNickname())
                    .type(alarm.getType())
                    .content(alarm.getContent())
                    .check(alarm.getCheck())
                    .build();
            alarmResponseDtoList.add(alarmResponseDto);
        }
        return new PageImpl<>(alarmResponseDtoList, pageable, alarms.getTotalElements());
    }
    //알림 읽음으로 바꾸는 메서드
    @Transactional
    public Long readAlarm(Long id, UserDetails userDetails) {
        String clientEmail = userDetails.getUsername();

        Alarm findAlarm = alarmRepository.findById(id).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는Alarm입니다.",1));
        String email = findAlarm.getUser().getEmail();

        if (!clientEmail.equals(email)){
            throw new AccessException("접근 권한이 없습니다.");
        }

        findAlarm.readAlarm();
        return findAlarm.getId();
    }
    //알림 삭제
    @Transactional
    public void deleteAlarm(Long id, UserDetails userDetails){
        String clientEmail = userDetails.getUsername();

        Alarm findAlarm = alarmRepository.findById(id).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는Alarm입니다.",1));
        String email = findAlarm.getUser().getEmail();

        if (!clientEmail.equals(email)){
            throw new AccessException("접근 권한이 없습니다.");
        }
        alarmRepository.deleteById(id);
    }
}
