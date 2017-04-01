'use babel';

import CssRulePerLineView from './css-rule-per-line-view';
import { CompositeDisposable } from 'atom';

export default {

  cssRulePerLineView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cssRulePerLineView = new CssRulePerLineView(state.cssRulePerLineViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cssRulePerLineView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'css-rule-per-line:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cssRulePerLineView.destroy();
  },

  serialize() {
    return {
      cssRulePerLineViewState: this.cssRulePerLineView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      exts=editor.getTitle().split('.').pop();
      if (exts.toLowerCase() == "css") {
        let selection = editor.getText()
        let reversed = selection.split('\r').join('').split('\n').join('').split('\t').join('').split('  ').join(' ').split('  ').join(' ').split('  ').join(' ').split("}").join("}\r\n").split('\n ').join('\n').split("/**/").join("/**/\r\n")
        editor.setText(reversed)
      } else {
        alert('Not a CSS File')
      }
    }
  }

};
