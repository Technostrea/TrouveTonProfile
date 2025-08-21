import {Injectable} from '@angular/core';
import PocketBase from "pocketbase";
import {environment} from "@env/environment.development";
import {from} from "rxjs";
import {Sector} from "@app/shared/models/sector";

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  get sectors() {
    const pb = new PocketBase(environment.baseUrl);
    return from(
      pb.collection<Sector>('secteur').getFullList({
        sort: 'nom'
      }))
  }


  getSectorById(id: string) {
    const pb = new PocketBase(environment.baseUrl);
    return from(pb.collection<Sector>('secteur').getOne<Sector>(id))
  }

}
