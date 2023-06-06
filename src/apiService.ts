import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai";

class APIService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: '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',
    });
    this.openai = new OpenAIApi(configuration);
  }

  async createCompletion(request: CreateCompletionRequest, requestOptions?: any) {
    try {
      console.log(request)
      const completion = await this.openai.createCompletion(request, requestOptions);
      console.log(completion.data.choices[0].text);
      return completion.data.choices[0].text;
    } catch (error) {
      console.error("Failed to create completion:", error);
      throw error;
    }
  }
}

export default APIService;
