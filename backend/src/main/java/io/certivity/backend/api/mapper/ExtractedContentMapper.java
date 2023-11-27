package io.certivity.backend.api.mapper;

import io.certivity.backend.api.dto.ExtractedContentDto;
import io.certivity.backend.api.model.ExtractedContent;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ExtractedContentMapper implements Function<ExtractedContent, ExtractedContentDto> {

    @Override
    public ExtractedContentDto apply(ExtractedContent extractedContent) {
        return new ExtractedContentDto(
                extractedContent.getId(),
                extractedContent.getText(),
                extractedContent.getHtml(),
                extractedContent.getLength(),
                extractedContent.getUrl(),
                extractedContent.getComments(),
                extractedContent.getAuditLogs()
        );
    }
}
