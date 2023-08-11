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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
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

    public String saveImageAndRemoveBg(MultipartFile multipartFile) throws IOException {

        if(multipartFile.isEmpty()) {
            throw new IllegalArgumentException("사진이 없으면 사진을 저장할 수 없습니다.");
        }

        String originalName = multipartFile.getOriginalFilename(); // 파일 이름

        // 파일명 중복을 피하기위해 날짜 추가
        String formatDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("-yyyyMMdd-HHmmss"));
        String fileName = originalName + formatDate + "-none";

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

        // 배경제거를 완료하면
        String processedImagePath = processImageAndReturnPath(imagePath);
        // 배경되기전 url은 삭제한다.
        deleteImage(imagePath);

        return processedImagePath;
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

    public String processImageAndReturnPath(String imagePath) throws IOException {

        System.out.println("Python Call");
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

        return processedImagePath;
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
