import {Injectable} from '@angular/core';
import {GoogleGenerativeAI} from "@google/generative-ai"
import {environment} from "../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Define chatHistory as a member variable
  chatHistory: { role: string, parts: string[] }[] = [];
  private _httpError: string = "";

  constructor() {
  }

  async fetchData(userPrompt: String): Promise<{ role: string; parts: string[]; }[]> {

    // Access the API key as an environment variable
    const genAI = new GoogleGenerativeAI(environment.API_KEY);


    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({model: "gemini-pro"});

    const chat = model.startChat({
      history: this.chatHistory
    });

    const prompt = userPrompt.toString()
    //add prompt to the chat History
    this.chatHistory.push({
      role: "user",
      parts: [prompt]
    });

    this.chatHistory.forEach(value => {
      console.log("Before sending to Gemini, this is the current chat history.\n" +
        value.role + ": " + value.parts)
    })

    let result: any;

    try {
      if (environment.API_KEY.length < 20) {
        this.chatHistory.pop();
        this._httpError = "Less than 20";
        throw new Error( "Api key is less than 20 characters.");
      }

      result = await chat.sendMessage(prompt);
    } catch (e: any) {
      console.error('An error occurred while sending message: ', e);

      // Check if the error message matches a specific pattern using regex
      if (/API_KEY_INVALID/.test(e)) {
        // Handle timeout error
        this._httpError = e;
        this.chatHistory.pop()
      }
    }

    const response = result.response;
    const text = response.text();
    console.log(text);


    this.chatHistory.push({
      role: "model",
      parts: [text]
    });

    console.log(this.chatHistory);
    console.log(await chat.getHistory());

    return this.chatHistory;
  }

  clearLastInput() {
    this.chatHistory.pop();
  }

  get httpError(): string {
    return this._httpError;
  }

  set httpError(value: string) {
    this._httpError = value;
  }
}
