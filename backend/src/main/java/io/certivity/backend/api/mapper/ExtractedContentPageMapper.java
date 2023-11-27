package io.certivity.backend.api.mapper;

import io.certivity.backend.api.dto.ExtractedContentDto;
import io.certivity.backend.api.dto.PageResponse;
import io.certivity.backend.api.model.ExtractedContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ExtractedContentPageMapper implements Function<Page<ExtractedContent>, PageResponse<ExtractedContentDto>> {
    private final ExtractedContentMapper extractedContentMapper;

    @Autowired
    public ExtractedContentPageMapper(ExtractedContentMapper extractedContentMapper) {
        this.extractedContentMapper = extractedContentMapper;
    }

    @Override
    public PageResponse<ExtractedContentDto> apply(Page<ExtractedContent> extractedContents) {
        return new PageResponse<>(
                extractedContents.getContent().stream().map(extractedContentMapper).toList(),
                extractedContents.getNumber(),
                extractedContents.getSize(),
                extractedContents.getTotalElements(),
                extractedContents.getTotalPages(),
                extractedContents.isLast()
        );
    }
}
