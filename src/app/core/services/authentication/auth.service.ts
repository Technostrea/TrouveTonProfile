import {Injectable, signal} from '@angular/core';
import {LoginDto} from "@app/shared/models/login-dto";
import PocketBase from 'pocketbase';
import {environment} from "@env/environment";
import {Auth} from "@app/shared/models/auth";
import {RegisterDto} from "@app/shared/models/register-dto";
import {User} from "@app/shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = signal<Auth | undefined>(undefined)

  async login(loginDto: LoginDto) {
    const {email, password} = loginDto
    const pb = new PocketBase(environment.baseUrl);
    const response = await pb.collection('users').authWithPassword(email, password);
    const isValid = response.record['verified'];
    const res = {isValid, record: pb.authStore.model as User, token: pb.authStore.token};
    if (isValid){
      this.user.set(res);
    }
    return res;
  }


  async register(registerDto: RegisterDto) {
    const pb = new PocketBase(environment.baseUrl);
    return await pb.collection('users').create<User>(registerDto)
  }

  async logout() {
    const pb = new PocketBase(environment.baseUrl);
    return pb.authStore.clear();
  }


  updateUser() {
    const pb = new PocketBase(environment.baseUrl);
    this.user.set({isValid: pb.authStore.isValid, record: pb.authStore.model as User, token: pb.authStore.token});
  }

  sendPasswordReset(email: string) {
    const pb = new PocketBase(environment.baseUrl);
    return pb.collection('users').requestPasswordReset(email);
  }

  verifyEmail(email: string) {
    const pb = new PocketBase(environment.baseUrl);
    return pb.collection('users').requestVerification(email)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error('Error sending verification email:', error);
        return false;
      });
  }

  isAuthenticated(): boolean {
    const pb = new PocketBase(environment.baseUrl);
    return pb.authStore.isValid;
  }

  isEmailVerified(): boolean {
    const pb = new PocketBase(environment.baseUrl);
    return  pb.authStore.model? pb.authStore.model['verified'] : false;
  }
}
