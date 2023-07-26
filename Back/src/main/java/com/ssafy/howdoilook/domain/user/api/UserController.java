package com.ssafy.howdoilook.domain.user.api;

import com.ssafy.howdoilook.domain.user.dto.request.UserSearchCondition;
import com.ssafy.howdoilook.domain.user.dto.request.UserSignUpRequestDto;
import com.ssafy.howdoilook.domain.user.dto.request.UserBySocialUpdateRequestDto;
import com.ssafy.howdoilook.domain.user.dto.request.UserUpdateRequestDto;
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

    @ApiOperation(value = "회원 탈퇴", notes = "바로 DB에서 삭제됨.")
    @DeleteMapping("/quit/{id}")
    public ResponseEntity<?> quit(@RequestHeader String authorization, @PathVariable Long id) {

        return ResponseEntity.ok()
                .body(userService.quit(authorization, id));
    }

    @ApiOperation(value = "JWT 토큰 테스트", notes = "추후 삭제 예정")
    @GetMapping("/jwt")
    public ResponseEntity<?> jwtTest() {

        return ResponseEntity.ok()
                .body("JWT Test 통과!");
    }

    @ApiOperation(value = "로그아웃", notes = "Header로 AccessToken 필요 (Authorization : Bearer {token})")
    @GetMapping("/logout/{id}")
    public ResponseEntity<?> logout(@RequestHeader String authorization, @PathVariable Long id) {

        return ResponseEntity.ok()
                .body(userService.logout(authorization, id));
    }

    @ApiOperation(value = "유저 검색", notes = "NonPaging")
    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(UserSearchCondition condition) {

        return ResponseEntity.ok()
                .body(userService.searchUsers(condition));
    }

    @ApiOperation(value = "유저 검색(페이징)", notes = "Paging: ?ageGoe=7&page=0&size=1의 형태")
    @GetMapping("/search/paging")
    public ResponseEntity<?> searchPagedUsers(UserSearchCondition condition, Pageable pageable) {

        return ResponseEntity.ok()
                .body(userService.searchPagedUsers(condition, pageable));
    }

    @ApiOperation(value = "유저 검색(스크롤페이징)", notes = "ScrollPaging, 이 방식은 대신 scrollOffset, pageSize는 필수로 들어가야함")
    @GetMapping("/search/scroll")
    public ResponseEntity<?> searchScrollPagedUsers(UserSearchCondition condition, int scrollOffset, int pageSize) {

        return ResponseEntity.ok()
                .body(userService.searchScrollPagedUsers(condition, scrollOffset, pageSize));
    }

    @ApiOperation(value = "소셜 로그인 유저 추가 정보 입력", notes = "age, gender, nickname를 입력하면, role도 GUEST -> USER로 변경됨")
    @PutMapping("/social/update/{id}")
    public ResponseEntity<?> updateSocialUserInfo(@PathVariable Long id, @RequestBody UserBySocialUpdateRequestDto userBySocialUpdateRequestDto) {

        return ResponseEntity.ok()
                .body(userService.updateSocialUserInfo(id, userBySocialUpdateRequestDto));
    }

    /*
    * 유저 정보 업데이트
    * */
    @ApiOperation(value = "유저 정보 수정")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserUpdateRequestDto userUpdateRequestDto) {

        return ResponseEntity.ok()
                .body(userService.updateUserInfo(id, userUpdateRequestDto));
    }


    /*
    * 유저 프로필 사진 업데이트 : 추후 진행 예정
    * */
}
