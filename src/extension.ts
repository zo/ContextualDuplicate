'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let duplicateCodeCommand = vscode.commands.registerCommand('lafe.duplicateCode', duplicateCode);
    context.subscriptions.push(duplicateCodeCommand);
}

function duplicateCode() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) return;
    let selections = editor.selections;

    editor.edit(textEdit => {
        for (let i = 0; i < selections.length; i++) {
            const selection = selections[i];
            if (selection.isEmpty) {
                //Duplicate line
                const text = editor.document.lineAt(selection.start.line).text;
                textEdit.insert(new vscode.Position(selection.start.line, 0), `${text}\r\n`);
            } else {
                //Duplicate fragment
                const text = editor.document.getText(selection);
                textEdit.insert(selection.start, text);
            }
        }
    });
}