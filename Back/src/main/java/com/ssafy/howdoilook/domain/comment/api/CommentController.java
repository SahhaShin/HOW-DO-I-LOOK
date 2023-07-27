package com.ssafy.howdoilook.domain.comment.api;

import com.ssafy.howdoilook.domain.comment.dto.request.CommentSaveRequestDto;
import com.ssafy.howdoilook.domain.comment.dto.response.CommentResponseDto;
import com.ssafy.howdoilook.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<?> selectByFeed(@PathVariable(name = "feedId") Long feedId){
        List<CommentResponseDto> commentResponseDtoList = commentService.selectCommentByFeedId(feedId);
        return ResponseEntity.ok().body(commentResponseDtoList);
    }
    @GetMapping("/{feedId}/{parentCommentId}")
    public ResponseEntity<?> selectByFeedAndParentComment(@PathVariable(name = "feedId") Long feedId
            , @PathVariable(name = "parentCommentId") Long parentCommetId){
        List<CommentResponseDto> commentResponseDtoList = commentService.selectCommentByFeedIdAndParentCommentId(feedId, parentCommetId);
        return ResponseEntity.ok().body(commentResponseDtoList);
    }
}
