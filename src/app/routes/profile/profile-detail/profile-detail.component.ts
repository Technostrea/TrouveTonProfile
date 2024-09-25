import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QRCodeModule} from "angularx-qrcode";
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [
    QRCodeModule
  ],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss'
})
export class ProfileDetailComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected profile = this.route.snapshot.data['profile'];

  protected myAngularxQrCode: string = "http://loalhost:4200";
  protected qrCodeDownloadLink: SafeUrl = "";

  constructor() {
    console.log(this.profile)
    this.myAngularxQrCode = this.myAngularxQrCode + this.router.url;
  }
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
