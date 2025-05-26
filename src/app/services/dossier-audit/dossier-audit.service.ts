import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../settings/app.settings';
import { DossierAudit } from '../../models/dossier-audit/dossier-audit';

/**
 * ✅ Service Angular permettant de communiquer avec le backend.
 * Chaque méthode correspond à un appel API (GET, POST, PUT, DELETE).
 * 
 * 💡 Un service est utile pour centraliser la logique métier et éviter 
 * de répéter le code dans les composants.
 */
@Injectable({ providedIn: 'root' }) 
export class DossierAuditService {

  /** 🌍 Adresse du backend (définie dans AppSettings) */
  private host = AppSettings.APP_URL;

  /** 🔧 Injection du service HttpClient permettant de faire des requêtes API */
  constructor(private http: HttpClient) {}

  /**
   * 📝 Récupérer tous les dossiers d'audit.
   * 🌍 Appelle le backend via une requête GET sur `/api/dossiers-audit`.
   */
  public getAllDossiers(): Observable<DossierAudit[]> {
    return this.http.get<DossierAudit[]>(`${this.host}/api/dossiers-audit`);
  }

  /**
   * 🧐 Récupérer un dossier par son ID.
   * 🔄 L'ID est passé dans l'URL pour identifier le dossier à récupérer.
   */
  public getDossierById(idDossierAudit: number): Observable<DossierAudit> {
    return this.http.get<DossierAudit>(`${this.host}/api/dossiers-audit/${idDossierAudit}`);
  }

  /**
   * ✏️ Mettre à jour un dossier d'audit.
   * 📩 Envoie un objet `DossierAudit` avec les nouvelles valeurs.
   */
  public updateDossier(idDossierAudit: number, updatedDossier: DossierAudit): Observable<DossierAudit> {
    return this.http.put<DossierAudit>(`${this.host}/api/dossiers-audit/${idDossierAudit}`, updatedDossier);
  }

  /**
   * ❌ Supprimer un dossier d'audit.
   * ⚠️ L'ID est nécessaire pour savoir quel dossier supprimer.
   */
  public deleteDossier(idDossierAudit: number): Observable<void> {
    return this.http.delete<void>(`${this.host}/api/dossiers-audit/${idDossierAudit}`);
  }

  /**
   * ✅ Vérifier si les documents sont suffisants pour générer un dossier.
   * 📤 Envoie une liste d'ID de documents et récupère une réponse `true` ou `false`.
   */
  public verifyDocumentCompleteness(documentIds: number[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.host}/api/dossiers-audit/verify-completeness`, { documentIds });
  }

  /**
   * 🛠 Générer un dossier d'audit avec un PDF.
   * 📤 Envoie une liste d'ID de documents pour créer le dossier d'audit.
   */
  public generateDossier(documentIds: number[]): Observable<DossierAudit> {
    return this.http.post<DossierAudit>(`${this.host}/api/dossiers-audit/generate`, { documentIds });
  }

  /**
   * 📥 Télécharger le fichier PDF du dossier d'audit.
   * 📤 Récupère un `Blob` (fichier) et le prépare pour le téléchargement.
   */
  public downloadDossierPdf(idDossierAudit: number): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.host}/api/dossiers-audit/${idDossierAudit}/download`, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}