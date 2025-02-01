package com.safewebguard.doctools.digitalsignature.controller;

import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.safewebguard.doctools.common.vo.DigitalSignatureRequestVO;
import com.safewebguard.doctools.digitalsignature.service.DigitalSignatureService;

@CrossOrigin(origins = {"http://localhost:4200","https://www.safewebguard.in/","https://safewebguard.in/", "https://docify.safewebguard.in"})
@RestController
@RequestMapping("/api/doctools/digitalsign/")
public class DigitalSignatureController {
	private static final Logger logger = LoggerFactory.getLogger(DigitalSignatureController.class);

	@Autowired
	DigitalSignatureService digitalSignatureService;

	@PostMapping("/sign-pdf")
	public ResponseEntity<byte[]> signPdf(@RequestPart("file") MultipartFile file,
            @RequestPart("cert") MultipartFile cert,
            @RequestPart("signDtls") String signDtls) {
		logger.error("Received file: " + file.getOriginalFilename());
	    //System.out.println("Received cert: " + cert.getOriginalFilename());
	    //System.out.println("Received sign details: " + signDtls);
	    ObjectMapper objectMapper = new ObjectMapper();
		byte[] signedFile = null;
		try {
			// Load the PFX file
			InputStream certInputStream = cert.getInputStream();

			// Load the PDF file
			InputStream fileInputStream = file.getInputStream();
			
			DigitalSignatureRequestVO signDtlsObj = objectMapper.readValue(signDtls, DigitalSignatureRequestVO.class);

			signedFile = digitalSignatureService.signPdf(fileInputStream, certInputStream, signDtlsObj);

			// Return the signed PDF as an attachment
			String singedFilename = "signed-" + file.getOriginalFilename();

			return ResponseEntity.ok()
			        .header("Content-Disposition", "attachment; filename=\"" + singedFilename + "\"")
			        .body(signedFile);
		} catch (Exception e) {
			//e.printStackTrace();
			logger.error("Exception in signPdf: ", e);
			return ResponseEntity.status(500).build();
		}
	}
	
	@PostMapping("/getFileDimension")
	public String getFileDimension(@RequestPart("file") MultipartFile file) {
		String res = null;
		try {
			InputStream fileInputStream = file.getInputStream();
			res = digitalSignatureService.getFileDimension(fileInputStream);
		} catch (Exception e) {
			logger.error("Exception in getFileDimension: ", e);
		}
		return res;
	}

}
