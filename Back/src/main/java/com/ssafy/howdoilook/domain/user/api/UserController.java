package com.ssafy.howdoilook.domain.user.api;

import com.ssafy.howdoilook.domain.user.dto.request.UserSearchCondition;
import com.ssafy.howdoilook.domain.user.dto.request.UserSignUpRequestDto;
import com.ssafy.howdoilook.domain.user.dto.request.UserBySocialUpdateRequestDto;
import com.ssafy.howdoilook.domain.user.dto.request.UserUpdateRequestDto;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.service.UserService;
import com.ssafy.howdoilook.global.s3upload.ImageService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.expression.AccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final ImageService imageService;

    @ApiOperation(value = "일반 회원 가입")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestPart UserSignUpRequestDto userSignUpRequestDto,
                                    @RequestPart("s3upload") MultipartFile multipartFile) throws Exception {

        return ResponseEntity.ok()
                .body(userService.signUp(userSignUpRequestDto, multipartFile));
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

    @ApiOperation(value = "이메일로 유저 아이디(PK) 얻기")
    @GetMapping("/userId/{email}")
    public ResponseEntity<?> getUserIdByEmail(@PathVariable String email) {

        return ResponseEntity.ok()
                .body(userService.getUserIdByEmail(email));
    }
    
    @ApiOperation(value = "이메일로 유저 검색 (이메일 중복 체크 용)", notes = "true : email 이미 존재, false : email 존재 X")
    @GetMapping("/checkbyemail/{email}")
    public ResponseEntity<?> checkUserEmail(@PathVariable String email) {

        return ResponseEntity.ok()
                .body(userService.checkUserEmail(email));
    }

    @ApiOperation(value = "닉네임으로 유저 검색 (닉네임 중복 체크 용)", notes = "true : nickname 이미 존재, false : nickname 존재 X")
    @GetMapping("/checkbynickname/{nickname}")
    public ResponseEntity<?> checkUserNickname(@PathVariable String nickname) {

        return ResponseEntity.ok()
                .body(userService.checkUserNickname(nickname));
    }

    @ApiOperation(value = "이메일로 유저 객체 얻기")
    @GetMapping("/getuserbyemail/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {

        return ResponseEntity.ok()
                .body(userService.getUserByEmail(email));
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
    @PutMapping("/social/update/{email}")
    public ResponseEntity<?> updateSocialUserInfo(@PathVariable String email, @RequestBody UserBySocialUpdateRequestDto userBySocialUpdateRequestDto) {

        return ResponseEntity.ok()
                .body(userService.updateSocialUserInfo(email, userBySocialUpdateRequestDto));
    }

    /*
     * 유저 정보 업데이트
     * */
    @ApiOperation(value = "유저 정보 수정")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestPart UserUpdateRequestDto userUpdateRequestDto,
                                        @RequestPart("s3upload") MultipartFile multipartFile,
                                        @AuthenticationPrincipal UserDetails userDetails) throws IOException, AccessException {

        return ResponseEntity.ok()
                .body(userService.updateUserInfo(id, userUpdateRequestDto, multipartFile, userDetails));
    }

    @Transactional
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteProfileImg(@PathVariable Long userId,
                                              @AuthenticationPrincipal UserDetails userDetails) throws AccessException {

        userService.deleteProfileImg(userId, userDetails);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");

    }

    @ApiOperation(value = "유저 대표 뱃지 수정", notes = "만약 대표 뱃지가 없다면 X임.")
    @PutMapping("/update/{id}/{badge}")
    public ResponseEntity<?> updateShowBadge(@PathVariable Long id, @PathVariable String badge) {

        return ResponseEntity.ok()
                .body(userService.updateShowBadge(id, badge));
    }

}
