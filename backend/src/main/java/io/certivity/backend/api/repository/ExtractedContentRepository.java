package io.certivity.backend.api.repository;

import io.certivity.backend.api.model.ExtractedContent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ExtractedContentRepository extends MongoRepository<ExtractedContent, String> {
    @Query("{'text': {$regex: ?0, $options: 'i'}}")
    Page<ExtractedContent> findByTextContainingIgnoreCase(String search, Pageable pageable);
}

