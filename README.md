# AI chatbot

## Setup
1. Clone the repository to your local machine.
2. Install dependencies by running `npm install` in your terminal.
3. Obtain a Google API key. https://aistudio.google.com/app/apikey
4. Launch the development server with `ng serve`.
5. Visit http://localhost:4200 in your web browser to explore the app.

### Docker pull
1. `docker pull ghcr.io/clivebaker32/ai-chatbot:latest`
2. `docker build`
3. `docker run -p 4200:4200 ghcr.io/clivebaker32/ai-chatbot:latest`
4. `Go to localhost:4200`

## Future Development Considerations

1. I can build A ChatService class to handle the chat history you not deal with inconsistencies in the different data types.\
Specifically leaning towards the purposeful error I get with the response.text in the api.service.ts.\
Also the need the make a new member for the app.component.ts class and deal with the unending changing data types of the chatHistory variable.\
This abstraction is not needed, but it does make life a lot easier if I was to improve this project. 

