package com.ssafy.howdoilook.domain.ootd.api;

import com.ssafy.howdoilook.domain.ootd.dto.request.OotdSaveRequestDto;
import com.ssafy.howdoilook.domain.ootd.service.OotdService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/ootd")
public class OotdController {

    private final OotdService ootdService;

    @PostMapping("")
    public ResponseEntity<?> saveOotd(@RequestBody OotdSaveRequestDto ootdSaveRequestDto){

        return ResponseEntity.ok()
                .body(ootdService.saveOotd(ootdSaveRequestDto));
    }

    @GetMapping("list/{userId}")
    public ResponseEntity<?> getOotdList(@PathVariable("userId") Long userId) {

        return ResponseEntity.ok().body(ootdService.findOotdList(userId));
    }
}
