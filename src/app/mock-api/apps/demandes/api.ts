import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class DemandesMockApi {
    private _demandes: any[] = [];

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {
        // GET handler
        this._fuseMockApiService
            .onGet('api/users/:id/demandes')
            .reply(({ request }) => {
                const id = request.params.get('id');
                // Return all demandes for any user ID
                const userDemandes = this._demandes.map(d => ({
                    ...d,
                    user_id: id
                }));
                return [200, cloneDeep(userDemandes)];
            });

        // POST handler
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
