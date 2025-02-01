import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  onPdfClick(event: MouseEvent): void {
    const canvas = event.target as HTMLElement;
    const rect = canvas.getBoundingClientRect();

    // Clicked coordinates relative to the canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Canvas width and height
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    // Actual PDF page dimensions (original width and height)
    const pdfPageWidth = 841.92; // Example width in points (A4 width)
    const pdfPageHeight = 594.96; // Example height in points (A4 height)

    // Calculate scale factors
    const scaleX = pdfPageWidth / canvasWidth;
    const scaleY = pdfPageHeight / canvasHeight;

    // Normalize coordinates
    const normalizedX = x * scaleX;
    const normalizedY = (canvasHeight - y) * scaleY; // Flipping Y to account for top-left origin

    console.log(
      `Normalized coordinates: x = ${normalizedX}, y = ${normalizedY}`
    );
  }
}
