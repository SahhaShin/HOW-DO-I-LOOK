package com.ssafy.howdoilook.domain.ootd.dto.response;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetOotdListDto {

    private Long ootdId;
    private Integer order;
    private List<ClothesTypeListDto> tops;
    private List<ClothesTypeListDto> bottoms;
    private List<ClothesTypeListDto> shoes;
    private List<ClothesTypeListDto> accessories1;
    private List<ClothesTypeListDto> accessories2;
    private List<ClothesTypeListDto> accessories3;

    @Builder
    public GetOotdListDto(Long ootdId, Integer order, List<ClothesTypeListDto> tops, List<ClothesTypeListDto> bottoms, List<ClothesTypeListDto> shoes, List<ClothesTypeListDto> accessories1, List<ClothesTypeListDto> accessories2, List<ClothesTypeListDto> accessories3) {
        this.ootdId = ootdId;
        this.order = order;
        this.tops = tops;
        this.bottoms = bottoms;
        this.shoes = shoes;
        this.accessories1 = accessories1;
        this.accessories2 = accessories2;
        this.accessories3 = accessories3;
    }

}
