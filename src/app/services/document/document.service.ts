import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../settings/app.settings';
import { Document } from '../../models/document/document';

//le design pattern injectable permet d'injecter le service dans les composants
@Injectable({ providedIn: 'root' })
export class DocumentService {
  
    private host = AppSettings.APP_URL;
  
    constructor(private http: HttpClient) {}
  
    //  Récupérer tous les documents
    public getAllDocuments(): Observable<Document[]> {
      return this.http.get<Document[]>(`${this.host}/api/documents`);
    }
  
    //  Récupérer un document par ID
    public getDocumentById(idDocument: number): Observable<Document> {
      return this.http.get<Document>(`${this.host}/api/documents/${idDocument}`);
    }
  
    // Ajouter un nouveau document
    public addDocument(document: Document): Observable<Document> {
      return this.http.post<Document>(`${this.host}/api/documents`, document);
    }
  
    //  Mettre à jour un document
    public updateDocument(idDocument: number, updatedDocument: Document): Observable<Document> {
      return this.http.put<Document>(`${this.host}/api/documents/${idDocument}`, updatedDocument);
    }
  // Supprimer un document par son ID
  public deleteDocument(idDocument: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/api/documents/${idDocument}`);
  }

// Rechercher les documents par catégorie
public getDocumentsByCategorie(idCategorie: number): Observable<Document[]> {
  return this.http.get<Document[]>(`${this.host}/api/documents/categorie/${idCategorie}`);
}

// Rechercher les documents par mot-clé
public getDocumentsByKeyword(idKeyword: number): Observable<Document[]> {
  return this.http.get<Document[]>(`${this.host}/api/documents/keyword/${idKeyword}`);
}

// Téléverser un document
public uploadDocument(file: File): Observable<HttpResponse<string>> {
  const formData: FormData = new FormData();
  formData.append('file', file);

  return this.http.post<string>(
    `${this.host}/api/documents/upload`,
    formData,
    { observe: 'response' }
  );
}
}