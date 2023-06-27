import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Photo, CameraSource, Camera, CameraResultType, ImageOptions } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {}

  clickhandle(){
    this.takePicture(CameraSource.Camera);
  }

  takePicture(source: CameraSource) {
      const options: ImageOptions = { resultType: CameraResultType.Base64, quality: 100, source,  correctOrientation: true, };
  
      Camera.getPhoto(options).then((image) => {
          const captureDataUrl = "data:image/jpeg;base64," + image.base64String;
          // Save a local copy of the image.
          //this.saveNewImageToStory(captureDataUrl);
        })
        .catch(async (error) => {
          console.error("Error getPhoto:", error);
          if (error.message === "User denied access to camera" || error.message === "User denied access to photos") {
            const alert = await this.alertController.create({
              header: "Could not load image.",
              message: "Please ensure your device has sufficient permissions to access the camera and photo library.",
              buttons: [ { text: "OK",
                            role: "cancel",
                            cssClass: "secondary",
                            handler: () => { },
                      }, { text: "Open Settings", handler: () => {
                    NativeSettings.open({
                      optionAndroid: AndroidSettings.ApplicationDetails,
                      optionIOS: IOSSettings.App
                    })
                  },
                },
              ],
            });
            await alert.present();
          }
        });
  }
}
