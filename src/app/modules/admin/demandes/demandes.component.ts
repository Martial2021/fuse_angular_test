import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemandeService, Demande } from './demande.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-demandes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './demandes.component.html'
})
export class DemandesComponent implements OnInit {
    demandes: Demande[] = [];
    content: string = '';
    userId: string | null = null;

    constructor(
        private demandeService: DemandeService,
        private auth: AuthService
    ) {}

    ngOnInit(): void {
        this.auth.user$.subscribe((user) => {
            if (user?.sub) {
                this.userId = user.sub;
                this.loadDemandes();
            }
        });
    }

    loadDemandes(): void {
        if (!this.userId) return;

        this.demandeService.getDemandes(this.userId).subscribe((data) => {
            this.demandes = data;
        });
    }

    submit(): void {
        if (!this.userId || !this.content.trim()) return;

        this.demandeService.createDemande(this.userId, this.content).subscribe(() => {
            this.content = '';
            this.loadDemandes();
        });
    }
}
