import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowDatasService } from '../../common/services/row-datas.service';

@Component({
  selector: 'app-digitalsignature',
  templateUrl: './digitalsignature.component.html',
  styleUrls: ['./digitalsignature.component.scss'],
})
export class DigitalsignatureComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  pdfSrc: string | Uint8Array | undefined = undefined;
  isDrawing = false;
  startX = 0;
  startY = 0;
  pdfPageWidth!: number;
  pdfPageHeight!: number;
  noOfPages!: number;
  file: File | null = null;
  cert: File | null = null;
  finalStartX!: number;
  finalStartY!: number;
  finalWidth!: number;
  finalHeight!: number;

  coordinatesForm!: FormGroup;

  constructor(private fb: FormBuilder, private rowData: RowDatasService) {}
  ngOnInit(): void {
    // Initialize the FormGroup in `ngOnInit` or any lifecycle method
    this.coordinatesForm = this.fb.group({
      password: ['', Validators.required],
      x: ['', Validators.required],
      y: ['', Validators.required],
      height: ['', Validators.required],
      width: ['', Validators.required],
      pageNo: [1, Validators.required],
    });
  }

  signPdf() {
    //console.log(this.coordinatesForm.value);
    if (this.coordinatesForm.valid && this.file && this.cert) {
      /*const formData = {
        x: this.coordinatesForm.value.x,
        y: this.coordinatesForm.value.y,
        height: this.coordinatesForm.value.height,
        width: this.coordinatesForm.value.width,
        pageNo: this.coordinatesForm.value.pageNo,
        file: Array.from(this.coordinatesForm.value.file), // Convert Uint8Array to a regular array
      };*/
      const signData = {
        password: this.coordinatesForm.value.password,
        signatureX: this.coordinatesForm.value.x,
        signatureY: this.coordinatesForm.value.y,
        signatureWidth: this.coordinatesForm.value.width,
        signatureHeight: this.coordinatesForm.value.height,
        pageNo: this.coordinatesForm.value.pageNo,
      };
      const signDtls = JSON.stringify(signData);
      const signFormData = new FormData();
      signFormData.append('signDtls', signDtls);
      signFormData.append('cert', this.cert);
      signFormData.append('file', this.file);
      console.log(signFormData);
      this.rowData
        .callApiwithJsonWithoutCookiesFormDataForDoctoolsFileRes(
          '/api/doctools/digitalsign/sign-pdf',
          signFormData
        )
        .subscribe(
          (response) => {
            const contentDisposition = response.headers.get(
              'Content-Disposition'
            );
            let filename = 'signed-document.pdf'; // Default filename

            // Extract the filename from the Content-Disposition header if available
            if (
              contentDisposition &&
              contentDisposition.indexOf('filename=') !== -1
            ) {
              const match = contentDisposition.match(/filename="(.+)"/);
              if (match && match[1]) {
                filename = match[1]; // Extract the filename
              }
            }

            // Create a blob from the byte array response
            const blob = new Blob([response], { type: 'application/pdf' });

            // Create a download link and set the URL to the blob
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename; // Set the desired file name
            document.body.appendChild(a);
            a.click(); // Trigger the download
            document.body.removeChild(a); // Clean up
            window.URL.revokeObjectURL(url); // Release the URL object
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  }

  onCertSelected(event: Event): void {
    this.cert = (event.target as HTMLInputElement).files?.[0] || null;
  }

  // Trigger file input click
  onFileUploadClick(): void {
    this.fileInput.nativeElement.click();
  }

  // Handle file selection and convert to Uint8Array
  onFileSelected(event: Event): void {
    this.file = (event.target as HTMLInputElement).files?.[0] || null;

    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result instanceof ArrayBuffer) {
          this.pdfSrc = new Uint8Array(e.target.result);
        }
      };
      reader.readAsArrayBuffer(this.file);

      const formData = new FormData();
      formData.append('file', this.file);
      this.rowData
        .callApiwithJsonWithoutCookiesFormDataForDoctools(
          '/api/doctools/digitalsign/getFileDimension',
          formData
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.pdfPageHeight = response.pageHeight;
            this.pdfPageWidth = response.pageWidth;
            this.noOfPages = response.noOfPages;

            const pageNoControl = this.coordinatesForm.get('pageNo');
            if (pageNoControl) {
              pageNoControl.setValidators([
                Validators.required,
                Validators.max(this.noOfPages), // Dynamic max validator
              ]);
              pageNoControl.updateValueAndValidity(); // Ensure the form control is validated with the new validator
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  }

  // Handle mouse down to start drawing
  onMouseDown(event: MouseEvent): void {
    if (!this.pdfSrc) return;
    this.isDrawing = true;

    const canvas = event.target as HTMLElement;
    const rect = canvas.getBoundingClientRect();

    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;
    //this.isDrawing = true;
  }

  // Handle mouse up to complete rectangle drawing
  onMouseUp(event: MouseEvent): void {
    if (!this.isDrawing) return;

    const canvas = event.target as HTMLElement;
    const rect = canvas.getBoundingClientRect();

    const endX = event.clientX - rect.left;
    const endY = event.clientY - rect.top;

    const width = Math.abs(endX - this.startX);
    const height = Math.abs(endY - this.startY);

    const scaleX = this.pdfPageWidth / rect.width;
    const scaleY = this.pdfPageHeight / rect.height;

    this.finalStartX = this.startX * scaleX;
    this.finalStartY = (rect.height - this.startY) * scaleY; // Flip Y
    this.finalWidth = width * scaleX;
    this.finalHeight = height * scaleY;

    console.log(
      `Rectangle drawn at x=${this.finalStartX}, y=${this.finalStartY}, width=${this.finalWidth}, height=${this.finalHeight}`
    );

    // Update form controls with the final startX and startY values
    this.coordinatesForm.patchValue({
      x: this.finalStartX,
      y: this.finalStartY,
      height: this.finalHeight,
      width: this.finalWidth,
    });

    // Reset drawing state
    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
  }
}
