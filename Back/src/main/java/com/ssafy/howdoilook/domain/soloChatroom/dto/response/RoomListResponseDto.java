package com.ssafy.howdoilook.domain.soloChatroom.dto.response;

import com.ssafy.howdoilook.domain.soloChatroom.dto.ChatRoomDto;
import lombok.Data;

import java.util.List;

@Data
public class RoomListResponseDto {
    private List<ChatRoomDto> ChatRoomList;
}
