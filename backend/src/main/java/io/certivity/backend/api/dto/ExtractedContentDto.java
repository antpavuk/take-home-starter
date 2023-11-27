package io.certivity.backend.api.dto;

import io.certivity.backend.api.model.AuditLog;
import io.certivity.backend.api.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExtractedContentDto {
    private String id;
    private String text;
    private String html;
    private int length;
    private String url;
    private List<Comment> comments;
    private List<AuditLog> auditLogs;
}
