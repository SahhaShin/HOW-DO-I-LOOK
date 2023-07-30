package com.ssafy.howdoilook.domain.room.api;

import com.ssafy.howdoilook.domain.room.dto.request.RoomAddRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.howdoilook.domain.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/room")
public class RoomController {
    private final RoomService roomService;

    @PostMapping("")
    public ResponseEntity<?> addRoom(@RequestBody RoomAddRequestDto roomAddRequestDto) {

        return ResponseEntity.ok().body(roomService.addRoom(roomAddRequestDto));
    }

    @PutMapping("/{roomId}")
    public ResponseEntity<?> updateRoom(@PathVariable("roomId") Long roomId, @RequestBody RoomUpdateRequestDto roomUpdateRequestDto) {

        return ResponseEntity.ok().body(roomService.updateRoom(roomId, roomUpdateRequestDto));
    }

    @GetMapping("/list/all")
    public ResponseEntity<?> getAllRoomList(@RequestParam(value = "type", required = false) String type,
                                            @RequestParam(value = "page") int page) {

        return ResponseEntity.ok().body(roomService.getAllRoomList(type, page));
    }
}
