package com.ssafy.howdoilook.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
                .apiInfo(
                        new ApiInfoBuilder()
                                .title("HowDoILook? API 문서")
                                .description("Swagger3.0을 활용한 API 문서")
                                .version("1.0.0")
                                .build()
                )
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.howdoilook"))
                .paths(PathSelectors.any())
                .build();
    }
}
