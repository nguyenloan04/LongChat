import { insertMarkdown } from "@/utils/chatToolbarUtil";
import { Bold, Heading, Italic, Link, List, ListOrdered, TextQuote, Underline } from "lucide-react";
import type { RefObject } from "react";

export function ChatToolBar({ inputRef }: { inputRef: RefObject<HTMLTextAreaElement | null> }) {
    const decorationFeature = [
        {
            name: "Tiêu đề",
            Icon: Heading,
            onClick: () => handlerFunction((element) => insertMarkdown(element, "###", ""))
        },
        {
            name: "Chữ đậm",
            Icon: Bold,
            onClick: () => handlerFunction((element) => insertMarkdown(element, "**"))
        },
        {
            name: "Chữ nghiêng",
            Icon: Italic,
            onClick: () => handlerFunction((element) => insertMarkdown(element, "*"))
        },
        {
            name: "Chữ gạch chân",
            Icon: Underline,
            onClick: () => handlerFunction((element) => insertMarkdown(element, "++"))
        },
        {
            name: "Trích dẫn",
            Icon: TextQuote,
            onClick: () => handlerFunction((element) => {
                const start = element.selectionStart;
                const isStartOfLine = start === 0 || element.value[start - 1] === "\n";

                //Add \n if not start of line
                const symbol = isStartOfLine ? "> " : "\n> ";
                insertMarkdown(element, symbol, "\n")
            })
        },
        {
            name: "Link",
            Icon: Link,
            onClick: () => handlerFunction((element) => insertMarkdown(element, "[", "](url)"))
        }
    ]

    const listAndTaskFeature = [
        {
            name: "Danh sách",
            Icon: List,
            onClick: () => handlerFunction((element) => {
                const start = element.selectionStart;
                const isStartOfLine = start === 0 || element.value[start - 1] === "\n";

                //Add \n if not start of line
                const symbol = isStartOfLine ? "- " : "\n- ";
                insertMarkdown(element, symbol, "")
            })
        },
        {
            name: "Danh sách đánh số",
            Icon: ListOrdered,
            onClick: () => handlerFunction((element) => {
                const start = element.selectionStart;
                const isStartOfLine = start === 0 || element.value[start - 1] === "\n";

                //Add \n if not start of line
                const symbol = isStartOfLine ? "1. " : "\n1. ";
                insertMarkdown(element, symbol, "");
            })
        },
    ]

    const handlerFunction = (cb: (element: HTMLTextAreaElement) => void) => {
        if (inputRef?.current) cb(inputRef.current)
    }

    return (
        <div className="bg-white h-12 flex items-center px-2 py-2 border-t">
            {decorationFeature.map((ele, index) =>
                <div title={ele.name}>
                    <ele.Icon
                        key={index}
                        className="rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 cursor-pointer p-1.5"
                        size={"2rem"}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={ele.onClick}
                    />
                </div>
            )}
            <div className="w-px mx-1 h-full bg-neutral-400"></div>
            {listAndTaskFeature.map((ele, index) =>
                <div title={ele.name}>
                    <ele.Icon
                        key={index}
                        className="rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 cursor-pointer p-1.5"
                        size={"2rem"}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={ele.onClick}
                    />
                </div>
            )}
        </div>
    )
}