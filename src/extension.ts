import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	const disposable = vscode.commands.registerCommand('copyfoldertree.copy', () => {
		vscode.window.showInformationMessage('Hello World from CopyFolderTree!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
