package com.ssafy.howdoilook.global.s3upload;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ImageService {

    private String S3Bucket = "howdobucket"; // Bucket 이름

    @Autowired
    AmazonS3Client amazonS3Client;

    public List<String> saveImage(MultipartFile multipartFile) throws IOException {
        List<String> imagePathList = new ArrayList<>();

        String originalName = multipartFile.getOriginalFilename(); // 파일 이름

        // 파일명 중복을 피하기위해 날짜 추가
        String formatDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("-yyyyMMdd-HHmmss"));
        String fileName = originalName + formatDate;

        long size = multipartFile.getSize(); // 파일 크기

        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(multipartFile.getContentType());
        objectMetaData.setContentLength(size);

        // S3에 업로드
        amazonS3Client.putObject(
                new PutObjectRequest(S3Bucket, fileName, multipartFile.getInputStream(), objectMetaData)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );

        String imagePath = amazonS3Client.getUrl(S3Bucket, fileName).toString(); // 접근가능한 URL 가져오기
        imagePathList.add(imagePath);

        return imagePathList;
    }

    public List<String> updateImage(String imageUrl, MultipartFile multipartFile) throws IOException {
        // 이미지가 존재하면 버킷에서 해당 이미지를 삭제합니다.
        String existFile = extractFileNameFromUrl(imageUrl);
        System.out.println(existFile);
        amazonS3Client.deleteObject(S3Bucket, existFile);

        return saveImage(multipartFile);
    }

    // URL에서 파일 이름 추출
    private String extractFileNameFromUrl(String imageUrl) {
        // URL의 마지막 슬래시 이후의 문자열
        return imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    }
}
