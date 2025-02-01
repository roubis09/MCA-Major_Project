package com.safewebguard.doctools.digitalsignature.service;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.cert.Certificate;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfSignatureAppearance;
import com.lowagie.text.pdf.PdfStamper;
import com.safewebguard.doctools.common.vo.DigitalSignatureRequestVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j         // For logger
@Service
public class DigitalSignatureService {
	public byte[] signPdf(InputStream fileInputStream, InputStream certInputStream,
			DigitalSignatureRequestVO signatureDetails) {
		byte[] signedFile = null;
		try {
			KeyStore ks = KeyStore.getInstance("PKCS12");
			ks.load(certInputStream, signatureDetails.getPassword().toCharArray());

			String alias = ks.aliases().nextElement();
			PrivateKey privateKey = (PrivateKey) ks.getKey(alias, signatureDetails.getPassword().toCharArray());
			Certificate[] chain = ks.getCertificateChain(alias);

			PdfReader reader = new PdfReader(fileInputStream);

			// Prepare output stream for the signed PDF
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			PdfStamper stamper = PdfStamper.createSignature(reader, outputStream, '\0');
			PdfSignatureAppearance signatureAppearance = stamper.getSignatureAppearance();

			// Set the signature's position and appearance
			float pageHeight = reader.getPageSize(1).getHeight();
			System.out.println("Page height: "+pageHeight);
			float pageWidth = reader.getPageSize(1).getWidth();
			System.out.println("Page height: "+pageWidth);
			float adjustedY = pageHeight - signatureDetails.getSignatureY();
			/*signatureAppearance
					.setVisibleSignature(
							new Rectangle(signatureDetails.getSignatureX(), signatureDetails.getSignatureY(),
									signatureDetails.getSignatureX() + signatureDetails.getSignatureWidth(),
									signatureDetails.getSignatureY() + signatureDetails.getSignatureHeight()),
							1, "signature");*/
			signatureAppearance
			.setVisibleSignature(
					new Rectangle(signatureDetails.getSignatureX(), signatureDetails.getSignatureY()-signatureDetails.getSignatureHeight(),
							signatureDetails.getSignatureX() + signatureDetails.getSignatureWidth(),
							signatureDetails.getSignatureY()),
					signatureDetails.getPageNo(), "signature");
			/*signatureAppearance
			.setVisibleSignature(
					new Rectangle(signatureDetails.getSignatureX(), adjustedY,
							signatureDetails.getSignatureX() + signatureDetails.getSignatureWidth(),
							adjustedY + signatureDetails.getSignatureHeight()),
					1, "signature");*/
			//signatureAppearance.setCrypto(privateKey, chain, null, PdfSignatureAppearance.SELF_SIGNED);
			signatureAppearance.setCrypto(privateKey, chain, null, PdfSignatureAppearance.WINCER_SIGNED);
			
			// Finalize the PDF
			stamper.close();
			signedFile = outputStream.toByteArray();
			// stamper.close();
			outputStream.flush();
			outputStream.close();
			
			log.info("Digital signature done successfully");
			// System.out.println(signedFile);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return signedFile;
	}
	
	public String getFileDimension(InputStream fileInputStream) {
		JSONObject resJson = new JSONObject();
		try (PdfReader reader = new PdfReader(fileInputStream)) {
			float pageHeight = reader.getPageSize(1).getHeight();
			log.info("Page height: "+pageHeight);
			float pageWidth = reader.getPageSize(1).getWidth();
			log.info("Page height: "+pageWidth);
			int noOfPages = reader.getNumberOfPages();
			resJson.put("pageHeight", pageHeight);
			resJson.put("pageWidth", pageWidth);
			resJson.put("noOfPages", noOfPages);
		} catch(Exception e) {
			log.error("Exception in getFileDimension: ", e);
		}
		return resJson.toString();
	}
}
