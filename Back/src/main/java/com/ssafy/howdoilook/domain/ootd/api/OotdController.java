package com.ssafy.howdoilook.domain.ootd.api;

import com.ssafy.howdoilook.domain.ootd.dto.request.OotdSaveRequestDto;
import com.ssafy.howdoilook.domain.ootd.dto.response.GetOotdListDto;
import com.ssafy.howdoilook.domain.ootd.service.OotdService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/ootd")
public class OotdController {

    private final OotdService ootdService;

    @PostMapping("")
    public ResponseEntity<Long> saveOotd(@RequestBody OotdSaveRequestDto ootdSaveRequestDto){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ootdService.saveOotd(ootdSaveRequestDto));
    }

    @GetMapping("list/{userId}")
    public ResponseEntity<List<GetOotdListDto>> getOotdList(@PathVariable("userId") Long userId) {

        return ResponseEntity.status(HttpStatus.OK).body(ootdService.findOotdList(userId));
    }
}
