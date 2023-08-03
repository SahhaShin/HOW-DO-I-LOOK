package com.ssafy.howdoilook.domain.hashtag.service;


import com.ssafy.howdoilook.domain.hashtag.dto.response.HashTagResponseDto;
import com.ssafy.howdoilook.domain.hashtag.entity.Hashtag;
import com.ssafy.howdoilook.domain.hashtag.repository.HashTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HashTagService {
    private final HashTagRepository hashTagRepository;

    /**
     * id로 hashtag 조회
     * @param id
     * @return
     *
     */
    public HashTagResponseDto findByHashTagId(Long id) {
        Hashtag findHashTag = hashTagRepository.findById(id)
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는 HashTag입니다.",1));
        return new HashTagResponseDto(findHashTag);
    }

    /**
     * 모든 해시태그 조회
     * @return
     */
    public List<HashTagResponseDto> findHashTagAll(){
        List<HashTagResponseDto> findAllHashTagResponseDto = new ArrayList<>();

        List<Hashtag> findHashTagList = hashTagRepository.findAll();

        for (Hashtag hashtag : findHashTagList) {
            findAllHashTagResponseDto.add(new HashTagResponseDto(hashtag));
        }
        return findAllHashTagResponseDto;
    }

    public HashTagResponseDto findByHashTagContent(String content){
        Hashtag findHashTag = hashTagRepository.findByContent(content)
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는 HashTag입니다.",1));
        return new HashTagResponseDto(findHashTag);
    }

    /**
     *
     * @param hashtagContent
     * @return
     */
    @Transactional
    public Long savaHashTag(String hashtagContent){
        Optional<Hashtag> findHashTag = hashTagRepository.findByContent(hashtagContent);
        if (findHashTag.isEmpty()) {
            Hashtag hashtag = Hashtag.builder()
                    .content(hashtagContent)
                    .build();
            hashTagRepository.save(hashtag);
            return hashtag.getId();
        }
        else{
            return findHashTag.get().getId();
        }
    }

}
