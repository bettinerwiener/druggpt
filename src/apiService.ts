import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai";


class APIService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY, // please add your apiKey in the .env file in the root directory 
    });
    this.openai = new OpenAIApi(configuration);
  }

  async createCompletion(request: CreateCompletionRequest, requestOptions?: any) {
    try {
      console.log("request prompt to chatgpt:")
      console.log(request.prompt)
      const completion = await this.openai.createCompletion(request, requestOptions);
      console.log("chatgpt answer")
      console.log(completion.data.choices[0].text);
      return completion.data.choices[0].text;
    } catch (error) {
      console.error("Failed to create completion:", error);
      throw error;
    }
  }
}

export default APIService;
