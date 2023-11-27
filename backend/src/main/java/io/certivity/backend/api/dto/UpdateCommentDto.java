package io.certivity.backend.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateCommentDto {
    private String contentId;
    private String commentId;
    private String newCommentText;
}
