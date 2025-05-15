import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Demande {
    user_id: string;
    content: string;
    last_changed: string;
}

@Injectable({ providedIn: 'root' })
export class DemandeService {
    constructor(private http: HttpClient) {}

    getDemandes(userId: string): Observable<Demande[]> {
        return this.http.get<Demande[]>(`api/users/${userId}/demandes`);
    }

    createDemande(userId: string, content: string): Observable<Demande> {
        return this.http.post<Demande>(`api/users/${userId}/demandes`, { content });
    }
}
