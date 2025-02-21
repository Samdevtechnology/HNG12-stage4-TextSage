"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/chat";
import {
  AVAILABLE_LANGUAGES,
  languageTagToHumanReadable,
  summarizeText,
  translateText,
} from "@/lib/ai";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowRightLeft, Languages, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Message = ({ message }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("");
  const { addMessage, removeMessage } = useStore();

  const handleAction = async (action, options = {}) => {
    setIsProcessing(true);
    const loadingMessageId = crypto.randomUUID();
    addMessage({
      id: loadingMessageId,
      type: "loading",
      text: action === "summarize" ? "Generating summary..." : "Translating...",
    });
    try {
      let result = { text: message.text };

      if (action === "summarize") {
        result.summary = await summarizeText(message.text);
      } else if (action === "translate") {
        result.translatedText = await translateText(
          message.text,
          message.sourceLanguage,
          options.targetLanguage
        );
        result.targetLanguage = options.targetLanguage;
      }

      removeMessage(loadingMessageId);
      addMessage({
        type: "result",
        ...result,
        sourceLanguage: message.sourceLanguage,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      removeMessage(loadingMessageId);
      addMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsProcessing(false);
      setTargetLanguage("");
    }
  };

  const langIsAvailable = AVAILABLE_LANGUAGES[message.sourceLanguage];

  switch (message.type) {
    case "user":
      return (
        <div className="bg-white dark:bg-[#393838] p-4 rounded-lg max-w-[70%] self-end shadow">
          {message.text}
        </div>
      );

    case "prompt":
      return (
        <div className="bg-blue-50 dark:bg-[#7899D4] p-4 rounded-lg max-w-[70%] shadow">
          <p>I noticed that:</p>
          <div className="space-y-2 mt-2">
            {message.actions.canBeSummarized && (
              <div>
                - This is quite a long text, I can help summarize it for you
              </div>
            )}
            {message.actions.canBeTranslated && !langIsAvailable && (
              <div className="text-red-600 dark:text-red-700">
                -{" "}
                {`This text appears to be in ${languageTagToHumanReadable(
                  message.sourceLanguage
                )} (${(message.confidence * 100).toFixed(
                  1
                )}% sure). And we do not currently support it.`}
              </div>
            )}
            {message.actions.canBeTranslated && langIsAvailable && (
              <div>
                -{" "}
                {`This text appears to be in  ${
                  AVAILABLE_LANGUAGES[message.sourceLanguage]
                } (${(message.confidence * 100).toFixed(1)}% sure).
                Would you like me to help translate`}
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-col-reverse sm:flex-row gap-3 sm:items-end justify-between">
            {message.actions.canBeTranslated && langIsAvailable && (
              <div className="space-y-2">
                <div className="flex justify-center gap-2 items-center">
                  <div className="flex justify-center gap-2 items-center">
                    <div className="text-sm flex justify-center items-center">
                      <Languages className="w-4 h-4" />
                      {`${AVAILABLE_LANGUAGES[message.sourceLanguage]}`}
                    </div>

                    <ArrowRightLeft className="h-4 w-4" />
                  </div>
                  <Select
                    value={targetLanguage}
                    onValueChange={setTargetLanguage}
                    disabled={isProcessing}
                  >
                    <SelectTrigger className="border-0 hover:bg-[#FAEBD7] dark:hover:bg-[#FCAF58] h-7 shadow-none p-1 w-[100px]">
                      <SelectValue placeholder="Translate to" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(AVAILABLE_LANGUAGES)
                          .filter(([code]) => code !== message.sourceLanguage)
                          .map(([code, name]) => (
                            <SelectItem key={code} value={code}>
                              {name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() =>
                    handleAction("translate", {
                      targetLanguage,
                    })
                  }
                  variant="outline"
                  className="w-full"
                  disabled={!targetLanguage || isProcessing}
                >
                  Translate
                </Button>
              </div>
            )}

            {message.actions.canBeSummarized && (
              <Button
                onClick={() => handleAction("summarize")}
                variant="outline"
                className=""
                disabled={isProcessing}
              >
                Get Summary
              </Button>
            )}
          </div>
        </div>
      );

    case "result":
      return (
        <div className="bg-green-50 dark:bg-[#619B8A] p-4 space-y-4 max-w-[70%] rounded-lg shadow">
          {message.summary && (
            <div
              className={`${
                !!message.summaryError && "text-red-600 dark:text-red-700"
              }`}
            >
              <div
                className={cn(
                  `text-sm text-gray-500 dark:text-black/70 mb-1`,
                  message.summaryError && "text-red-700 dark:text-red-800"
                )}
              >
                Summary:
              </div>
              {message.summary}
            </div>
          )}
          {message.translatedText && (
            <div>
              <div className="text-sm text-gray-500  dark:text-black/70 mb-1">
                Translation from {AVAILABLE_LANGUAGES[message.sourceLanguage]}{" "}
                to {AVAILABLE_LANGUAGES[message.targetLanguage]}:
              </div>
              {message.translatedText}
            </div>
          )}
        </div>
      );

    case "error":
      return (
        <div className="bg-red-50 p-4 max-w-[70%] rounded-lg shadow">
          <div className="text-sm text-red-600">{message.text}</div>
        </div>
      );
    case "loading":
      return (
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-200 p-4 bg-gray-50 dark:bg-[#393838] rounded-lg shadow">
          <Loader2 className="w-4 h-4 animate-spin" />
          {message.text}
        </div>
      );

    default:
      return null;
  }
};

export default Message;
