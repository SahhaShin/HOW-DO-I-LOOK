package com.ssafy.howdoilook.domain.room.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomListResponseWithTotalPageDto {

    private int totalPage;
    private List<RoomListResponseDto> roomList;

    @Builder
    public RoomListResponseWithTotalPageDto(int totalPage, List<RoomListResponseDto> roomListResponseDtos) {
        this.totalPage = totalPage;
        this.roomList = roomListResponseDtos;
    }
}
