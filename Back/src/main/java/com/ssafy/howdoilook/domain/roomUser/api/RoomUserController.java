package com.ssafy.howdoilook.domain.roomUser.api;

import com.ssafy.howdoilook.domain.roomUser.dto.request.RoomUserAddRequestDto;
import com.ssafy.howdoilook.domain.roomUser.dto.request.RoomUserUpdateRequestDto;
import com.ssafy.howdoilook.domain.roomUser.service.RoomUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.AccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/roomuser")
public class RoomUserController {

    private final RoomUserService roomUserService;

    @PostMapping("")
    public ResponseEntity<Long> addRoomUser(@RequestBody RoomUserAddRequestDto roomUserAddRequest,
                                         @AuthenticationPrincipal UserDetails userDetails) throws AccessException {
        return ResponseEntity.status(HttpStatus.OK).body(roomUserService.addRoomUser(roomUserAddRequest, userDetails));
    }

    @PutMapping("")
    public ResponseEntity<?> exitRoomUser(@RequestBody RoomUserUpdateRequestDto roomUserUpdateRequest) {
        return ResponseEntity.ok().body(roomUserService.updateRoomUser(roomUserUpdateRequest));
    }

    @PutMapping("/kick")
    public ResponseEntity<?> kickRoomUser(@RequestParam(value = "userId") Long userId,
                                          @RequestParam(value = "roomId") Long roomId) {
        return ResponseEntity.ok().body(roomUserService.kickRoomUser(userId, roomId));
    }
}
