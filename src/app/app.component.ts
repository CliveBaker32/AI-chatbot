import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';
import {environment} from "../environments/environment.development";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  inputValue: string = "";
  surpriseOptions: readonly any[] = [
    "When is Christmas day?", "Who is the 45th President of the United States?", "Can you give me a pizza recipe?"
  ];
  inputError: boolean = false;

  protected readonly environment = environment;

  chatHistory: Promise<{ role: string, parts: string[] }[]> = Promise.resolve([]);



  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    if (this.inputIsEmpty()) {
      this.inputError = true;
      return;
    }

    if (environment.API_KEY=== "") {
      return;
    }



    // remember to set inputError to false before or after getting the api text
    this.inputError = false;
    //this.apiService.fetchData(this.inputValue);
    this.chatHistory = this.apiService.fetchData(this.inputValue);

    this.clearInput()

  }

  surprise() {
    const randomValue = Math.floor(Math.random() * this.surpriseOptions.length);
    this.inputValue = this.surpriseOptions[randomValue];
    return this.surpriseOptions[randomValue];
  }

  clearInput(): void {
    this.inputValue = ''; // Clear the input field
    this.apiService.httpError = ""
  }

  inputIsEmpty(): boolean {
    // Check if input value is empty
    return this.inputValue.trim() === '';
  }


}
