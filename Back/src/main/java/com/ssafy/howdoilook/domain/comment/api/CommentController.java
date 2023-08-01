package com.ssafy.howdoilook.domain.comment.api;

import com.ssafy.howdoilook.domain.comment.dto.request.CommentSaveRequestDto;
import com.ssafy.howdoilook.domain.comment.dto.request.CommentUpdateRequestDto;
import com.ssafy.howdoilook.domain.comment.dto.response.CommentResponseDto;
import com.ssafy.howdoilook.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/")
    public Long saveComment(@RequestBody CommentSaveRequestDto commentSaveRequestDto) {
        return commentService.saveComment(commentSaveRequestDto);
    }
    @GetMapping("/{feedId}")
    public ResponseEntity<?> selectByFeed(@PathVariable(name = "feedId") Long feedId, Pageable page){
        Page<CommentResponseDto> commentResponseDtos = commentService.selectCommentByFeedId(feedId, page);
        return ResponseEntity.ok().body(commentResponseDtos);
    }
    @GetMapping("/{feedId}/{parentCommentId}")
    public ResponseEntity<?> selectByFeedAndParentComment(@PathVariable(name = "feedId") Long feedId
            , @PathVariable(name = "parentCommentId") Long parentCommetId,Pageable page){
        Page<CommentResponseDto> commentResponseDtos = commentService.selectCommentByFeedIdAndParentCommentId(feedId, parentCommetId, page);
        return ResponseEntity.ok().body(commentResponseDtos);
    }
    @PutMapping("/{commentId}")
    public Long updateComment(@PathVariable(name = "commentId") Long commentId, @RequestBody CommentUpdateRequestDto commentUpdateRequestDto){
        return commentService.updateComment(commentId, commentUpdateRequestDto);
    }
    @DeleteMapping("/{commentId}")
    public Long deleteComment(@PathVariable(name = "commentId") Long commentId){
        commentService.deleteComment(commentId);
        return commentId;
    }
}
