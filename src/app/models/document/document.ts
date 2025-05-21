export class Document {
    idDocument?: number;
    title: string;
    description?: string;
    category?: string;
    type?: string;
    version?: string;
    storageUrl?: string;
    fileSize?: number;
    fileHash?: string;
    filePath?: string;
    uploadDate?: Date;
    modifiedBy?: string; 
    createdBy?: string;    
  
    constructor() {
      this.idDocument = 0;
      this.title = '';
      this.description = '';
      this.category = '';
      this.type = '';
      this.version = '';
      this.storageUrl = '';
      this.fileSize = 0;
      this.fileHash = '';
      this.filePath = '';
      this.uploadDate = new Date();
      this.modifiedBy = '';
      this.createdBy = '';
    }
  }