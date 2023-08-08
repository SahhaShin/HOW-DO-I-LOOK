package com.ssafy.howdoilook.global.s3upload;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
//import org.opencv.core.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

//import org.opencv.imgcodecs.Imgcodecs;
//import org.opencv.imgproc.Imgproc;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ImageService {

    private String S3Bucket = "howdobucket"; // Bucket 이름
    @Value("${remove.bg.apiKey}")
    private String apiKey;

    // AILabTools API key
    private static final String AILabToolsApiKey = "";

    @Autowired
    AmazonS3Client amazonS3Client;

    public String saveImage2(MultipartFile multipartFile) throws IOException {

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

    /**
     * remove.bg API 를 이용한 이미지 배경 제거
     */
//    public String saveImage(MultipartFile multipartFile) throws IOException {
//        // 이미지 배경 제거를 위해 remove.bg API를 사용하는 부분 추가
//        String apiKey = "${remove.bg.apiKey}";
//        String removeBgUrl = "https://api.remove.bg/v1.0/removebg"; // remove.bg API url
//
//        if (multipartFile.isEmpty()) {
//            throw new IllegalArgumentException("사진이 없으면 사진을 저장할 수 없습니다.");
//        }
//
//        String originalName = multipartFile.getOriginalFilename();
//        String formatDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("-yyyyMMdd-HHmmss"));
//        String fileName = originalName + formatDate;
//
//        long size = multipartFile.getSize();
//
//        // remove.bg API 요청에 필요한 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//        headers.set("X-Api-Key", apiKey);
//
//        // remove.bg API 요청에 필요한 파라미터 설정
//        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
//        requestBody.add("image_file", new ByteArrayResource(multipartFile.getBytes()) {
//            @Override
//            public String getFilename() {
//                return originalName;
//            }
//        });
//
//        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
//
//        // remove.bg API 호출
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<byte[]> response = restTemplate.postForEntity(removeBgUrl, requestEntity, byte[].class);
//
//        if (response.getStatusCode().is2xxSuccessful()) {
//            byte[] resultImageBytes = response.getBody();
//
//            // S3에 업로드 (배경 제거된 이미지)
//            ObjectMetadata objectMetaData = new ObjectMetadata();
//            objectMetaData.setContentType(multipartFile.getContentType());
//            objectMetaData.setContentLength(resultImageBytes.length);
//
//            try {
//                // S3에 업로드
//                amazonS3Client.putObject(
//                        new PutObjectRequest(S3Bucket, fileName, new ByteArrayInputStream(resultImageBytes), objectMetaData)
//                                .withCannedAcl(CannedAccessControlList.PublicRead)
//                );
//            } catch (AmazonClientException e) {
//                throw new RuntimeException("S3에 이미지를 업로드하는데 실패했습니다.", e);
//            }
//
//            String imagePath = amazonS3Client.getUrl(S3Bucket, fileName).toString(); // 접근가능한 URL 가져오기
//
//            if (imagePath == null) {
//                throw new IllegalArgumentException("이미지 경로를 가져오지 못하였습니다.");
//            }
//
//            return imagePath;
//        } else {
//            throw new RuntimeException("remove.bg API 호출이 실패했습니다.");
//        }
//    }

    /**
     * remove.bg API 를 이용한 이미지 배경 제거 후 s3 저장
     * 메서드화 버전
     */
//    public String saveImage2(MultipartFile multipartFile) throws IOException {
//
//        if (multipartFile.isEmpty()) {
//            throw new IllegalArgumentException("사진이 없으면 사진을 저장할 수 없습니다.");
//        }
//
//        // 이미지 배경 제거
//        byte[] resultImageBytes = removeImageBackground(multipartFile);
//
//        // S3에 업로드
//        String fileName = generateFileName(multipartFile);
//        String imagePath = uploadToS3(fileName, resultImageBytes, multipartFile.getContentType());
//
//        return imagePath;
//    }
//
//    /**
//     * 이미지 배경 제거 메서드
//     */
//    private byte[] removeImageBackground(MultipartFile multipartFile) throws IOException {
//
//        String removeBgUrl = "https://api.remove.bg/v1.0/removebg"; // remove.bg API url
//        String originalName = multipartFile.getOriginalFilename();
//
//        // remove.bg API 요청에 필요한 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//        headers.set("X-Api-Key", apiKey);
//
//        // remove.bg API 요청에 필요한 파라미터 설정
//        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
//        requestBody.add("image_file", new ByteArrayResource(multipartFile.getBytes()) {
//            @Override
//            public String getFilename() {
//                return originalName;
//            }
//        });
//
//        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
//
//        // remove.bg API 호출
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<byte[]> response = restTemplate.postForEntity(removeBgUrl, requestEntity, byte[].class);
//
//        if (response.getStatusCode().is2xxSuccessful()) {
//            return response.getBody();
//        } else {
//            throw new RuntimeException("remove.bg API 호출이 실패했습니다.");
//        }
//    }
//
//    /**
//     * S3 업로드 메서드
//     */
//    private String uploadToS3(String fileName, byte[] imageBytes, String contentType) {
//        ObjectMetadata objectMetaData = new ObjectMetadata();
//        objectMetaData.setContentType(contentType);
//        objectMetaData.setContentLength(imageBytes.length);
//
//        try {
//            // S3에 업로드
//            amazonS3Client.putObject(
//                    new PutObjectRequest(S3Bucket, fileName, new ByteArrayInputStream(imageBytes), objectMetaData)
//                            .withCannedAcl(CannedAccessControlList.PublicRead)
//            );
//
//            String imagePath = amazonS3Client.getUrl(S3Bucket, fileName).toString(); // 접근 가능한 URL 가져오기
//
//            if (imagePath == null) {
//                throw new IllegalArgumentException("이미지 경로를 가져오지 못하였습니다.");
//            }
//
//            return imagePath;
//        } catch (AmazonClientException e) {
//            throw new RuntimeException("S3에 이미지를 업로드하는데 실패했습니다.", e);
//        }
//    }
//
//    /**
//     * 파일 이름 생성 메서드
//     */
//    private String generateFileName(MultipartFile multipartFile) {
//        String originalName = multipartFile.getOriginalFilename();
//        String formatDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("-yyyyMMdd-HHmmss"));
//        return originalName + formatDate;
//    }


    /**
     * AILabTools API를 이용하여 이미지 배경 제거 후 S3에 저장하는 메서드
     */
    public String saveImage(MultipartFile multipartFile) throws IOException {

        if (multipartFile.isEmpty()) {
            throw new IllegalArgumentException("사진이 없으면 사진을 저장할 수 없습니다.");
        }

        // 이미지 배경 제거
        byte[] resultImageBytes = removeImageBackground(multipartFile);

        // 파일명 중복을 피하기 위해 날짜 추가
        String originalName = multipartFile.getOriginalFilename();
        String formatDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("-yyyyMMdd-HHmmss"));
        String fileName = originalName + formatDate;

        long size = resultImageBytes.length; // 파일 크기

        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(multipartFile.getContentType());
        objectMetaData.setContentLength(size);

        try {
            // S3에 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(S3Bucket, fileName, new ByteArrayInputStream(resultImageBytes), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (AmazonClientException e) {
            throw new RuntimeException("S3에 이미지를 업로드하는데 실패했습니다.", e);
        }

        String imagePath = amazonS3Client.getUrl(S3Bucket, fileName).toString(); // 접근 가능한 URL 가져오기

        if (imagePath == null) {
            throw new IllegalArgumentException("이미지 경로를 가져오지 못하였습니다.");
        }

        return imagePath;
    }

    /**
     * AILabTools API를 이용하여 이미지 배경 제거 메서드
     */
    private byte[] removeImageBackground(MultipartFile multipartFile) throws IOException {

        String removeBgUrl = "https://www.ailabapi.com/api/cutout/general/furniture-background-removal"; // AILabTools API url

        // AILabTools API 요청에 필요한 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("Authorization", "Bearer " + AILabToolsApiKey);

        // AILabTools API 요청에 필요한 파라미터 설정
        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("image_file", new ByteArrayResource(multipartFile.getBytes()) {
            @Override
            public String getFilename() {
                return multipartFile.getOriginalFilename();
            }
        });

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // AILabTools API 호출
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> response = restTemplate.postForEntity(removeBgUrl, requestEntity, byte[].class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new RuntimeException("AILabTools API 호출이 실패했습니다.");
        }
    }


}
