// model sert a Facilité de gestion donnés: apem api, 
export class DossierAudit {
    
    idDossierAudit: number;
    nomDossier: string;
    statut: string;
    urlPdf?: string; // ? : peut etre null
    creationDate?: Date;
    documents?: number[]; // Liste des ID des documents associés
    pdfContent?: Uint8Array; // Contenu du PDF en bytes

    constructor() {
        this.idDossierAudit = 0;
        this.nomDossier = '';
        this.statut = 'INCOMPLET'; // Par défaut, un dossier est incomplet
        this.urlPdf = '';
        this.creationDate = new Date();
        this.documents = [];
        this.pdfContent = new Uint8Array();
    }
}