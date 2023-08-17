package com.ssafy.howdoilook.domain.clothes.dto.response;

import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClothesListWithTotalPageDto {

    private int totalPage;
    private List<ClothesListResponseDto> clothesList;

    @Builder
    public ClothesListWithTotalPageDto(int totalPage, List<ClothesListResponseDto> clothesList) {
        this.totalPage = totalPage;
        this.clothesList = clothesList;
    }
}
