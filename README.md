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

```

**JS**

```js 
$('.menu').anchorSpy({
    margin: 50
});
```



*Thanks for idea, Novikov Maksim*
