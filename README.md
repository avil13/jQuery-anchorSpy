jQuery-anchorSpy.js
================

jQuery plugin to active menu item on scroll


##Example##
**HTML**

```html
<ul class="menu ease">
    <li><a href="#menu">menu</a></li>
    <li><a href="#faq">faq</a></li>
    <li><a href="#list">list</a></li>
</ul>

<div>
    <a name="menu"></a>
    Lorem ipsum dolor ...
</div>
...

```

**JS**

```js
var Spy = $('.menu').anchorSpy({
        margin: 50,
        speed: 1000,
        next: '.next',
        prev: '.prev'
    });

```

If you nead reload, then use ```reload()```

```js
Spy.reload();

```


If you nead go to the next or previous block then use ``` next() ``` or ``` prev() ``` method.

```js
Spy.next();

Spy.prev();

```

**Options**


| option | default | Nead |
|-----------------|----------------:|-------------:|
|margin | 50  | Integer|
|speed | 1000  | Integer|
|next | false | DOM selector|
|prev  | false  | DOM selector|




*Thanks for idea, Novikov Maksim*
