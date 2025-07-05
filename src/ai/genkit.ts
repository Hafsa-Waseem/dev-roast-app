import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({ apiKey: 'AIzaSyDYtf3FCePDlU__T67NuZTnpAJnirXUcA0' })],
  model: 'googleai/gemini-2.0-flash',
});
