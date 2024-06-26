# Spellcheck

This is an attempt to build a functional spellcheck system that can be used with any `input` or `textarea`.

This is a functional set of code rather than optimized.

## Using the `cs-spellcheck` functionality

The important parts here are ...

1. The `#[name]` used to allow the referece for the `onRightClick` event.
2. The `(contextmenu)=""` which allows Angular to trap the event and input being used.
3. The `<cs-spellcheck>` component added, with the `#spellcheck` reference.

```html
<div class="wrapper">
  <div class="row">
    <input
      class="input"
      #input
      [value]="inputData"
      (contextmenu)="onRightClick($event, input)"
    />
  </div>
  <div class="row">
    <textarea
      class="textarea"
      #textarea
      (contextmenu)="onRightClick($event, textarea)"
    >{{ textareaData }}</textarea>
  </div>

  <cs-spellcheck #spellcheck></cs-spellcheck>
</div>
```

Inside the component TypeScript code, `#spellcheck` is referenced to allow passing the `event` and `element` to the `onRightClick` function in the Spell Check component.

```typescript
  @ViewChild(CsSpellcheckComponent) spellcheck!: CsSpellcheckComponent;

  // ...

  onRightClick = (event: any, element: any): void => {
    this.spellcheck.onRightClick(event, element);
  };
```

### Levenshtein

The **Levenshtein** distance between two words is the minimum number of single-character edits (insertions, deletions or substitutions) required to change one word into the other.

There are two options here:

* simple-levenshtein
* complex-levenshtein

## `cs-spellcheck` Service

The service uses an `init` function, and in this demo it's initialized on the input page. In reality, this should be done as close to the load time of the application as possible.

Only the `checkWord` function is used to get the boolean `misspelled` and an array of strings `suggestions`.

## `cs-spellcheck` Component

`onRightClick` is the way that the external (parent) component tells this component to get the word the cursor is on, select the word, and open the menu with options.

* Five (5) words are selected.
* If the word is spelled correctly, it will be first on the list.
* `closeMenu` is managed on the wrapper and checks for specific classes to determine whether to `triggerSelection` (select a word to replace the selected word with), `triggerFixedItem` to handle add to dictionary, cut, copy, and paste options, or simply closing the menu if no menu item is selected.

## Techical Notes & References

### Fixing Highlight Issue

* [Highlight Text Inside a Textarea](https://codersblock.com/blog/highlight-text-inside-a-textarea/)

### General Articles

* [MDN: Spellcheck Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck)
* [Stackblitz: Spellcheck Directive](https://stackblitz.com/edit/custom-spell-check?file=src%2Fapp%2Fauto-spell-check.directive.ts)
* [jQuery Spellcheck](https://www.javascriptspellcheck.com/)
* [NPM: ngx-spellchecker](https://www.npmjs.com/package/ngx-spellchecker?activeTab=readme)
* [GitHub: Dictionary RAW](https://raw.githubusercontent.com/JacobSamro/ngx-spellchecker/master/dict/normalized_en-US.dic)
* [Stack Overflow: Angular Material Context Menu](https://stackoverflow.com/questions/77608499/angular-material-custom-context-menu-right-click)
* [Medium: Create Custom Context Menu in Angular](https://medium.com/weekly-webtips/create-custom-context-menu-in-angular-efeae0137e1a)
