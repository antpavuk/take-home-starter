package io.certivity.backend.api.controller;

import io.certivity.backend.api.dto.*;
import io.certivity.backend.api.service.ExtractedContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "content")
public class ExtractedContentController {
    private ExtractedContentService contentService;

    @Autowired
    public ExtractedContentController(ExtractedContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public PageResponse<ExtractedContentDto> getSortedContent(Pageable pageable) {
        return contentService.getSortedContent(pageable);
    }

    @GetMapping(path = "search")
    public PageResponse<ExtractedContentDto> getSortedContentBySearch(Pageable pageable, @Param("search") String search) {
        return contentService.getSortedContentBySearch(pageable, search);
    }

    @GetMapping(path = "all")
    public List<ExtractedContentDto> getAllContent() {
        return contentService.getSortedContent();
    }

    @GetMapping(path = "/{id}")
    public ExtractedContentDto getContentById(@PathVariable("id") String id) {
        return contentService.getContentById(id);
    }

    @PutMapping(path = "/{contentId}/addComment")
    public ExtractedContentDto addComment(
            @PathVariable("contentId") String contentId,
            @RequestBody AddCommentDto addCommentDto) {
        return contentService.addComment(
                contentId,
                addCommentDto.getCommentText());
    }

    @PutMapping(path = "/{contentId}/removeComment/{commentId}")
    public ResponseEntity<String>  removeComment(
            @PathVariable("contentId") String contentId,
            @PathVariable("commentId") String commentId) {
        contentService.removeComment(contentId, commentId);

        return ResponseEntity.ok("Comment removed successfully");
    }

    @PutMapping(path = "/{contentId}/updateComment/{commentId}")
    public ExtractedContentDto updateComment(
            @PathVariable("contentId") String contentId,
            @PathVariable("commentId") String commentId,
            @RequestBody UpdateCommentDto updateCommentDto
            ) {
        return contentService.updateComment(
                contentId,
                commentId,
                updateCommentDto.getNewCommentText());
    }
}
