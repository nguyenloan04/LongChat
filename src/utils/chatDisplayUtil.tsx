import type { MessageContent } from "@/types/MessageContent";
import { type MarkdownOptions } from "simple-customize-markdown-converter"
import React, { type ElementType } from "react";
import { createPlugin, MarkdownComponent } from "simple-customize-markdown-converter/react"

const options: MarkdownOptions<React.ReactNode> = {
    renderOptions: {
        elements: {
            Header: (node, children) => {
                const { level } = node;
                // const generateId = (text: any): string => {
                //     if (typeof text !== 'string') return '';
                //     return text
                //         .toLowerCase()
                //         .replace(/đ/g, 'd')
                //         .replace(/[^a-z0-9]+/g, '-')
                //         .replace(/(^-|-$)/g, '');
                // };

                const headerStyles: Record<number, string> = {
                    1: "text-4xl font-bold mb-4 pb-2 border-b border-gray-200",
                    2: "text-2xl font-semibold mt-6 mb-3 pb-1 border-b border-gray-100",
                    3: "text-xl font-medium mt-4 mb-2",
                    4: "text-lg font-medium mt-3 mb-1",
                    5: "text-base font-bold mt-2",
                    6: "text-sm font-bold mt-2",
                };

                const className = headerStyles[level || 6] || "text-base";
                const Tag = `h${level}` as ElementType;

                return <Tag className={className} style={{ scrollMarginTop: '80px' }}>{children}</Tag>;
            },

            List: (node, children) => {
                const Tag = node.ordered ? 'ol' : 'ul';
                const listClass = node.ordered ? "list-decimal ml-6 space-y-2" : "list-disc ml-6 space-y-2";
                return <Tag className={listClass}>{children}</Tag>;
            },

            ListItem: (_node, children) => (
                <li className="leading-relaxed">{children}</li>
            ),

            Paragraph: (_node, children) => (
                <p className="">{children}</p>
            ),

            CodeBlock: (node) => {
                const { lang, content } = node;
                const isInline = !lang;

                if (isInline) {
                    return (
                        <code className="bg-gray-100 dark:bg-gray-800 text-[#e83e8c] dark:text-pink-400 px-1.5 py-0.5 rounded font-mono text-[0.9em] border border-gray-200 dark:border-gray-700">
                            {content}
                        </code>
                    );
                }

                return (
                    <div className="my-6 rounded-lg overflow-hidden font-mono text-sm border border-gray-200 dark:border-gray-800 shadow-sm">
                        <pre className="p-4 overflow-auto bg-gray-200 dark:bg-[#131313] text-gray-700 dark:text-gray-300 leading-relaxed scrollbar-thin dark:scrollbar-thumb-gray-800 scrollbar-thumb-gray-300">
                            <code className="whitespace-pre-wrap break-all">{content}</code>
                        </pre>

                        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#252525] border-b border-gray-200 dark:border-gray-800">
                            <span className="text-gray-500 dark:text-gray-400 lowercase italic">{lang || 'text'}</span>
                        </div>
                    </div>
                );
            },

            InlineCode: (node) => {
                const { content } = node;
                return (
                    <code className={`px-1.5 py-0.5 rounded font-mono text-[0.875em] 
                            font-medium border transition-colors duration-200 
                            bg-gray-200 text-gray-800 border-gray-200 
                            dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 inline-block`
                    }>
                        {content}
                    </code>
                );
            },
            Quote: (_node, children) => (
                <blockquote
                    className="m-0 py-0 ps-2 border-l-4 border-l-neutral-400"
                >
                    {children}
                </blockquote>
            ),
            Link: (node, _children) => (
                <a
                    target="_blank"
                    rel="noopener"
                    className="cursor-pointer underline text-blue-200 hover:text-blue-100"
                    href={node.href?.startsWith("/") ? "about:blank" : node.href}
                    title={node.href}
                >
                    {node.text}
                </a>
            ),
            Bold: (_node, children) => (
                <p className="font-semibold">{children}</p>
            )
        }
    },
    converterOptions: {
        allowDangerousHtml: false
    }
};

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
                <span style={{ textDecoration: "underline" }}>
                    {children}
                </span>
            )
        }
    ),
    createPlugin<string, React.ReactNode>(
        "Mention",
        "inline",
        {
            match: (lexer) => lexer.peek() === "@",
            emit: (lexer) => {
                lexer.next();
                let username = "";
                const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";

                while (!lexer.isEndOfFile()) {
                    const char = lexer.peek();
                    if (char && allowedChars.includes(char)) {
                        username += char;
                        lexer.next();
                    } else {
                        break;
                    }
                }

                if (username.length > 0) {
                    lexer.listToken.push({ type: "Mention", value: username });
                } else {
                    lexer.listToken.push({ type: "text", value: "@" });
                }
            }
        },
        {
            execute: (parser, token) => {
                parser.next(1);
                return { type: "Mention", value: token.value };
            }
        },
        {
            render: (node) => node.value && (<span className="text-blue-500">@{node.value}</span>)
        }
    ),
]

export function displayMessageContent(message: MessageContent) {
    return (
        <MarkdownComponent 
            content={message.content} 
            plugin={convertPlugin} 
            options={options} 
            />
    )
}