export function insertMarkdown(
    el: HTMLTextAreaElement,
    startSymbol: string,
    endSymbol?: string,
    setValue?: (val: string) => void
) {
    if (!endSymbol) endSymbol = startSymbol

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const fullText = el.value;

    const selectedText = fullText.substring(start, end);

    //Start + Symbol + Selected Text + Symbol + End
    const newText =
        fullText.substring(0, start)
        + startSymbol + selectedText + endSymbol +
        fullText.substring(end);

    el.value = newText;

    el.focus();
    const newCursorPos = start + endSymbol.length;

    if (selectedText.length > 0) {
        el.setSelectionRange(
            start + startSymbol.length + selectedText.length + endSymbol.length,
            start + startSymbol.length + selectedText.length + endSymbol.length
        );
    } else {
        el.setSelectionRange(newCursorPos, newCursorPos);
    }

    if (setValue) {
        setValue(newText);
    } else {
        el.value = newText;
    }

    setTimeout(() => {
        el.focus();
        if (selectedText.length > 0) {
            // Put cursor into end of selected text
            const endPos = start + startSymbol.length + selectedText.length + endSymbol.length;
            el.setSelectionRange(endPos, endPos);
        } else {
            // If not, put cursor into middle of symbol
            const middlePos = start + startSymbol.length;
            el.setSelectionRange(middlePos, middlePos);
        }
    }, 0);
};