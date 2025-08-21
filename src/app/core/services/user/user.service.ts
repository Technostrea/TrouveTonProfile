import {Injectable} from '@angular/core';
import PocketBase from "pocketbase";
import {environment} from "@env/environment";
import {from} from "rxjs";
import {User} from "@app/shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUserById(id: string) {
    const pb = new PocketBase(environment.baseUrl);
    return from(pb.collection('users').getOne<User>(id));
  }

  updateUser(id: string, data: User|any) {
    const pb = new PocketBase(environment.baseUrl);
    return from(pb.collection('users').update<User>(id, data));
  }
}
