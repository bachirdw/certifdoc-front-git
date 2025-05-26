
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document/document.service';
import { Document } from '../../models/document/document';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

// Composant principal pour afficher et gérer les documents
@Component({
  selector: 'app-document', // Le nom du composant à utiliser dans le HTML
  templateUrl: './document.component.html', // Le fichier HTML associé
  styleUrl : './document.component.css', // Le fichier CSS associé
})
export class DocumentComponent implements OnInit, OnDestroy {

  public documents: Document[] = [];
  public refreshing: boolean = false; // pour indiquer le chargement de la page
  private subscriptions: Subscription[] = []; //Suivre et nettoyer les abonnements RxJS
  public selectedDocument: Document | null = null;
  public fileName!: string;
  public documentFile!: File; //Le fichier à envoyer à l'API
  public showAddForm: boolean = false;
  public searchText: string = ''; //Texte de recherche pour filtrer les documents

  constructor(private documentService: DocumentService) {}
//  on initialise le composant
  ngOnInit(): void {
    this.getDocuments();
  }
  // On détruit le composant
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // methode pour récupérer tous les documents
  public getDocuments(): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.documentService.getAllDocuments().subscribe({
        next: (response: Document[]) => {
          this.documents = response;
          this.refreshing = false;
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération des documents', errorResponse);
          this.refreshing = false;
        }
      })
    );
  }
//methode pour récupérer un document par ID
  public getDocumentById(idDocument: number): void {    
  }
  public SelectDocument(selectedDocument: Document): void {
    this.selectedDocument = selectedDocument;
    this.clickButton('openDocumentInfo');
  }

// method pour supprimer un document par ID
public DeleteDocument(documentId?: number): void {
  if (!documentId) return; // Vérifie que l'ID existe avant d'appeler le service
  if (confirm('Voulez-vous vraiment supprimer ce document ?')) {
    this.subscriptions.push(
      this.documentService.deleteDocument(documentId).subscribe(() => {
        this.getDocuments();
      })
    );
  }
}

  // methode pour ajouter un document
  public onAddNewDocument(documentForm: NgForm): void {
    // On récupère les valeurs du formulaire qui correspondent aux champs de Document
    const newDocument: Document = documentForm.value;
    this.subscriptions.push(
      this.documentService.addDocument(newDocument).subscribe({
        next: (response: Document) => {
          this.clickButton('new-document-close');
          this.getDocuments();
          this.fileName = '';
          this.documentFile = null as any;
          documentForm.reset();
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout du document', errorResponse);
          this.documentFile = null as any;
        }
      })
    );
  }
// methode est utilisée pour récupérer un fichier
  public onDocumentFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.documentFile = input.files[0];
      this.fileName = this.documentFile.name;
    }
  }
//methode pour téléverser un document
  public uploadDocumentFile(): void {
    if (!this.documentFile) { return; }
    this.subscriptions.push(
      this.documentService.uploadDocument(this.documentFile).subscribe({
        next: (response: HttpResponse<string>) => {
          alert(response.body);
          this.getDocuments();
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.error('Erreur lors du téléversement du document', errorResponse);
        }
      })
    );
  }
  //
  public document: Document = { title: '', version: '', uploadDate: new Date() };

  public openAddForm(): void {
    this.showAddForm = true;
  }

  public closeAddForm(): void {
    this.showAddForm = false;
  }

  public download(document: Document): void {
    // on pourra appeler la méthode de téléchargement fournie par votre DocumentService.
    // Par exemple, si votre backend renvoie le fichier ou une URL de téléchargement, adaptez le code.
    // Pour l'heure, nous affichons une alerte. 
    alert('Téléchargement du document : ' + document.title);
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }
}