package com.ssafy.howdoilook.domain.room.api;

import com.ssafy.howdoilook.domain.room.dto.request.RoomAddRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomDetailResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseWithTotalPageDto;
import com.ssafy.howdoilook.domain.room.service.RoomService;
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
@RequestMapping("/api/room")
public class RoomController {
    private final RoomService roomService;

    @PostMapping("")
    public ResponseEntity<Long> addRoom(@RequestBody RoomAddRequestDto roomAddRequestDto,
                                        @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.addRoom(roomAddRequestDto, userDetails));
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<Long> updateRoom(@PathVariable("roomId") Long roomId, @RequestBody RoomUpdateRequestDto roomUpdateRequestDto,
                                           @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        return ResponseEntity.status(HttpStatus.CREATED).body(roomService.updateRoom(roomId, roomUpdateRequestDto, userDetails));
    }

    @GetMapping("/list/all")
    public ResponseEntity<RoomListResponseWithTotalPageDto> getAllRoomList(@RequestParam(value = "type", required = false) String type,
                                                                           @RequestParam(value = "page") int page,
                                                                           @RequestParam(value = "search", required = false) String search) {

        return ResponseEntity.status(HttpStatus.OK).body(roomService.getAllRoomList(type, page, search));
    }

    @GetMapping("/list/following")
    public ResponseEntity<RoomListResponseWithTotalPageDto> getFollowingRoomList(@RequestParam(value = "type", required = false) String type,
                                                  @RequestParam(value = "page") int page,
                                                  @RequestParam(value = "userId") Long userId,
                                                  @RequestParam(value = "search", required = false) String search,
                                                  @AuthenticationPrincipal UserDetails userDetails) throws AccessException {
         return ResponseEntity.status(HttpStatus.OK).body(roomService.getFollowingRoomList(type, page, userId, search, userDetails));
    }

    @GetMapping("/detail/{roomId}")
    public ResponseEntity<RoomDetailResponseDto> getRoomDetail(@PathVariable("roomId") Long roomId) {

        return ResponseEntity.status(HttpStatus.OK).body(roomService.getRoomDetail(roomId));
    }

    @DeleteMapping("/end/{roomId}")
    public ResponseEntity<?> endRoom(@PathVariable("roomId") Long roomId, @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        roomService.endRoom(roomId, userDetails);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }
}
