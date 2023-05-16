// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

interface CustomResponseType {
  result: string | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomResponseType>
) {
  console.log(process.env.OPENAI_API_KEY);
  try {
    const results = await openai.createImage({
      prompt: req.body.prompt,
      n: req.body.n,
      size: req.body.size,
    });

    console.log(results.data.data[0]);
    res.status(200).json({ result: results.data.data[0].url });
  } catch (e: any) {
    res.json(e);
  }
  // res.json({ result: "test" });
}
