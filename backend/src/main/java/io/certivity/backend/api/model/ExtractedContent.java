package io.certivity.backend.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "extractedContent")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ExtractedContent {
    @Id
    private String id;

    private String text;
    private String html;
    private int length;
    private int sort;
    private String url;
    private Date createdAt;
    private Date lastModified;

    private List<Comment> comments;
    private List<AuditLog> auditLogs;


    public ExtractedContent(String text, String html, int length, int sort, String url, Date createdAt, Date lastModified) {
        this.text = text;
        this.html = html;
        this.length = length;
        this.sort = sort;
        this.url = url;
        this.createdAt = createdAt;
        this.lastModified = lastModified;
        this.comments = new ArrayList<>();
        this.auditLogs = new ArrayList<>();
    }

    public void addComment(String text) {
        Comment comment = new Comment(text);
        this.comments.add(comment);

        addCommentAudit(ActionType.CREATE, text, null, this, comment.getId());
    }

    public void removeComment(String commentId) {
        this.comments.stream()
                .filter(comment -> comment.getId().equals(commentId))
                .findFirst()
                .ifPresent(comment -> {
                    this.comments.remove(comment);
                    addCommentAudit(ActionType.DELETE, null, comment.getText(), this, commentId);
                });
    }

    public void updateComment(String commentId, String text) {
        this.comments.stream()
                .filter(comment -> comment.getId().equals(commentId))
                .findFirst()
                .ifPresent(comment -> {
                    addCommentAudit(ActionType.UPDATE, text, comment.getText(), this, comment.getId());
                    comment.setText(text);
                });
    }

    private void addCommentAudit(ActionType actionType, String newValue, String oldValue, ExtractedContent extractedContent,
                                 String commentId) {
        AuditLog auditLog = new AuditLog(actionType, newValue, oldValue, commentId);

        if (auditLogs == null) {
            auditLogs = new ArrayList<>();
        }

        auditLogs.add(auditLog);
    }
}
