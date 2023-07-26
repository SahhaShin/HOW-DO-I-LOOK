package com.ssafy.howdoilook.domain.user.api;

import com.ssafy.howdoilook.domain.user.dto.request.UserSearchCondition;
import com.ssafy.howdoilook.domain.user.dto.request.UserSignUpRequestDto;
import com.ssafy.howdoilook.domain.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @ApiOperation(value = "일반 회원 가입")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpRequestDto userSignUpRequestDto) throws Exception {

        return ResponseEntity.ok()
                .body(userService.signUp(userSignUpRequestDto));
    }

    @ApiOperation(value = "JWT 토큰 테스트", notes = "추후 삭제 예정")
    @GetMapping("/jwt")
    public ResponseEntity<?> jwtTest() {

        return ResponseEntity.ok()
                .body("JWT Test 통과!");
    }

    @ApiOperation(value = "로그아웃", notes = "Header로 AccessToken 필요 (Authorization : Bearer {token})")
    @GetMapping("/logout/{email}")
    public ResponseEntity<?> logout(@RequestHeader String authorization, @PathVariable String email) {

        return ResponseEntity.ok()
                .body(userService.logout(authorization, email));
    }

    @ApiOperation(value = "특정 유저 한명 조회")
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {

        return ResponseEntity.ok()
                .body(userService.getUserById(id));
    }

    @ApiOperation(value = "전체 유저 조회")
    @GetMapping("/list")
    public ResponseEntity<?> getUserList() {

        return ResponseEntity.ok()
                .body(userService.getUserList());
    }

    @ApiOperation(value = "유저 검색", notes = "NonPaging")
    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(UserSearchCondition condition) {

        return ResponseEntity.ok()
                .body(userService.searchUsers(condition));
    }

    @ApiOperation(value = "유저 검색(페이징)", notes = "Paging")
    @GetMapping("/search/paging")
    public ResponseEntity<?> searchPagedUsers(UserSearchCondition condition, Pageable pageable) {

        return ResponseEntity.ok()
                .body(userService.searchPagedUsers(condition, pageable));
    }

    @ApiOperation(value = "유저 검색(스크롤페이징)", notes = "ScrollPaging")
    @GetMapping("/search/scroll")
    public ResponseEntity<?> searchScrollPagedUsers(UserSearchCondition condition, int scrollOffset, int pageSize) {

        return ResponseEntity.ok()
                .body(userService.searchScrollPagedUsers(condition, scrollOffset, pageSize));
    }
}
