package com.ssafy.howdoilook.domain.ootd.service;

import com.ssafy.howdoilook.domain.ootd.dto.response.OotdListResponseDto;
import com.ssafy.howdoilook.domain.ootd.repository.OotdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OotdService {

    private final OotdRepository ootdRepository;

    public List<Long> findOotdList(Long userId) {

        List<OotdListResponseDto> OotdListResponseDtoList = new ArrayList<>();

        List<Long> clothesIdList = new ArrayList<>();
//        System.out.println("===여기 오나?");
//        System.out.println(userId);
        return ootdRepository.findClothesIdList(userId);
    }
}
