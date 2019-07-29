import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import {AuthServices} from '../../../core/Service/Auth.Service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit {

  youtubedata: any ;
  linkk: any;
  GmailData: any;
   url: string;
  constructor(public Service: AuthServices, private sanitizer: DomSanitizer,
              private route: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.url = this.activatedRoute.snapshot.queryParams.code;
    if (this.url != null && this.url !== undefined && this.url !== '') {
      this.getAllmails(this.url);
    }
  }

   public getvideo(channelname) {
     this.Service.youtubevideo(channelname).subscribe(Response => {
     this.youtubedata = Response;
     });
   }

   public check(data) {
    return  this.linkk =  this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + data.id.videoId);
   }

   public userEmail() {
     this.Service.GetEmail().subscribe(Response => {
       this.url = Response.toString();
       window.location.href = this.url;
     });
   }

   public getAllmails(code) {
    this.Service.getAllmails(code).subscribe(Response => {
      this.GmailData = Response;
    });
   }

   public getsenderEmail(detail) {
   const senderemail = detail.find(x => x.name === 'Subject');
   return senderemail.value;
   }

   public sendby(detail) {
    const senderemail = detail.find(x => x.name === 'From');
    return senderemail.value;
    }
}
