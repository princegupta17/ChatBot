import { Configuration } from "openai";

export const configureOpenai = () => {
  const config = new Configuration({
    apiKey: process.env.OPENAI_SECRET,
    organization: process.env.OPENAI_ORGANISATION,
  });
  return config;
};
