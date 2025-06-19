import { UserRole } from "../enum/enum";

export class User {
    public userId: number; // id de l'utilisateur
    public firstname: string;
    public lastname: string;
    public email: string;
    public password: string;
    public role: UserRole = UserRole.FORMATEUR; // Role de l'utilisateur
    public profileImageURL: string;
    public lastLoginDate: Date;
    public joinDate: Date;
    public authorities: string[];  // tableau de string, Authorities = permissions(read,edit,delete)
    public active: boolean;  // Pour activer les rôles
    public formationId?: number;

    constructor() {
        this.userId = 0;
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.password = '';
        this.role = UserRole.FORMATEUR;
        this.profileImageURL = '';
        this.lastLoginDate = new Date();
        this.joinDate = new Date();
        this.authorities = [];
        this.active = false;
        this.formationId = undefined;
    }
}