import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemandeService, Demande } from './demande.service';
import { AuthService } from '@auth0/auth0-angular';

// Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-demandes',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule
    ],
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
        console.log('DemandesComponent initialized');
        this.auth.user$.subscribe(
            (user) => {
                console.log('Auth user received:', user);
                if (user?.sub) {
                    this.userId = user.sub;
                    this.loadDemandes();
                }
            },
            (error) => console.error('Auth error:', error)
        );
    }

    loadDemandes(): void {
        console.log('Loading demandes for userId:', this.userId);
        if (!this.userId) {
            console.warn('No userId available, skipping load');
            return;
        }

        this.demandeService.getDemandes(this.userId).subscribe(
            (data) => {
                console.log('Demandes loaded:', data);
                this.demandes = data;
            },
            (error) => console.error('Error loading demandes:', error)
        );
    }

    submit(): void {
        if (!this.userId || !this.content.trim()) return;

        this.demandeService.createDemande(this.userId, this.content).subscribe(() => {
            this.content = '';
            this.loadDemandes();
        });
    }
}

