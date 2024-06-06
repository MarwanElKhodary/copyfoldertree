import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('copyfoldertree.copy', (resourceUri: vscode.Uri) => {
		if (resourceUri) {
			const parentPath = resourceUri.fsPath;
		} else {
			vscode.window.showWarningMessage('No resource selected!');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
