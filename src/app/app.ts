import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  title = signal('angular20');
  http = inject(HttpClient);
  members = signal<any>([]);

  ngOnInit(): void {
    this.getMembers()
    .then((result)=>{
      this.members.set(result);
    }).catch((error)=>{
      console.log(error);
    });
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get(`https://localhost:7296/api/members`));      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
