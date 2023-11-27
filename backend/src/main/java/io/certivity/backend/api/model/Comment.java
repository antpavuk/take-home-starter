package io.certivity.backend.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Comment {
    private String id;
    private String text;

    public Comment(String text) {
        this.id = generateId();
        this.text = text;
    }

    private String generateId() {
        return  String.valueOf(UUID.randomUUID());
    }
}
