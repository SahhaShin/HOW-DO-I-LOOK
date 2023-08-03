package com.ssafy.howdoilook.domain.ootd.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ClothesAllTypeListDto {

    private Long clothesId;
    private String clothesPhotoLink;

    @QueryProjection
    public ClothesAllTypeListDto(Long clothesId, String clothesPhotoLink) {
        this.clothesId = clothesId;
        this.clothesPhotoLink = clothesPhotoLink;
    }
}
