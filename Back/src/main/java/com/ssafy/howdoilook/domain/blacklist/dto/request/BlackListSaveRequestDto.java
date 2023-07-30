package com.ssafy.howdoilook.domain.blacklist.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Getter
@Service
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BlackListSaveRequestDto {
    private Long userId;
    private Long targetUserId;

}
