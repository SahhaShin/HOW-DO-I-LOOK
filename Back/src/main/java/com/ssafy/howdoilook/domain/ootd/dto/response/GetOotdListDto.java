package com.ssafy.howdoilook.domain.ootd.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class GetOotdListDto {

    private Long ootdId;
    private List<ClothesTypeListDto> tops;
    private List<ClothesTypeListDto> bottoms;
    private List<ClothesTypeListDto> shoes;
    private List<ClothesTypeListDto> accessories1;
    private List<ClothesTypeListDto> accessories2;
    private List<ClothesTypeListDto> accessories3;
}
