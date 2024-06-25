# Spellcheck

This is an attempt to build a functional spellcheck system that can be used with any `input` or `textarea`.

This is a functional set of code rather than optimized.

## Using the CAH-SPELLCHECK functionality

The important parts here are ...

1. The `#[name]` used to allow the referece for the `onRightClick` event.
2. The `(contextmenu)=""` which allows Angular to trap the event and input being used.
3. The <cah-spellcheck>` component added, with the `#spellcheck` reference.

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

  <cah-spellcheck #spellcheck></cah-spellcheck>
</div>
```

Inside the component TypeScript code, `#spellcheck` is referenced to allow passing the `event` and `element` to the `onRightClick` function in the Spell Check component.

```typescript
  @ViewChild(CahSpellcheckComponent) spellcheck!: CahSpellcheckComponent;

  // ...

  onRightClick = (event: any, element: any): void => {
    this.spellcheck.onRightClick(event, element);
  };
```

## CAH-SPELLCHECK Service

The service uses an `init` function, and in this demo it's initialized on the input page. In reality, this should be done as close to the load time of the application as possible.

Only the `checkWord` function is used to get the boolean `misspelled` and an array of strings `suggestions`.

## CAH-SPELLCHECK Component

`onRightClick` is the way that the external (parent) component tells this component to get the word the cursor is on, select the word, and open the menu with options.

* Five (5) words are selected.
* If the word is spelled correctly, it will be first on the list.
* `closeMenu` is managed on the wrapper and checks for specific classes to determine whether to `triggerSelection` (select a word to replace the selected word with), `triggerFixedItem` to handle add to dictionary, cut, copy, and paste options, or simply closing the menu if no menu item is selected.


