package com.squadmap.common.auth.application.dto.github;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class GithubEmail {

    private String email;
    private boolean primary;

}
