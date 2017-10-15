import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var  google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public lat : number;
  public map: any;
  
  public lng : number;
  @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController,public geolocation: Geolocation,) {
this.loadMap();
  }
  
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
        let mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      google.maps.event.addListener(this.map, 'click', (event) => {
        var location  = event.latLng;
        this.lat = location.lat();
        this.lng = location.lng();
        console.log(this.lat);
        console.log(this.lng);
        // this.addMarker(location);
      });
      this.addMarker(this.map.getCenter());
    
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  addMarker(LatLng){
    let marker  = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: LatLng
    });
  
  }
}
