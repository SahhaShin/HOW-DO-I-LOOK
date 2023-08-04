package com.ssafy.howdoilook.domain.clothes.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ClothesUpdateDto {

    private String type;
//    private String photoLink;
    private String name;
    private String brand;
    private String info;

}
