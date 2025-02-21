"use client";
// MessageItem.jsx
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";

export default function MessageItem({ message }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("");
  const { addMessage, removeMessage } = useStore();
  //   const addMessage = useStore((state) => state.addMessage);

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
      removeMessage(loadingMessageId);
      addMessage({
        type: "error",
        text: "Failed to process your request. Please try again.",
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
        <div className="bg-white p-4 rounded-lg max-w-[70%] self-end shadow">
          {message.text}
        </div>
      );

    case "prompt":
      return (
        <div className="bg-blue-50 p-4 rounded-lg max-w-[70%] shadow">
          <p>I noticed that:</p>
          <div className="space-y-2 mt-2">
            {message.actions.canBeSummarized && (
              <div>
                - This is quite a long text, I can help summarize it for you
              </div>
            )}
            {message.actions.canBeTranslated && !langIsAvailable && (
              <div className="text-red-600">
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
          <div className="mt-4 space-x-3">
            {message.actions.canBeSummarized && (
              <Button
                onClick={() => handleAction("summarize")}
                variant="outline"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Summary...
                  </span>
                ) : (
                  "Get Summary"
                )}
              </Button>
            )}

            {message.actions.canBeTranslated && langIsAvailable && (
              <div className="space-y-2">
                <Select
                  value={targetLanguage}
                  onValueChange={setTargetLanguage}
                  disabled={isProcessing}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AVAILABLE_LANGUAGES)
                      .filter(([code]) => code !== message.sourceLanguage)
                      .map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

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
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Translating...
                    </span>
                  ) : (
                    "Translate"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      );

    case "result":
      return (
        <div className="bg-green-50 p-4 space-y-4 max-w-[70%] rounded-lg shadow">
          {message.summary && (
            <div>
              <div className="text-sm text-gray-500 mb-1">Summary:</div>
              {message.summary}
            </div>
          )}
          {message.translatedText && (
            <div>
              <div className="text-sm text-gray-500 mb-1">
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
        <div className="flex items-center gap-2 text-gray-500 p-4 bg-gray-50 rounded-lg shadow">
          <Loader2 className="w-4 h-4 animate-spin" />
          {message.text}
        </div>
      );

    default:
      return null;
  }
}
