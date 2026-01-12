import type { MessageContent } from "@/types/MessageContent";
import { createPlugin } from "node_modules/simple-customize-markdown-converter/dist/types/plugin";
import React from "react";
import { MarkdownComponent } from "simple-customize-markdown-converter/react"

const convertPlugin = [
    createPlugin<string, React.ReactNode>(
        "Emoji",
        "inline",
        {
            match: (lexer) => lexer.peek() === ":",
            emit: (lexer) => {
                lexer.next();
                const value = lexer.readUntil(":");
                lexer.listToken.push({ type: "Emoji", value });
            }
        },
        {
            execute: (parser, token) => {
                parser.next(1);
                return { type: "Emoji", value: token.value };
            }
        },
        {
            render: (node) => node.value && decodeURIComponent(node.value)
        }
    )
]

export function displayMessageContent(message: MessageContent) {


    return (
        <MarkdownComponent content={message.content} plugin={convertPlugin} />
    )
}