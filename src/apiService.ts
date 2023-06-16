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
      console.log(request.prompt)
      const completion = await this.openai.createCompletion(request, requestOptions);
      console.log(completion.data.choices[0].text);
      console.log(completion)
      return completion.data.choices[0].text;
    // return 'Paracetamol is a commonly used pain reliever and fever reducer. It is important to note that I cannot provide specific medical advice or access current information beyond my September 2021 knowledge cutoff. However, based on general knowledge, I can provide some information.';
    } catch (error) {
      console.error("Failed to create completion:", error);
      throw error;
    }
  }
}

export default APIService;
