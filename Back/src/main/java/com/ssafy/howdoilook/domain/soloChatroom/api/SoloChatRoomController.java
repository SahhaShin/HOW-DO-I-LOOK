package com.ssafy.howdoilook.domain.soloChatroom.api;

import com.ssafy.howdoilook.domain.soloChatroom.dto.response.ChatRoomDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatContextRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.response.ChatContextListResponseDto;
import com.ssafy.howdoilook.domain.soloChatroom.service.SoloChatRoomService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/soloChatRoom")
public class SoloChatRoomController {

    private final SoloChatRoomService soloChatRoomService;


    @GetMapping("/{id}")
    public ResponseEntity<?> getChatList(@PathVariable("id") Long userId){
        System.out.println("도착");
        List<ChatRoomDto> result = soloChatRoomService.getUserChatRoom(userId);
        return new ResponseEntity<List<ChatRoomDto>>(result, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> enterChatRoom(@RequestBody ChatContextRequestDto requestDto){
        System.out.println(requestDto.getUserA());
        if(requestDto.getUserA() == null || requestDto.getUserB() == null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else if(requestDto.getUserA() == requestDto.getUserB()){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        ChatContextListResponseDto result = soloChatRoomService.enterUser(requestDto);
        return new ResponseEntity<ChatContextListResponseDto>(result, HttpStatus.OK);
    }


}
