import { Component, OnInit } from '@angular/core';
import { ILuxDialogConfig, LuxDialogService } from '@ihk-gfi/lux-components';
import { Kennzeichen } from 'src/app/facade/Kennezeichen';
import { Mitarbeiter } from 'src/app/facade/Mitarbeiter';
import { ProfilServiceService } from 'src/app/services/profil-service.service';
import { DialogConfigFactory } from 'src/app/utils/dialogConfigFactory';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})
export class PageProfilComponent implements OnInit {
attr: any[] = [{name: "kennzeichen", label: "Kennzeichen"}];
kennzeichen: Kennzeichen[] = [{id: 1, kennzeichen: "bla"}, {id: 2, kennzeichen: "bla"}];
mitarbeiter: Mitarbeiter = {id: 0, vorname: "Max", nachname: "Mustermann", email: "max.mustermann@gfi.ihk.de", kennzeichen: this.kennzeichen};
private deleteKennzeichenDialogConfig: ILuxDialogConfig = new DialogConfigFactory().setWidth('80%').setContent("Wollen Sie das Kennzeichen wirklich löschen?").build();

public kennzeichenDeleteCallback: Function | undefined;
  constructor(private luxDialogService: LuxDialogService, private profilService: ProfilServiceService) {
   }

  ngOnInit(): void {
    this.kennzeichenDeleteCallback = this.deleteKennzeichen.bind(this);
  }

  deleteKennzeichen(index: number): void {
    
    const dialogRef = this.luxDialogService.open(this.deleteKennzeichenDialogConfig);
    dialogRef.dialogConfirmed.subscribe((result: any) => {
      this.profilService.loescheKennzeichenFromMitarbeiter(this.mitarbeiter.id, this.mitarbeiter.kennzeichen[index].id).subscribe(updatedMitarbeiter => {
        this.mitarbeiter = updatedMitarbeiter;
      });
      
    });
  } 

  getName(): string {
    return this.mitarbeiter.vorname + this.mitarbeiter.nachname;
  }
}
