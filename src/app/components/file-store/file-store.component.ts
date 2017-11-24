import {Component, OnInit} from '@angular/core';
import {ABSFileStoreService} from '../../services/a-b-s-file-store.service';

@Component({
  selector: 'app-file-store',
  templateUrl: './file-store.component.html',
  styleUrls: ['./file-store.component.css']
})
export class FileStoreComponent implements OnInit {
  public filesLists:any = ['file1.png', 'file2.mp3'];
  public imgSrc:any = '';
  public videoSrc:any = '';
  public docSrc:any = '';

  constructor(private aBSFileStoreService:ABSFileStoreService) {
  }

  ngOnInit() {
    this.getlist();
  }

  getlist() {
    return this.aBSFileStoreService.getAllFiles().then((res)=> {
      console.table(res);
      console.log("hi");
      this.filesLists = [];
      for (var key in res) {
        this.filesLists.push({
          name: key,
          _id: key,
          blob: res[key]
        })
      }
      console.log("files :::", this.filesLists);
    });
  }

  uploadFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      console.log("file", event.target.files[0]);
      this.aBSFileStoreService.saveFileAsAtt(event.target.files[0], event.target.files[0].name).then((res) => this.getlist());
    }
  }

  showFile(file) {
    switch (file.content_type) {
      case "image/png":
        this.showImage(file.data);
        break;
      case "video/mp4":
        this.showVideo(file.data);
        break;
      case "audio/mp3":
        this.showVideo(file.data);
        break;
      default:
        this.showDocs(file.data);
    }
    console.log(file);
  }

  showImage(image:any) {
    console.log(image);
    this.imgSrc =window.URL.createObjectURL(image);
    // var reader = new FileReader();
    //
    // reader.onload = (event) => {
    //   this.imgSrc = reader.result;
    //   console.log("img", this.imgSrc);
    // };
    //
    // reader.readAsDataURL(image);
  }

  showVideo(video:any) {
    console.log(video);
    this.videoSrc = window.URL.createObjectURL(video);
  }
  showDocs(doc:any) {
    console.log(doc);
    this.docSrc = window.URL.createObjectURL(doc);
    console.log("hi",this.docSrc);
  }

}
