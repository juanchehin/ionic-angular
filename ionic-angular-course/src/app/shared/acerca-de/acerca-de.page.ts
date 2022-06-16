import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.page.html',
  styleUrls: ['./acerca-de.page.scss'],
})
export class AcercaDePage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async onCancel() {
    // await this.modalCtrl.dismiss(null, 'cancel');
    
    this.modalCtrl.dismiss()
          .then(async () => {
            await null
          })
          .catch(console.error);
  }

}
