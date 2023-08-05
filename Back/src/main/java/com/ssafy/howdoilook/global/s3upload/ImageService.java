package com.ssafy.howdoilook.global.s3upload;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.opencv.core.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ImageService {

    private String S3Bucket = "howdobucket"; // Bucket 이름

    @Autowired
    AmazonS3Client amazonS3Client;

    public String saveImage(MultipartFile multipartFile) throws IOException {

        if(multipartFile.isEmpty()) {
            throw new IllegalArgumentException("사진이 없으면 사진을 저장할 수 없습니다.");
        }

        String originalName = multipartFile.getOriginalFilename(); // 파일 이름

        // 파일명 중복을 피하기위해 날짜 추가
        String formatDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("-yyyyMMdd-HHmmss"));
        String fileName = originalName + formatDate;

        long size = multipartFile.getSize(); // 파일 크기

        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(multipartFile.getContentType());
        objectMetaData.setContentLength(size);

        try {
            // S3에 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(S3Bucket, fileName, multipartFile.getInputStream(), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (AmazonClientException e) {
            throw new RuntimeException("S3에 이미지를 업로드하는데 실패했습니다.", e);
        }

        String imagePath = amazonS3Client.getUrl(S3Bucket, fileName).toString(); // 접근가능한 URL 가져오기

        if(imagePath == null) {
            throw new IllegalArgumentException("이미지 경로를 가져오지 못하였습니다.");
        }

        return imagePath;
    }

    public String updateImage(String imageUrl, MultipartFile multipartFile) throws IOException {
        deleteImage(imageUrl);

        return saveImage(multipartFile);
    }

    // URL에서 파일 이름 추출
    private String extractFileNameFromUrl(String imageUrl) {
        // URL의 마지막 슬래시 이후의 문자열
        return imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    }

    public void deleteImage(String imageUrl) {
        // 이미지가 존재하면 버킷에서 해당 이미지를 삭제
        String existFile = extractFileNameFromUrl(imageUrl);
        System.out.println(existFile);
        amazonS3Client.deleteObject(S3Bucket, existFile);
    }

    /**
     * OpenCV 를 이용한 이미지 배경 제거
     */
//    private byte[] matToByteArray(Mat image) throws IOException {
//        MatOfByte matOfByte = new MatOfByte();
//        Imgcodecs.imencode(".jpg", image, matOfByte);
//        return matOfByte.toArray();
//    }
//
//    public String saveImage(MultipartFile imageFile) {
//        try {
////            System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
//            // 이미지 파일을 Mat 객체로 읽어옴
//            Mat image = Imgcodecs.imdecode(new MatOfByte(imageFile.getBytes()), Imgcodecs.IMREAD_UNCHANGED);
//
//            // GrabCut을 위해 배경/전경 정보가 들어있는 Rect 생성
//            Rect rectangle = new Rect(1, 1, image.cols() - 1, image.rows() - 1);
//
//            // 마스크 생성
//            Mat mask = new Mat();
//            Mat bgdModel = new Mat();
//            Mat fgdModel = new Mat();
//
//            // GrabCut 알고리즘 수행
//            Imgproc.grabCut(image, mask, rectangle, bgdModel, fgdModel, 5, Imgproc.GC_INIT_WITH_RECT);
//
//            // 마스크 설정
//            Core.compare(mask, new Scalar(Imgproc.GC_PR_FGD), mask, Core.CMP_EQ);
//            Mat foreground = new Mat(image.size(), CvType.CV_8UC3, new Scalar(255, 255, 255));
//            image.copyTo(foreground, mask);
//
//            // Mat 객체를 이미지 파일로 변환하여 S3에 저장
//            byte[] imageBytes = matToByteArray(foreground);
//
//            // S3에 저장
//            String imagePath = saveImageToS3(imageFile.getOriginalFilename(), imageBytes);
//
//            return imagePath;
//
//        } catch (Exception e) {
//            // 예외 처리
//            return null;
//        }
//    }
//
//    private String saveImageToS3(String originalName, byte[] data) throws IOException {
//        if (data == null || data.length == 0) {
//            throw new IllegalArgumentException("이미지 데이터가 유효하지 않습니다.");
//        }
//
//        // 파일명 중복을 피하기 위해 날짜 추가
//        String formatDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("-yyyyMMdd-HHmmss"));
//        String fileName = originalName + formatDate + ".jpg"; // 확장자는 적절히 변경
//
//        long size = data.length; // 파일 크기
//
//        ObjectMetadata objectMetaData = new ObjectMetadata();
//        objectMetaData.setContentType("image/jpeg"); // 이미지 확장자에 맞게 변경
//        objectMetaData.setContentLength(size);
//
//        try (InputStream inputStream = new ByteArrayInputStream(data)) {
//            // S3에 업로드
//            amazonS3Client.putObject( new PutObjectRequest(S3Bucket, fileName, new ByteArrayInputStream(data), objectMetaData)
//                    .withCannedAcl(CannedAccessControlList.PublicRead));
//
//            return amazonS3Client.getUrl(S3Bucket, fileName).toExternalForm(); // 이미지 접근 URL 리턴
//
//        } catch (AmazonClientException e) {
//            throw new RuntimeException("S3에 이미지를 업로드하는데 실패했습니다.", e);
//        }
//    }
}
