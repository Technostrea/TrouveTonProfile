import {Component, inject, Input, OnInit} from '@angular/core';
import {Sector} from "@app/shared/models/sector";
import {TitleCasePipe} from "@angular/common";
import {SectorService} from "@app/core/services/sector/sector.service";
import {UntilDestroy} from "@ngneat/until-destroy";

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
@UntilDestroy()
export class ChipsComponent implements OnInit {
  @Input({required: true}) sectorId: string | null = null;

  protected sectorService = inject(SectorService);

  protected sector: Sector | undefined = undefined;

  ngOnInit(): void {
    if (this.sectorId)
      this.sectorService.getSectorById(this.sectorId).subscribe(value => this.sector = value)
  }


}
