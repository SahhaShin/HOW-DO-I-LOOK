package com.ssafy.howdoilook.domain.clothes.dto.response;

import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClothesListResponseDto {

    private Long clothesId;

    private String photoLink;

    @Builder
    public ClothesListResponseDto(Clothes clothes) {
        this.clothesId = clothes.getId();
        this.photoLink = clothes.getPhotoLink();
    }

}
