package com.ssafy.howdoilook.domain.roomUser.api;

import com.ssafy.howdoilook.domain.roomUser.dto.response.RoomUserAddResponseDto;
import com.ssafy.howdoilook.domain.roomUser.dto.response.RoomUserGetListDto;
import com.ssafy.howdoilook.domain.roomUser.service.RoomUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.AccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/roomuser")
public class RoomUserController {

    private final RoomUserService roomUserService;

    @PostMapping("")
    public ResponseEntity<RoomUserAddResponseDto> addRoomUser(@RequestParam(value = "userId") Long userId,
                                                              @RequestParam(value = "roomId") Long roomId,
                                                              @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        return ResponseEntity.status(HttpStatus.CREATED).body(roomUserService.addRoomUser(userId, roomId, userDetails));
    }

    @DeleteMapping("")
    public ResponseEntity<?> exitRoomUser(@RequestParam(value = "userId") Long userId,
                                          @RequestParam(value = "roomId") Long roomId,
                                          @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        roomUserService.updateRoomUser(userId, roomId, userDetails);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @DeleteMapping("/kick")
    public ResponseEntity<?> kickRoomUser(@RequestParam(value = "userId") Long userId,
                                          @RequestParam(value = "roomId") Long roomId) {

        roomUserService.kickRoomUser(userId, roomId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @GetMapping("/list")
    public ResponseEntity<List<RoomUserGetListDto>> getRoomUserList(@RequestParam(value = "userId") Long userId,
                                                                    @RequestParam(value = "roomId") Long roomId,
                                                                    @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        return ResponseEntity.status(HttpStatus.OK).body(roomUserService.getRoomUserList(roomId, userId, userDetails));

    }
}
