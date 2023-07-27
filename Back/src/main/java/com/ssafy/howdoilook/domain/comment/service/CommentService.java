package com.ssafy.howdoilook.domain.comment.service;

import com.ssafy.howdoilook.domain.comment.dto.request.CommentSaveRequestDto;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

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
    public List<CommentResponseDto> selectCommentByFeedId(Long feedId){
        List<Comment> commentList = commentRepository.selectCommentByFeedId(feedId);
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        for (Comment comment : commentList) {
            commentResponseDtoList.add((entityToDto(comment)));
        }
        return commentResponseDtoList;
    }
    public List<CommentResponseDto> selectCommentByFeedIdAndParentCommentId(Long feedId,Long parentCommentId){
        List<Comment> commentList = commentRepository.selectCommentByFeedIdAndParentCommentId(feedId, parentCommentId);
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        for (Comment comment : commentList) {
            commentResponseDtoList.add((entityToDto(comment)));
        }
        return commentResponseDtoList;
    }

    private CommentResponseDto entityToDto(Comment comment){
        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .userId(comment.getUser().getId())
                .feedId(comment.getFeed().getId())
                .parentCommentId(comment.getParent().getId())
                .content(comment.getContent())
                .build();
        return commentResponseDto;
    }
//    public Long updateComment(CommentSaveRequestDto commentSaveRequestDto) {
//
//    }
}
