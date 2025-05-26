import { Component, OnDestroy, OnInit } from '@angular/core';

import { DossierAudit } from '../../models/dossier-audit/dossier-audit';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DossierAuditService } from '../../services/dossier-audit/dossier-audit.service';

@Component({
  selector: 'app-dossier-audit',
  templateUrl: './dossier-audit.component.html',
  styleUrls: ['./dossier-audit.component.css'],
})
export class DossierAuditComponent implements OnInit, OnDestroy {

  public dossiers: DossierAudit[] = [];
  private subscriptions: Subscription[] = [];
  public selectedDossier: DossierAudit | null = null;
  public showAddForm: boolean = false;

  constructor(private dossierAuditService: DossierAuditService) {}

  ngOnInit(): void {
    this.getDossiers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
// methode pour récupérer tous les dossiers d'audit
  public getDossiers(): void {
    this.subscriptions.push(
      this.dossierAuditService.getAllDossiers().subscribe({
        next: (response: DossierAudit[]) => {
          this.dossiers = response;
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération des dossiers d\'audit', errorResponse);
        }
      })
    );
  }

  public selectDossier(dossier: DossierAudit): void {
    this.selectedDossier = dossier;
  }

  public deleteDossier(dossierId?: number): void {
    if (!dossierId) return;
    if (confirm('Voulez-vous vraiment supprimer ce dossier d\'audit ?')) {
      this.subscriptions.push(
        this.dossierAuditService.deleteDossier(dossierId).subscribe(() => {
          this.getDossiers();
        })
      );
    }
  }

  public onGenerateDossier(documentIds: number[]): void {
    this.subscriptions.push(
      this.dossierAuditService.generateDossier(documentIds).subscribe({
        next: (response: DossierAudit) => {
          alert('Dossier généré avec succès !');
          this.getDossiers();
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.error('Erreur lors de la génération du dossier', errorResponse);
        }
      })
    );
  }

  public downloadDossier(dossierId: number): void {
    this.subscriptions.push(
      this.dossierAuditService.downloadDossierPdf(dossierId).subscribe({
        next: (response: HttpResponse<Blob>) => {
          if (response.body) {
            const url = window.URL.createObjectURL(response.body);
            const a = document.createElement('a');
            a.href = url;
            a.download = `DossierAudit_${dossierId}.pdf`;
            a.click();
          } else {
            console.error('Le fichier PDF est vide ou non disponible.');
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.error('Erreur lors du téléchargement du dossier', errorResponse);
        }
      })
    );
  }
}