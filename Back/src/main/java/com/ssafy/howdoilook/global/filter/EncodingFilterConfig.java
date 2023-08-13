package com.ssafy.howdoilook.global.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;

/*
* HTTP, HTTPS 모두 UTF-8로 인코딩 설정
* */

@Configuration
public class EncodingFilterConfig {

    @Bean
    public FilterRegistrationBean<CharacterEncodingFilter> utf8encodingFilter() {
        FilterRegistrationBean<CharacterEncodingFilter> registrationBean = new FilterRegistrationBean<>();

        CharacterEncodingFilter filter = new CharacterEncodingFilter();

        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);

        registrationBean.setFilter(filter);
        registrationBean.addUrlPatterns("/*");

        return registrationBean;
    }
}
