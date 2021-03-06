import { Observable } from 'rxjs';

export class ImageUtil {

  static resizeImage(file: File, maxSize: number): Observable<File> {
    const reader = new FileReader();
    const image = new Image();
    const canvas = document.createElement('canvas');
    const dataURItoBlob = (dataURI: string) => {
      const bytes =
        dataURI.split(',')[0].indexOf('base64') >= 0
          ? atob(dataURI.split(',')[1])
          : unescape(dataURI.split(',')[1]);
      const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const max = bytes.length;
      const ia = new Uint8Array(max);
      for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
      return new Blob([ia], { type: mime });
    };
    const resize = () => {
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(image, 0, 0, width, height);
      let dataUrl = canvas.toDataURL('image/jpeg');
      let blob: Blob = dataURItoBlob(dataUrl);
      let newFile = new File([blob], file.name, { type: file.type });
      return newFile;
    };

    return new Observable((observer) => {
      reader.onload = (readerEvent: any) => {
        if (!file.type.match(/image.*/)) {
          observer.error('Archivo no es una imagen');
        }
        image.onload = () => {
          observer.next(resize());
          observer.complete();
        };
        image.src = readerEvent.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}
