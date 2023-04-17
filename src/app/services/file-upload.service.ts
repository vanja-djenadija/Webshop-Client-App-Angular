import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {AngularFireStorage} from '@angular/fire/compat/storage';

import {lastValueFrom, Observable, switchMap} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';
  private downloadURL: string = '';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
  }

  uploadFile(file: File): Observable<string> {
    const filePath = `${this.basePath}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    return uploadTask.snapshotChanges().pipe(
      finalize(async () => {
        this.downloadURL = await lastValueFrom(fileRef.getDownloadURL());
        return this.downloadURL;
      }),
      switchMap(() => fileRef.getDownloadURL())
    );
  }

}
