const vscode = require('vscode');
const { GibberishEN, GibberishMM, GibberishZG } = require('./gibberish');

function generate(corpName, contents) {
  return function () {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const name = editor.document.getText(editor.selection) || corpName;
      const index = Math.floor(Math.random() * contents.length);
      const gibberish = contents[index].replace(/@placeholder/gi, name);

      editor.insertSnippet(new vscode.SnippetString(gibberish + ' '));
    }
  };
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposableEN = vscode.commands.registerCommand(
    'corporate-gibberish-generator.generateEN',
    generate('DummyCorp', GibberishEN)
  );
  const disposableMM = vscode.commands.registerCommand(
    'corporate-gibberish-generator.generateMM',
    generate('ရွှေလီမီတက်', GibberishMM)
  );
  const disposableZG = vscode.commands.registerCommand(
    'corporate-gibberish-generator.generateZG',
    generate('ေရွြလီမီတက္', GibberishZG)
  );

  context.subscriptions.push(disposableEN, disposableMM, disposableZG);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
