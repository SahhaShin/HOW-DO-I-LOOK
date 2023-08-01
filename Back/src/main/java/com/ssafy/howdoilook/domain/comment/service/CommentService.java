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
import lombok.RequiredArgsConstructor;
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
public class CommentService {
    private final UserService userService;
    private final FeedService feedService;
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public Long saveComment(CommentSaveRequestDto commentSaveRequestDto) {
        User findUser = userRepository.findById(commentSaveRequestDto.getUserId()).orElseThrow(
                () -> new IllegalArgumentException("해당 User가 없습니다."));
        Feed findFeed = feedRepository.findById(commentSaveRequestDto.getFeedId()).orElseThrow(
                () -> new IllegalArgumentException("해당 Feed가 없습니다."));
        Comment parentComment = null;
        if (commentSaveRequestDto.getParentCommentId() != null) {
             parentComment= commentRepository.findById(commentSaveRequestDto.getParentCommentId()).orElseThrow(
                    () -> new IllegalArgumentException("해당 parentComment가 없습니다."));
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
    public Long updateComment(Long commentId, CommentUpdateRequestDto commentUpdateRequestDto){
        Comment findComment = commentRepository.findById(commentId).orElseThrow(
                ()->new IllegalArgumentException("존재하지 않는 댓글입니다."));
        findComment.updateContent(commentUpdateRequestDto.getContent());
        return findComment.getId();
    }
    @Transactional
    public void deleteComment(Long commentId){
        commentRepository.deleteById(commentId);
    }

    public Page<CommentResponseDto> selectCommentByFeedId(Long feedId, Pageable page){
        Page<Comment> results = commentRepository.selectCommentByFeedId(feedId, page);
        List<Comment> content = results.getContent();

        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        for (Comment comment : content) {
            CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                    .commentId(comment.getId())
                    .userId(comment.getUser().getId())
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
                    .feedId(comment.getFeed().getId())
                    .parentCommentId(comment.getParent().getId())
                    .content(comment.getContent())
                    .build();
            commentResponseDtoList.add(commentResponseDto);
        }
        return new PageImpl<>(commentResponseDtoList, page, results.getTotalElements());
    }
}
