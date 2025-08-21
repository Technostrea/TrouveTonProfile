import {Injectable} from '@angular/core';
import PocketBase from "pocketbase";
import {environment} from "@env/environment";
import {Profile} from "@app/shared/models/profile";
import {from} from "rxjs";
import {ProfileDto} from "@app/shared/models/profile-dto";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  createProfile(profileDto: ProfileDto) {
    const pb = new PocketBase(environment.baseUrl);
    return from(
      pb.collection('profiles').create(profileDto)
    );
  }


  get profiles() {
    const pb = new PocketBase(environment.baseUrl);
    return from(
      pb.collection('profiles').getFullList<Profile>({
        sort: 'profession'
      }))
  }

  getProfileByUserId(userId: string) {
    const pb = new PocketBase(environment.baseUrl);
    return from(
      pb.collection<Profile>('profiles').getFirstListItem(`utilisateur="${userId}"`)
    )
  }

  updateProfile(id: string, data: Profile | any) {
    const pb = new PocketBase(environment.baseUrl);
    return from(pb.collection('profiles').update<Profile>(id, data));
  }
}
