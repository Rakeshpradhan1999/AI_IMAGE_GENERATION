import { surpriseMePrompts } from "../constants";
import { saveAs } from "file-saver";
export const getRandomPrompt = (prompt) => {
  const randomNumber = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomNumber];
  if (prompt === randomPrompt) return getRandomPrompt(prompt);
  return randomPrompt;
};

export const saveFile = (url, name) => {
  saveAs(url, name);
};
