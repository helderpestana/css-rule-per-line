'use babel';

import CssRulePerLine from '../lib/css-rule-per-line';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('CssRulePerLine', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('css-rule-per-line');
  });

  describe('when the css-rule-per-line:toggle event is triggered', () => {
    it('minifies CSS rules to one rule per line', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.css-rule-per-line')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'css-rule-per-line:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.css-rule-per-line')).toExist();

        let cssRulePerLineElement = workspaceElement.querySelector('.css-rule-per-line');
        expect(cssRulePerLineElement).toExist();

        let cssRulePerLinePanel = atom.workspace.panelForItem(cssRulePerLineElement);
        expect(cssRulePerLinePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'css-rule-per-line:toggle');
        expect(cssRulePerLinePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.css-rule-per-line')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'css-rule-per-line:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let cssRulePerLineElement = workspaceElement.querySelector('.css-rule-per-line');
        expect(cssRulePerLineElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'css-rule-per-line:toggle');
        expect(cssRulePerLineElement).not.toBeVisible();
      });
    });
  });
});
