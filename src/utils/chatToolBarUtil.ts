export function insertMarkdown(
    element: HTMLTextAreaElement,
    startSymbol: string,
    endSymbol?: string,
) {
    if (!endSymbol && endSymbol !== "") endSymbol = startSymbol

    const start = element.selectionStart ?? 0;
    const end = element.selectionEnd ?? 0;
    const fullText = element.value;

    const selectedText = fullText.substring(start, end);

    //Start + Symbol + Selected Text + Symbol + End
    const newText =
        fullText.substring(0, start)
        + startSymbol + selectedText + endSymbol +
        fullText.substring(end);

    element.value = newText;

    element.style.height = 'auto'; // Reset height
    element.style.height = `${element.scrollHeight}px`;

    element.focus();
    const newCursorPos = start + endSymbol.length;

    if (selectedText.length > 0) {
        element.setSelectionRange(
            start + startSymbol.length + selectedText.length + endSymbol.length,
            start + startSymbol.length + selectedText.length + endSymbol.length
        );
    } else {
        element.setSelectionRange(newCursorPos, newCursorPos);
    }
    element.value = newText;

    setTimeout(() => {
        element.focus();
        if (selectedText.length > 0) {
            // Put cursor into end of selected text
            const endPos = start + startSymbol.length + selectedText.length + endSymbol.length;
            element.setSelectionRange(endPos, endPos);
        } else {
            // If not, put cursor into middle of symbol
            const middlePos = start + startSymbol.length;
            element.setSelectionRange(middlePos, middlePos);
        }
    }, 0);
};