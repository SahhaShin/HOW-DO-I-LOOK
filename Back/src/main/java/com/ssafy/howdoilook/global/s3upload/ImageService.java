package com.ssafy.howdoilook.global.s3upload;

import com.amazonaws.AmazonClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
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

import java.io.*;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.commons.exec.CommandLine;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ImageService {

    private String S3Bucket = "howdobucket"; // Bucket 이름

    @Value("${python.file.path}")
    private String pythonPath;

    @Value("${remove.bg.apiKey}")
    private String apiKey;

    @Autowired
    AmazonS3Client amazonS3Client;

    public String saveImage(MultipartFile multipartFile) throws IOException {

        if (multipartFile.isEmpty()) {
            throw new IllegalArgumentException("사진이 없으면 사진을 저장할 수 없습니다.");
        }

        String fileName = generateFileName(multipartFile);
        byte[] imageBytes = multipartFile.getBytes();

        // S3에 업로드
        String imagePath = uploadToS3(fileName, imageBytes, multipartFile.getContentType());

        return imagePath;
    }

    /**
     * remove.bg API 를 이용한 이미지 배경 제거 후 s3 저장
     */
    public String saveImageAndRemoveBg(MultipartFile multipartFile) throws IOException {

        if (multipartFile.isEmpty()) {
            throw new IllegalArgumentException("사진이 없으면 사진을 저장할 수 없습니다.");
        }

        // 이미지 배경 제거
        byte[] resultImageBytes = removeImageBackground(multipartFile);

        // S3에 업로드
        String fileName = generateFileName(multipartFile);
        String imagePath = uploadToS3(fileName, resultImageBytes, multipartFile.getContentType());

        return imagePath;
    }

    /**
     * 이미지 배경 제거 메서드
     */
    private byte[] removeImageBackground(MultipartFile multipartFile) throws IOException {

        String removeBgUrl = "https://api.remove.bg/v1.0/removebg"; // remove.bg API url
        String originalName = multipartFile.getOriginalFilename();

        // remove.bg API 요청에 필요한 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("X-Api-Key", apiKey);

        // remove.bg API 요청에 필요한 파라미터 설정
        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("image_file", new ByteArrayResource(multipartFile.getBytes()) {
            @Override
            public String getFilename() {
                return originalName;
            }
        });

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // remove.bg API 호출
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> response = restTemplate.postForEntity(removeBgUrl, requestEntity, byte[].class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            throw new RuntimeException("remove.bg API 호출이 실패했습니다.");
        }
    }

    /**
     * S3 업로드 메서드
     */
    private String uploadToS3(String fileName, byte[] imageBytes, String contentType) {
        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(contentType);
        objectMetaData.setContentLength(imageBytes.length);

        try {
            // S3에 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(S3Bucket, fileName, new ByteArrayInputStream(imageBytes), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );

            String imagePath = amazonS3Client.getUrl(S3Bucket, fileName).toString(); // 접근 가능한 URL 가져오기

            if (imagePath == null) {
                throw new IllegalArgumentException("이미지 경로를 가져오지 못하였습니다.");
            }

            return imagePath;
        } catch (AmazonClientException e) {
            throw new RuntimeException("S3에 이미지를 업로드하는데 실패했습니다.", e);
        }
    }

    /**
     * 파일 이름 생성 메서드
     */
    private String generateFileName(MultipartFile multipartFile) {
        String originalName = multipartFile.getOriginalFilename();
        String formatDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("-yyyyMMdd-HHmmss"));
        return originalName + formatDate;
    }

    public String updateImage(String imageUrl, MultipartFile multipartFile) throws IOException {
        deleteImage(imageUrl);

        return saveImage(multipartFile);
    }

    public void deleteImage(String imageUrl) {
        // 이미지가 존재하면 버킷에서 해당 이미지를 삭제
        String existFile = extractFileNameFromUrl(imageUrl);

        try {
            String decodedFileName = URLDecoder.decode(existFile, "UTF-8");
            amazonS3Client.deleteObject(S3Bucket, decodedFileName);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    // URL에서 파일 이름 추출
    private String extractFileNameFromUrl(String imageUrl) {
        // URL의 마지막 슬래시 이후의 문자열
        return imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    }

    /**
     * 파이썬을 이용한 rembg(오픈소스 라이브러리)
     */
//    public String saveImageAndRemoveBg(MultipartFile multipartFile) throws IOException {
//
//        if(multipartFile.isEmpty()) {
//            throw new IllegalArgumentException("사진이 없으면 사진을 저장할 수 없습니다.");
//        }
//
//        String originalName = multipartFile.getOriginalFilename(); // 파일 이름
//
//        // 파일명 중복을 피하기위해 날짜 추가
//        String formatDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("-yyyyMMdd-HHmmss"));
//        String fileName = originalName + formatDate;
//
//        long size = multipartFile.getSize(); // 파일 크기
//
//        ObjectMetadata objectMetaData = new ObjectMetadata();
//        objectMetaData.setContentType(multipartFile.getContentType());
//        objectMetaData.setContentLength(size);
//
//        try {
//            // S3에 업로드
//            amazonS3Client.putObject(
//                    new PutObjectRequest(S3Bucket, fileName, multipartFile.getInputStream(), objectMetaData)
//                            .withCannedAcl(CannedAccessControlList.PublicRead)
//            );
//        } catch (AmazonClientException e) {
//            throw new RuntimeException("S3에 이미지를 업로드하는데 실패했습니다.", e);
//        }
//
//        String imagePath = amazonS3Client.getUrl(S3Bucket, fileName).toString(); // 접근가능한 URL 가져오기
//
//        if(imagePath == null) {
//            throw new IllegalArgumentException("이미지 경로를 가져오지 못하였습니다.");
//        }
//
//        // 배경제거를 완료하면
//        String processedImagePath = processImageAndReturnPath(imagePath);
//        // 배경되기전 url은 삭제한다.
//        deleteImage(imagePath);
//
//        return processedImagePath;
//    }

    public String processImageAndReturnPath(String imagePath) throws IOException {

        String[] command = new String[4];
        command[0] = "python";
        command[1] = pythonPath;
        command[2] = imagePath;

        String result = execPython(command);

        // 이미지 파일 이름 추출
        String imageName = extractFileNameFromUrl(imagePath);

        // 이미지의 로컬 경로와 이름을 만듭니다.
        String localImagePath = result.trim(); // 결과에서 불필요한 공백 제거
        File imageFile = new File(localImagePath);

        if (!imageFile.exists()) {
            throw new FileNotFoundException("이미지 파일이 존재하지 않습니다.");
        }

        // S3에 업로드할 파일 이름
        String s3FileName = "processed_" + imageName;

        // 이미지 파일 업로드
        String processedImagePath = saveProcessedImageToS3(imageFile, s3FileName);

        // 업로드가 완료되었다면 임시 파일을 삭제
        deleteTemporaryFile(localImagePath);

        return processedImagePath;
    }

    private void deleteTemporaryFile(String filePath) {
        File tempFile = new File(filePath);
        if (tempFile.exists()) {
            if (tempFile.delete()) {
                System.out.println("임시 파일 삭제 성공: " + filePath);
            } else {
                System.out.println("임시 파일 삭제 실패: " + filePath);
            }
        } else {
            System.out.println("임시 파일이 이미 삭제되었거나 존재하지 않음: " + filePath);
        }
    }

    public String execPython(String[] command) throws IOException {
        CommandLine commandLine = CommandLine.parse(command[0]);
        for(int i = 1, n = command.length; i < n; i++) {
            commandLine.addArgument(command[i]);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PumpStreamHandler pumpStreamHandler = new PumpStreamHandler(outputStream);
        DefaultExecutor executor = new DefaultExecutor();
        executor.setStreamHandler(pumpStreamHandler);
        executor.execute(commandLine);

        return outputStream.toString();
    }

    public String saveProcessedImageToS3(File imageFile, String s3FileName) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(imageFile);
        byte[] imageData = fileInputStream.readAllBytes();
        fileInputStream.close();

        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType("image/png"); // 이미지 타입에 맞게 변경
        objectMetaData.setContentLength(imageData.length);

        try {
            // S3에 이미지 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(S3Bucket, s3FileName, new ByteArrayInputStream(imageData), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (AmazonClientException e) {
            throw new RuntimeException("S3에 이미지를 업로드하는데 실패했습니다.", e);
        }

        String processedImagePath = amazonS3Client.getUrl(S3Bucket, s3FileName).toString();
        if (processedImagePath == null) {
            throw new IllegalArgumentException("이미지 경로를 가져오지 못하였습니다.");
        }

        return processedImagePath;
    }
}
