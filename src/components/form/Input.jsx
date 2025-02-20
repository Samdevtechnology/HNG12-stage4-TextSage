"use client";

// ChatInput.jsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/store/chat";
import {
  AVAILABLE_LANGUAGES,
  detectLanguage,
  translateText,
  summarizeText,
} from "@/lib/ai";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ArrowRightLeft,
  ArrowUpFromDot,
  Globe,
  Languages,
  Loader2,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export default function ChatInput() {
  const [text, setText] = useState("");
  const [shouldSummarize, setShouldSummarize] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { addMessage, createChat, currentChatId, removeMessage } = useStore();

  const showSummarizeOption = text.length > 150;

  useEffect(() => {
    if (!showSummarizeOption) {
      setShouldSummarize(false);
    }
  }, [showSummarizeOption]);

  const processText = async (text, sourceLanguage) => {
    let result = { text };

    // If input is not English and target is English
    if (sourceLanguage !== "en" && targetLanguage === "en") {
      // First translate to English
      result.translatedText = await translateText(
        text,
        sourceLanguage,
        targetLanguage
      );

      // Then summarize if requested and length > 150
      if (shouldSummarize && result.translatedText.length > 150) {
        result.summary = await summarizeText(result.translatedText);
      }
    }
    // If input is English
    else if (sourceLanguage === "en") {
      // First summarize if requested
      if (shouldSummarize && text.length > 150) {
        result.summary = await summarizeText(text);
      }

      // Then translate if target language is selected
      if (targetLanguage && targetLanguage !== "en") {
        result.translatedText = await translateText(
          text,
          sourceLanguage,
          targetLanguage
        );
      }
    }
    // For other language combinations, just translate
    else if (targetLanguage) {
      result.translatedText = await translateText(
        text,
        sourceLanguage,
        targetLanguage
      );
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (!currentChatId) {
      const title = text.slice(0, 25);
      createChat(title);
    }

    // Add user message
    addMessage({
      type: "user",
      text,
    });

    // Add loading message
    const loadingMessageId = crypto.randomUUID();
    addMessage({
      id: loadingMessageId,
      type: "loading",
      text: "Processing your request...",
    });

    setIsProcessing(true);

    try {
      // Detect source language
      const { detectedLanguage, confidence } = await detectLanguage(text);

      // Check if no options are selected but options are available
      const canBeSummarized = detectedLanguage === "en" && text.length > 150;
      const canBeTranslated = true; // Always available as text can be translated to any language
      const noOptionsSelected = !targetLanguage && !shouldSummarize;

      if (noOptionsSelected && (canBeSummarized || canBeTranslated)) {
        removeMessage(loadingMessageId);
        setIsProcessing(false);
        // Add prompt message
        addMessage({
          type: "prompt",
          text,
          sourceLanguage: detectedLanguage,
          confidence,
          actions: {
            canBeSummarized,
            canBeTranslated,
          },
        });
        return;
      }

      // Process text based on source language and options
      const processedResult = await processText(text, detectedLanguage);

      removeMessage(loadingMessageId);

      // Add result message
      addMessage({
        type: "result",
        ...processedResult,
        sourceLanguage: detectedLanguage,
        targetLanguage,
      });
    } catch (error) {
      removeMessage(loadingMessageId);
      addMessage({
        type: "error",
        text: "Failed to process your request. Please try again.",
      });
    } finally {
      setIsProcessing(false);
      // Reset form
      setText("");
      setShouldSummarize(false);
      setTargetLanguage("");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-[#f3f4f6] cursor-text rounded-3xl shadow-[0px_0px_0px_0.5px_#dce0e9]"
      >
        <div className="flex">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message TextSage"
            className="min-h-[100px] resize-none p-0 placeholder:text-gray-400 text-base md:text-base focus:outline-0 border-0 focus:ring-0 focus-visible:ring-0 shadow-none"
            disabled={isProcessing}
          />
          {text.trim() && (
            <span>
              <Button
                type="submit"
                className="rounded-full p-0 h-9 min-w-9"
                disabled={!text.trim() || isProcessing}
              >
                <ArrowUpFromDot />
              </Button>
            </span>
          )}
        </div>

        <div className="flex gap-4 mt-1 justify-between items-center">
          <div className="flex gap-6">
            <div className="flex justify-center gap-2 items-center">
              <div className="flex justify-center gap-2 items-center">
                <div className="text-sm flex justify-center items-center">
                  <Languages className="w-4 h-4" />
                  <span className="text-base font-bold">Sage</span> translate
                </div>

                <ArrowRightLeft className="h-4 w-4" />
              </div>
              <Select
                value={targetLanguage}
                onValueChange={setTargetLanguage}
                disabled={isProcessing}
              >
                <SelectTrigger className="border-0 hover:bg-slate-500 h-7 shadow-none p-1 w-[100px]">
                  <SelectValue placeholder="Translate to" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.entries(AVAILABLE_LANGUAGES).map(([code, name]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {showSummarizeOption && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="summarize"
                  className="sr-only"
                  checked={shouldSummarize}
                  onCheckedChange={setShouldSummarize}
                  disabled={isProcessing}
                />
                <label
                  htmlFor="summarize"
                  className={`
                    flex items-center gap-1 px-3 py-1 rounded-full text-sm hover:bg-[#E0E4ED] transition-colors border text-[#4c4c4c] border-black/10 bg-white
                    ${
                      shouldSummarize &&
                      "bg-[#dbeafe] border-[#007aff26] text-[#4d6bfe] hover:bg-[#c3daf8]"
                    }
                   
                  `}
                >
                  <Globe className="w-4 h-4" />
                  Summarize
                </label>
              </div>
            )}
          </div>

          {text.trim() && (
            <div className=" text-gray-400">
              {text.trim().length} characters
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
