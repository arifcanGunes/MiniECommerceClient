import { Component, OnInit } from '@angular/core';
import { CustomHttpClientService } from './services/common/custom-http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private httpClient: CustomHttpClientService) {
  }
  ngOnInit(): void {
    
  }
  
  title = 'MiniETicaretClient';
  
}


