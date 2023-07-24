package com.ssafy.howdoilook.domain.clothes.service;

import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClothesService {

    private final ClothesRepository clothesRepository;
}
