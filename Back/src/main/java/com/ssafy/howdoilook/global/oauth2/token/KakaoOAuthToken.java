package com.ssafy.howdoilook.global.oauth2.token;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoOAuthToken {

    private String access_token;

    private String token_type;

    private String refresh_token;

    private int expires_in;

    private String scope;

    private int refresh_token_expires_in;
}
