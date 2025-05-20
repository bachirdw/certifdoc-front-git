import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document.model';
import { FormsModule } from '@angular/forms';

// Composant principal pour afficher et gérer les documents
@Component({
  selector: 'app-document', // Le nom du composant à utiliser dans le HTML
  templateUrl: './document.component.html', // Le fichier HTML associé
  styleUrls: ['./document.component.css'], // Le fichier CSS associé
  standalone: true, // Permet d'utiliser ce composant sans module Angular classique
  imports: [FormsModule] // <-- Ajoute FormsModule ici
})
export class DocumentComponent implements OnInit {
  showAddForm: boolean = false;

  // Méthode appelée quand on clique sur le bouton "+ New"
  openAddForm() {
    // On affiche le formulaire d'ajout
    this.showAddForm = true;
  }

  // Méthode pour fermer le formulaire d'ajout (à utiliser plus tard)
  closeAddForm() {
    this.showAddForm = false;
  }

  // Tableau qui va contenir la liste des documents récupérés depuis le backend
  documents: Document[] = [];
  // Texte de recherche pour filtrer les documents
  searchText: string = '';

  // On injecte le service DocumentService pour communiquer avec le backend
  constructor(private documentService: DocumentService) {}

  // Méthode appelée automatiquement à l'initialisation du composant
  ngOnInit() {
    this.loadDocuments();
  }

  // Cette méthode récupère tous les documents depuis le backend
  loadDocuments() {
    this.documentService.getAllDocuments().subscribe(docs => this.documents = docs);
  }

  // Méthode pour télécharger un document (à compléter selon ton backend)
  download(doc: Document) {
    // Ici, tu pourrais appeler une méthode du service pour télécharger le fichier
    // Par exemple : this.documentService.downloadDocument(doc.id).subscribe(...)
    alert('Téléchargement du document : ' + doc.title);
  }

  // Méthode pour supprimer un document
  delete(id?: number) {
    if (!id) return;
    // On demande confirmation avant de supprimer
    if (confirm('Voulez-vous vraiment supprimer ce document ?')) {
      this.documentService.deleteDocument(id).subscribe(() => {
        // Après suppression, on recharge la liste
        this.loadDocuments();
      });
    }
  }

  // Ici tu pourras ajouter la logique pour l'ajout et l'upload de documents
}