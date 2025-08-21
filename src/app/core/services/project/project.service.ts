import {Injectable} from '@angular/core';
import PocketBase from "pocketbase";
import {environment} from "@env/environment.development";
import {from} from "rxjs";
import {Project} from "@app/shared/models/project";
import {ProjectDto} from "@app/shared/models/project-dto";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  createProject(projectDto: ProjectDto) {
    const pb = new PocketBase(environment.baseUrl);
    return from(
      pb.collection('projets').create<Project>(projectDto)
    );
  }

  getProjectByUserId(userId: string) {
    const pb = new PocketBase(environment.baseUrl);
    return from(pb.collection<Project>('projets').getFullList({filter: `utilisateur='${userId}'`}))
  }

  getProjectById(id: string) {
    const pb = new PocketBase(environment.baseUrl);
    return from(pb.collection<Project>('projets').getOne<Project>(id))
  }

  updateProject(id: string, data: Project | any) {
    const pb = new PocketBase(environment.baseUrl);
    return from(pb.collection('projets').update<Project>(id, data));
  }
}
