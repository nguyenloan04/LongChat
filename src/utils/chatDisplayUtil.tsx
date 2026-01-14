import type { MessageContent } from "@/types/MessageContent";
import { } from "simple-customize-markdown-converter"
import React from "react";
import { createPlugin, MarkdownComponent } from "simple-customize-markdown-converter/react"

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
    ),
    createPlugin<string, React.ReactNode>(
        "Underline",
        "inline",
        {
            match: (lexer) => lexer.startsWith("++"),
            emit: (lexer) => {
                lexer.next();
                lexer.listToken.push({ type: "Underline" });
            }
        },
        {
            execute: (parser) => {
                parser.next(1)
                return { type: "Underline", children: parser.parseInlineUntil("Underline", true) }
            }
        },
        {
            render: (_node, children) => (
                <span key={Math.random()} style={{ textDecoration: "underline" }}>
                    {children}
                </span>
            )
        }
    )
]

export function displayMessageContent(message: MessageContent) {


    return (
        <MarkdownComponent content={message.content} plugin={convertPlugin} />
    )
}