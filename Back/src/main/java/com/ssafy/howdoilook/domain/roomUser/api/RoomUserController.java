package com.ssafy.howdoilook.domain.roomUser.api;

import com.ssafy.howdoilook.domain.room.service.RoomService;
import com.ssafy.howdoilook.domain.roomUser.dto.request.RoomUserAddRequest;
import com.ssafy.howdoilook.domain.roomUser.repository.RoomUserRepository;
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
    public ResponseEntity<?> addRoomUser(@RequestBody RoomUserAddRequest roomUserAddRequest) {
        return ResponseEntity.ok().body(roomUserService.addRoomUser(roomUserAddRequest));
    }
}
