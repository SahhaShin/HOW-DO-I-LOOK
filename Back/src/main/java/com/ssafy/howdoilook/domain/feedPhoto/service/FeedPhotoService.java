package com.ssafy.howdoilook.domain.feedPhoto.service;

import com.ssafy.howdoilook.domain.feed.dto.request.PhotoSaveRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.request.PhotoUpdateRequestDto;
import com.ssafy.howdoilook.domain.feed.dto.response.PhotoResponseDto;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.repository.FeedRepository;
import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.feedPhoto.repository.FeedPhotoRepository;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.repository.FeedPhotoHashtagRepository;
import com.ssafy.howdoilook.domain.feedPhotoHashtag.service.FeedPhotoHashtagService;
import com.ssafy.howdoilook.domain.hashtag.service.HashTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedPhotoService {

    private final FeedPhotoRepository feedPhotoRepository;
    private final FeedRepository feedRepository;
    private final FeedPhotoHashtagRepository feedPhotoHashtagRepository;
    private final HashTagService hashTagService;
    private final FeedPhotoHashtagService feedPhotoHashtagService;


    public Page<PhotoResponseDto> selectPhotoByHashtag(List<String> hashtagList, Pageable pageable){
        Page<FeedPhoto> feedPhotos = feedPhotoRepository.selectPhotoByHashtag(hashtagList, pageable);
        List<FeedPhoto> feedPhotoList = feedPhotos.getContent();

        List<PhotoResponseDto> photoResponseDtoList = new ArrayList<>();
        for (FeedPhoto feedPhoto : feedPhotoList) {
            PhotoResponseDto photoResponseDto = new PhotoResponseDto();

            photoResponseDto.setId(feedPhoto.getId());
            photoResponseDto.setLink(feedPhoto.getLink());
            photoResponseDto.setHashtagList(new ArrayList<>());

            List<FeedPhotoHashtag> feedPhotoHashtagList = feedPhoto.getFeedPhotoHashtagList();

            for (FeedPhotoHashtag feedPhotoHashtag : feedPhotoHashtagList) {
                photoResponseDto.getHashtagList().add(feedPhotoHashtag.getHashtag().getContent());
            }
            photoResponseDtoList.add(photoResponseDto);
        }
        return new PageImpl<>(photoResponseDtoList, feedPhotos.getPageable(), feedPhotos.getTotalElements());
    }


    @Transactional
    public Long saveFeedPhoto(Long feedId, PhotoSaveRequestDto photoSaveRequestDto) {
        //피드 찾기
        Feed findFeed = feedRepository.findById(feedId)
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는Feed 입니다.",1));

        //사진 엔티티 만들기
        FeedPhoto feedPhoto = FeedPhoto.builder()
                .feed(findFeed)
                .link(photoSaveRequestDto.getLink())
                .build();

        //사진 엔티티 저장
        Long feedPhotoId = feedPhotoRepository.save(feedPhoto).getId();
        List<String> hashtagList = photoSaveRequestDto.getHashtagList();

        if (hashtagList!=null){
        //사진에 저장된 해시태그 저장
            for (String hashtag : hashtagList) {
                Long hashtagId = hashTagService.savaHashTag(hashtag);
                //사진 해시태그 연결
                Long feedPhotoHashtagId = feedPhotoHashtagService.saveFeedPhotoHashtag(feedPhotoId, hashtagId);
            }
        }
        return feedPhotoId;
    }
    @Transactional
    public Long updateFeedPhoto(PhotoUpdateRequestDto photoUpdateRequestDto) {
        //photoid로 사진 찾기
        FeedPhoto feedPhoto = feedPhotoRepository.findById(photoUpdateRequestDto.getId())
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는 Photo입니다.", 1));

        //feedphotohashtag 가져오기
        List<FeedPhotoHashtag> feedPhotoHashtagList = feedPhotoHashtagRepository.selectFeedPhotoHashtagByFeedPhotoId(feedPhoto.getId());
        if (feedPhotoHashtagList!=null){
            for (FeedPhotoHashtag feedPhotoHashtag : feedPhotoHashtagList) {
                feedPhotoHashtagRepository.delete(feedPhotoHashtag);
            }
        }

        //새로 저장할 해시태그리스트
        List<String> hashtagList = photoUpdateRequestDto.getHashtagList();

        //새로 넘어온 해시태그 전부 등록
        if(hashtagList!=null){
            for (String hashtag : hashtagList) {
                    Long hashtagId = hashTagService.savaHashTag(hashtag);
                    feedPhotoHashtagService.saveFeedPhotoHashtag(feedPhoto.getId(), hashtagId);
            }
        }
        return feedPhoto.getId();
    }


}
