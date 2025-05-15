import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class DemandesMockApi {
    private _demandes: any[] = [
        {
            user_id: 'demo-user-id',
            content: 'Première demande mockée',
            last_changed: new Date().toISOString()
        }
    ];

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {
        this._fuseMockApiService
            .onGet('api/users/:id/demandes')
            .reply(({ request }) => {
                const id = request.params.get('id');
                const userDemandes = this._demandes.filter(d => d.user_id === id);
                return [200, cloneDeep(userDemandes)];
            });

        this._fuseMockApiService
            .onPost('api/users/:id/demandes')
            .reply(({ request }) => {
                const id = request.params.get('id');
                const demande = {
                    user_id: id,
                    content: request.body.content,
                    last_changed: new Date().toISOString()
                };
                this._demandes.push(demande);
                return [200, cloneDeep(demande)];
            });
    }
}
