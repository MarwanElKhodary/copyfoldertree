import * as vscode from 'vscode';

async function getFolderStructure(uri: vscode.Uri, indent: string = '', isRoot: boolean = true): Promise<string> {
	let structure = '';
	
	if (isRoot) {
		structure += `${uri.path.split('/').pop()}\n`;
	}

    const children = await vscode.workspace.fs.readDirectory(uri);

    for (let i = 0; i < children.length; i++) {
        const [name, type] = children[i];
        const isLast = i === children.length - 1;

        if (type === vscode.FileType.Directory) {
            const folderUri = vscode.Uri.joinPath(uri, name);
            structure += `${indent}${isLast ? '└──' : '├──'} ${name}\n`;
            structure += await getFolderStructure(folderUri, `${indent}${isLast ? '    ' : '│   '}`, false);
        } else {
            structure += `${indent}${isLast ? '└──' : '├──'} ${name}\n`;
        }
    }

    return structure;
}

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand('copyfoldertree.copy', async (resourceUri: vscode.Uri) => {
		if (resourceUri) {
			try {
				const folderStructure = await getFolderStructure(resourceUri);
				console.log(folderStructure);
				await vscode.env.clipboard.writeText(folderStructure);
				vscode.window.showInformationMessage(`Folder tree copied to clipboard!`);
			} catch (error) {
				vscode.window.showErrorMessage(`Error reading directory: ${error}`);
			}
		} else {
			vscode.window.showWarningMessage('No resource selected!');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
