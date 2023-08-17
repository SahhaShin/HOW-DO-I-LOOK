package com.ssafy.howdoilook.domain.comment.service;

import com.ssafy.howdoilook.domain.comment.dto.request.CommentSaveRequestDto;
import com.ssafy.howdoilook.domain.comment.dto.request.CommentUpdateRequestDto;
import com.ssafy.howdoilook.domain.comment.dto.response.CommentResponseDto;
import com.ssafy.howdoilook.domain.comment.entity.Comment;
import com.ssafy.howdoilook.domain.comment.repository.CommentRepository;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feed.repository.FeedRepository;
import com.ssafy.howdoilook.domain.feed.service.FeedService;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.domain.user.service.UserService;
import com.ssafy.howdoilook.global.handler.AccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {
    private final UserService userService;
    private final FeedService feedService;
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public Long saveComment(CommentSaveRequestDto commentSaveRequestDto, UserDetails userDetails) {
        String clientEmail = userDetails.getUsername();

        User findUser = userRepository.findById(commentSaveRequestDto.getUserId()).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 User입니다.",1));

        if (!clientEmail.equals(findUser.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }


        Feed findFeed = feedRepository.findById(commentSaveRequestDto.getFeedId()).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 Feed입니다.",1));
        Comment parentComment = null;
        if (commentSaveRequestDto.getParentCommentId() != null) {
             parentComment= commentRepository.findById(commentSaveRequestDto.getParentCommentId()).orElseThrow(
                    () -> new EmptyResultDataAccessException("존재하지 않는 parentComment입니다.",1));
        }
        Comment comment = Comment.builder()
                .user(findUser)
                .feed(findFeed)
                .content(commentSaveRequestDto.getContent())
                .parent(parentComment)
                .build();
        commentRepository.save(comment);
        return comment.getId();
    }
    @Transactional
    public Long updateComment(Long commentId, CommentUpdateRequestDto commentUpdateRequestDto,UserDetails userDetails){
        String clientEmail = userDetails.getUsername();

        Comment findComment = commentRepository.findById(commentId).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 comment입니다.",1));

        if (!clientEmail.equals(findComment.getUser().getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        findComment.updateContent(commentUpdateRequestDto.getContent());
        return findComment.getId();
    }
    @Transactional
    public void deleteComment(Long commentId,UserDetails userDetails){

        String clientEmail = userDetails.getUsername();

        Comment findComment = commentRepository.findById(commentId).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 comment입니다.",1));

        if (!clientEmail.equals(findComment.getUser().getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        commentRepository.delete(findComment);
    }

    public Page<CommentResponseDto> selectCommentByFeedId(Long feedId, Pageable page){

        Page<Comment> results = commentRepository.selectCommentByFeedId(feedId, page);
        List<Comment> content = results.getContent();

        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        for (Comment comment : content) {
            CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                    .commentId(comment.getId())
                    .userId(comment.getUser().getId())
                    .userNickname(comment.getUser().getNickname())
                    .userProfileImg(comment.getUser().getProfileImg())
                    .modifiedDate(comment.getModifiedDate())
                    .feedId(comment.getFeed().getId())
                    .content(comment.getContent())
                    .build();
            commentResponseDtoList.add(commentResponseDto);
        }
        return new PageImpl<>(commentResponseDtoList, page, results.getTotalElements());
    }

    public Page<CommentResponseDto> selectCommentByFeedIdAndParentCommentId(Long feedId,Long parentCommentId, Pageable page){

        Page<Comment> results = commentRepository.selectCommentByFeedIdAndParentCommentId(feedId, parentCommentId, page);
        List<Comment> content = results.getContent();

        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        for (Comment comment : content) {
            CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                    .commentId(comment.getId())
                    .userId(comment.getUser().getId())
                    .userNickname(comment.getUser().getNickname())
                    .modifiedDate(comment.getModifiedDate())
                    .feedId(comment.getFeed().getId())
                    .parentCommentId(comment.getParent().getId())
                    .content(comment.getContent())
                    .userProfileImg(comment.getUser().getProfileImg())
                    .build();
            commentResponseDtoList.add(commentResponseDto);
        }
        return new PageImpl<>(commentResponseDtoList, page, results.getTotalElements());
    }
}
