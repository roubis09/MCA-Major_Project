package com.safewebguard.doctools.common.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DigitalSignatureRequestVO {

    private String password;
    private float signatureX;
    private float signatureY;
    private float signatureWidth;
    private float signatureHeight;
    private int pageNo;
}
