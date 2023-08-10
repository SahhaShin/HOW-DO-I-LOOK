package com.ssafy.howdoilook.domain.ootd.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.howdoilook.domain.clothes.entity.ClothesType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class ClothesTypeListDto {

    private Long clothesId;
    private String clothesPhotoLink;

    @QueryProjection
    public ClothesTypeListDto(Long clothesId, String clothesPhotoLink) {
        this.clothesId = clothesId;
        this.clothesPhotoLink = clothesPhotoLink;
    }
}
