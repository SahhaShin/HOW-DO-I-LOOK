package com.ssafy.howdoilook.domain.clothes.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClothesDetailResponseDto {
    private String type;
    private String photoLink;
    private String name;
    private String brand;
    private String info;

    @Builder
    public ClothesDetailResponseDto(String type, String photoLink, String name, String brand, String info) {
        this.type = type;
        this.photoLink = photoLink;
        this.name = name;
        this.brand = brand;
        this.info = info;
    }
}
