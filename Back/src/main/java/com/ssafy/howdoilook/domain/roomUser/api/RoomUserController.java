package com.ssafy.howdoilook.domain.roomUser.api;

import com.ssafy.howdoilook.domain.roomUser.dto.request.RoomUserAddRequestDto;
import com.ssafy.howdoilook.domain.roomUser.dto.request.RoomUserUpdateRequestDto;
import com.ssafy.howdoilook.domain.roomUser.service.RoomUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/roomuser")
public class RoomUserController {

    private final RoomUserService roomUserService;

    @PostMapping("/")
    public ResponseEntity<?> addRoomUser(@RequestBody RoomUserAddRequestDto roomUserAddRequest) {
        return ResponseEntity.ok().body(roomUserService.addRoomUser(roomUserAddRequest));
    }

    @PutMapping("/")
    public ResponseEntity<?> exitRoomUser(@RequestBody RoomUserUpdateRequestDto roomUserUpdateRequest) {
        return ResponseEntity.ok().body(roomUserService.updateRoomUser(roomUserUpdateRequest));
    }
}
