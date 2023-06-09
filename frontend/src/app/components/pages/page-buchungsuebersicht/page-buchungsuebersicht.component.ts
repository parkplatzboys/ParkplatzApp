import { Component, OnInit } from '@angular/core';
import { LuxDialogService, LuxSnackbarService } from '@ihk-gfi/lux-components';
import { Kennzeichen } from 'src/app/facade/Kennzeichen';
import { BuchungDto } from 'src/app/facade/dto/BuchungDto';
import { AccountService } from 'src/app/services/account.service';
import { BuchungsuebersichtService } from 'src/app/services/buchungsuebersicht.service';
import { DialogConfigFactory } from 'src/app/utils/dialogConfigFactory';

@Component({
  selector: 'app-buchungsuebersicht',
  templateUrl: './page-buchungsuebersicht.component.html',
  styleUrls: ['./page-buchungsuebersicht.component.scss']
})
export class PageBuchungsuebersichtComponent implements OnInit {

  private mitarbeiterID: number;
  public buchungen: BuchungDto[];
  public kennzeichen: Kennzeichen[];
  public selected: Kennzeichen;

  constructor(
    private accountService: AccountService,
    private buchungenService: BuchungsuebersichtService,
    private snackbar: LuxSnackbarService,
    private luxDialogService: LuxDialogService
  ) { }

  ngOnInit(): void {
    this.mitarbeiterID = this.accountService.getMitarbeiterID();

    // Abrufen der Buchungen für den Mitarbeiter
    this.buchungenService.getBuchungenForMitarbeiter(this.mitarbeiterID).subscribe((data: BuchungDto[]) => {
      this.buchungen = data;
    });

    // Abrufen der Kennzeichen für den Mitarbeiter
    this.buchungenService.getKennzeichenForMitarbeiter(this.mitarbeiterID).subscribe((data: Kennzeichen[]) => {
      this.kennzeichen = data;
    });
  }

  saveKennzeichenForBuchung(kennzeichen: Kennzeichen, buchung: BuchungDto) {
    // Speichern der Kennzeichenänderung für die Buchung
    this.buchungenService.saveKennzeichenForBuchung(buchung.buchungID, kennzeichen.kennzeichenID).subscribe(buchungen => {
      this.buchungen = buchungen;
      this.snackbar.openText("Kennzeichenänderung wurde gespeichert.", 2000);
    });
  }

  deleteBuchung(buchung: BuchungDto) {
    // Öffnen eines Dialogs zur Bestätigung der Buchungslöschung
    const dialogRef = this.luxDialogService.open(new DialogConfigFactory().setWidth('30%').setContent("Wollen Sie die Buchung wirklich löschen?").build());
    dialogRef.dialogConfirmed.subscribe(() => {
      // Löschen der Buchung
      this.buchungenService.deleteBuchungFromMitarbeiter(this.mitarbeiterID, buchung.buchungID).subscribe(updated => {
        this.buchungen = updated;
      });
    });
  }

  isDateBeforeToday(date): boolean {
    // Überprüfen, ob das Datum vor dem heutigen Datum liegt
    return new Date(date).valueOf() > new Date().valueOf();
  }

  getSelected(buchung: BuchungDto) {
    // Abrufen des ausgewählten Kennzeichens für die Buchung
    return this.kennzeichen.find(item => item.kennzeichenID === buchung.kennzeichen.kennzeichenID);
  }

}
