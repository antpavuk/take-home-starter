package io.certivity.backend.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuditLog {
    private Date timestamp;
    private ActionType actionType;
    private String newValue;
    private String oldValue;
    private String commentId;

    public AuditLog(ActionType actionType, String newValue, String oldValue,
                    String commentId) {
        this.timestamp = new Date();
        this.actionType = actionType;
        this.newValue = newValue;
        this.oldValue = oldValue;
        this.commentId = commentId;
    }
}
