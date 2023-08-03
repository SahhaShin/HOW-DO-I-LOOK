package com.ssafy.howdoilook.domain.comment.api;

import com.ssafy.howdoilook.domain.comment.dto.request.CommentSaveRequestDto;
import com.ssafy.howdoilook.domain.comment.dto.request.CommentUpdateRequestDto;
import com.ssafy.howdoilook.domain.comment.dto.response.CommentResponseDto;
import com.ssafy.howdoilook.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/")
    public ResponseEntity<Long> saveComment(@RequestBody CommentSaveRequestDto commentSaveRequestDto) {
        Long id = commentService.saveComment(commentSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    @GetMapping("/{feedId}")
    public ResponseEntity<Page<CommentResponseDto>> selectByFeed(@PathVariable(name = "feedId") Long feedId, Pageable page){
        Page<CommentResponseDto> commentResponseDtos = commentService.selectCommentByFeedId(feedId, page);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDtos);
    }
    @GetMapping("/{feedId}/{parentCommentId}")
    public ResponseEntity<Page<CommentResponseDto>> selectByFeedAndParentComment(@PathVariable(name = "feedId") Long feedId
            , @PathVariable(name = "parentCommentId") Long parentCommetId,Pageable page){
        Page<CommentResponseDto> commentResponseDtos = commentService.selectCommentByFeedIdAndParentCommentId(feedId, parentCommetId, page);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponseDtos);
    }
    @PutMapping("/{commentId}")
    public ResponseEntity<Long> updateComment(@PathVariable(name = "commentId") Long commentId, @RequestBody CommentUpdateRequestDto commentUpdateRequestDto){
        Long id = commentService.updateComment(commentId, commentUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable(name = "commentId") Long commentId){
        commentService.deleteComment(commentId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }
}
