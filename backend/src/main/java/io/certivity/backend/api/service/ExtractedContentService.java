package io.certivity.backend.api.service;

import io.certivity.backend.api.dto.ExtractedContentDto;
import io.certivity.backend.api.dto.PageResponse;
import io.certivity.backend.api.mapper.ExtractedContentMapper;
import io.certivity.backend.api.mapper.ExtractedContentPageMapper;
import io.certivity.backend.api.model.ExtractedContent;
import io.certivity.backend.api.repository.ExtractedContentRepository;
import jakarta.annotation.PostConstruct;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class ExtractedContentService {
    private final ExtractedContentRepository contentRepository;
    private final ExtractedContentMapper contentMapper;
    private final ExtractedContentPageMapper contentPageMapper;

    @Autowired
    public ExtractedContentService(ExtractedContentRepository contentRepository, ExtractedContentMapper contentMapper, ExtractedContentPageMapper contentPageMapper) {
        this.contentRepository = contentRepository;
        this.contentMapper = contentMapper;
        this.contentPageMapper = contentPageMapper;
    }

    public List<ExtractedContentDto> getSortedContent() {
        return contentRepository.findAll().stream().map(contentMapper).toList();
    }

    public PageResponse<ExtractedContentDto> getSortedContent(Pageable pageable) {
        return contentPageMapper.apply(contentRepository.findAll(pageable));
    }

    public PageResponse<ExtractedContentDto> getSortedContentBySearch(Pageable pageable, String search) {
        return contentPageMapper.apply(contentRepository.findByTextContainingIgnoreCase(search, pageable));
    }

    public ExtractedContentDto addComment(String contentId, String commentText) {
        ExtractedContent content = contentRepository.findById(contentId).orElseThrow();

        content.addComment(commentText);

        contentRepository.save(content);

        return contentMapper.apply(content);
    }

    public void removeComment(String contentId, String commentId) {
        ExtractedContent content = contentRepository.findById(contentId).orElseThrow();

        content.removeComment(commentId);

        contentRepository.save(content);
    }

    public ExtractedContentDto updateComment(String contentId, String commentId, String newCommentText) {
        ExtractedContent content = contentRepository.findById(contentId).orElseThrow();

        content.updateComment(commentId, newCommentText);

        contentRepository.save(content);

        return contentMapper.apply(content);
    }

    @PostConstruct
    public void extractContent() throws Exception {
        try {
            String url = "https://en.wikipedia.org/wiki/A_Tale_of_Two_Cities";
            Document document = Jsoup.connect(url).get();

            Elements paragraphs = document.select("p, h1, h2, h3, h4, h5, h6, ol, ul");

            int sort = 0;

            for (Element paragraph : paragraphs) {
                String text = paragraph.text();
                String html = paragraph.outerHtml();

                ExtractedContent extractedContent = new ExtractedContent(
                        text,
                        html,
                        text.length(),
                        sort++,
                        url,
                        new Date(),
                        new Date()
                );
//                extractedContent.setText(text);
//                extractedContent.setHtml(html);
//                extractedContent.setLength(text.length());
//                extractedContent.setSort(sort++);
//                extractedContent.setUrl(url);
//                extractedContent.setCreatedAt(new Date());
//                extractedContent.setLastModified(new Date());

                contentRepository.save(extractedContent);
            }
        } catch (IOException e) {
            e.printStackTrace();

            throw new Exception("Error extracting content");
        }
    }

    public ExtractedContentDto getContentById(String id) {
        ExtractedContent content = contentRepository.findById(id).orElseThrow();

        return contentMapper.apply(content);
    }
}
