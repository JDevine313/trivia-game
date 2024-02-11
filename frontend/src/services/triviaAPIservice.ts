import axios from "axios";
import { Quizs } from "../models/triviaResponse";

export const getTags = async (): Promise<any> => {
  return (
    await axios.get(`https://the-trivia-api.com/v2/totals-per-tag`, {
      params: {},
    })
  ).data;
};

export const getQuestions = async (tags?: string[]): Promise<Quizs[]> => {
  let params = {};
  if (tags) {
    params = { limit: 50, region: "US", categories: tags?.join(",") };
  } else {
    params = { limit: 50, region: "US" };
  }
  return (
    await axios.get(`https://the-trivia-api.com/v2/questions`, {
      params,
    })
  ).data;
};
