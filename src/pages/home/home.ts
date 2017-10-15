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
          //for night mode
          // styles: [
          //   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          //   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          //   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          //   {
          //     featureType: 'administrative.locality',
          //     elementType: 'labels.text.fill',
          //     stylers: [{color: '#d59563'}]
          //   },
          //   {
          //     featureType: 'poi',
          //     elementType: 'labels.text.fill',
          //     stylers: [{color: '#d59563'}]
          //   },
          //   {
          //     featureType: 'poi.park',
          //     elementType: 'geometry',
          //     stylers: [{color: '#263c3f'}]
          //   },
          //   {
          //     featureType: 'poi.park',
          //     elementType: 'labels.text.fill',
          //     stylers: [{color: '#6b9a76'}]
          //   },
          //   {
          //     featureType: 'road',
          //     elementType: 'geometry',
          //     stylers: [{color: '#38414e'}]
          //   },
          //   {
          //     featureType: 'road',
          //     elementType: 'geometry.stroke',
          //     stylers: [{color: '#212a37'}]
          //   },
          //   {
          //     featureType: 'road',
          //     elementType: 'labels.text.fill',
          //     stylers: [{color: '#9ca5b3'}]
          //   },
          //   {
          //     featureType: 'road.highway',
          //     elementType: 'geometry',
          //     stylers: [{color: '#746855'}]
          //   },
          //   {
          //     featureType: 'road.highway',
          //     elementType: 'geometry.stroke',
          //     stylers: [{color: '#1f2835'}]
          //   },
          //   {
          //     featureType: 'road.highway',
          //     elementType: 'labels.text.fill',
          //     stylers: [{color: '#f3d19c'}]
          //   },
          //   {
          //     featureType: 'transit',
          //     elementType: 'geometry',
          //     stylers: [{color: '#2f3948'}]
          //   },
          //   {
          //     featureType: 'transit.station',
          //     elementType: 'labels.text.fill',
          //     stylers: [{color: '#d59563'}]
          //   },
          //   {
          //     featureType: 'water',
          //     elementType: 'geometry',
          //     stylers: [{color: '#17263c'}]
          //   },
          //   {
          //     featureType: 'water',
          //     elementType: 'labels.text.fill',
          //     stylers: [{color: '#515c6d'}]
          //   },
          //   {
          //     featureType: 'water',
          //     elementType: 'labels.text.stroke',
          //     stylers: [{color: '#17263c'}]
          //   }
          // ]
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
//add icon for marker
     // icon:'assets/icon/favicon.ico',
      animation: google.maps.Animation.DROP, // BOUNCE,
      position: LatLng
    });
  
  }
}
