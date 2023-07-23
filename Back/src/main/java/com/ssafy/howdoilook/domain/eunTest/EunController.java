package com.ssafy.howdoilook.domain.eunTest;

import com.ssafy.howdoilook.domain.user.dto.request.UserSignUpRequestDto;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api")
public class EunController {

    private final EunRepository eunRepository;

    @PostMapping("/test")
    public ResponseEntity<?> eunTest(@RequestBody Eun eun) throws Exception {

        eunRepository.save(eun);
        return ResponseEntity.ok()
                .body(1004);
    }
}
