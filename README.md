# @observablehq/notebook-stdlib

The Observable notebook standard library.

## Installing

If you use NPM, `npm install @observablehq/notebook-stdlib`.

## API Reference

<a href="#runtimeLibrary" name="runtimeLibrary">#</a> <b>runtimeLibrary</b>([<i>resolve</i>])

Returns a new standard library object, defining the following properties:

* [DOM](#dom) - create HTML and SVG elements.
* [Files](#files) - read local files into memory.
* [Generators](#generators) - utilities for generators and iterators.
* [Promises](#promises) - utilities for promises.
* [require](#require) - load third-party libraries.
* [html](#html) - render HTML.
* [md](#markdown) - render Markdown.
* [svg](#svg) - render SVG.
* [tex](#tex) - render TeX.
* [now](#now) - the current value of Date.now.
* [width](#width) - the current page width.

If *resolve* is specified, it is a function that returns the URL of the module with the specified *name*; this is used internally by [require](#require).

### DOM

<a href="#DOM_canvas" name="DOM_canvas">#</a> DOM.<b>canvas</b>(<i>width</i>, <i>height</i>)

Returns a new canvas element with the specified *width* and *height*. For example, to create a 960×500 canvas:

```js
DOM.canvas(960, 500)
```

This is equivalent to:

```js
{
  let canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 500;
  return canvas;
}
```

<a href="#DOM_context2d" name="DOM_context2d">#</a> DOM.<b>context2d</b>(<i>width</i>, <i>height</i>[, <i>dpi</i>])

Returns a new canvas context with the specified *width* and *height* and the specified device pixel ratio *dpi*. If *dpi* is not specified, it defaults to [*window*.devicePixelRatio](https://developer.mozilla.org/docs/Web/API/Window/devicePixelRatio). For example, to create a 960×500 canvas:

```js
{
  let context = DOM.context2d(960, 500);
  return context.canvas;
}
```

If the device pixel ratio is two, this is equivalent to:

```js
{
  let canvas = document.createElement("canvas");
  canvas.width = 1920;
  canvas.height = 1000;
  canvas.style.width = "960px";
  let context = canvas.getContext("2d");
  context.scale(2, 2);
  return canvas;
}
```

To access the context’s canvas, use [*context*.canvas](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/canvas).

<a href="#DOM_download" name="DOM_download">#</a> DOM.<b>download</b>(<i>object</i>\[, <i>name</i>\]\[, <i>value</i>\])

Returns an anchor element containing a button that when clicked will download a file representing the specified *object*. The *object* should be anything supported by [URL.createObjectURL](https://developer.mozilla.org/docs/Web/API/URL/createObjectURL) such as a [file](https://developer.mozilla.org/docs/Web/API/File) or a [blob](https://developer.mozilla.org/docs/Web/API/Blob).

<a href="#DOM_element" name="DOM_element">#</a> DOM.<b>element</b>(<i>name</i>[, <i>attributes</i>])

Returns a new element with the specified *name*. For example, to create an empty H1 element:

```js
DOM.element("h1")
```

This is equivalent to:

```js
document.createElement("h1")
```

If the *name* has the prefix `svg:`, `math:` or `xhtml:`, uses [*document*.createElementNS](https://developer.mozilla.org/docs/Web/API/Document/createElementNS) instead of [*document*.createElement](https://developer.mozilla.org/docs/Web/API/Document/createElement). For example, to create an empty SVG element (see also [DOM.svg](#DOM_svg)):

```js
DOM.element("svg:svg")
```

This is equivalent to:

```js
document.createElementNS("http://www.w3.org/2000/svg", "svg")
```

If *attributes* is specified, sets any attributes in the specified object before returning the new element.

<a href="#DOM_input" name="DOM_input">#</a> DOM.<b>input</b>([<i>type</i>])

Returns a new input element with the specified *type*. If *type* is not specified or null, a text input is created. For example, to create a new file input:

```js
DOM.input("file")
```

This is equivalent to:

```js
{
  let input = document.createElement("input");
  input.type = "file";
  return input;
}
```

<a href="#DOM_range" name="DOM_range">#</a> DOM.<b>range</b>(\[<i>min</i>, \]\[<i>max</i>\]\[, <i>step</i>\])

Returns a new range input element. (See also [DOM.input](#input).) If *max* is specified, sets the maximum value of the range to the specified number; if *max* is not specified or null, sets the maximum value of the range to 1. If *min* is specified, sets the minimum value of the range to the specified number; if *min* is not specified or null, sets the minimum value of the range to 0. If *step* is specified, sets the step value of the range to the specified number; if *step* is not specified or null, sets the step value of the range to `any`. For example, to create a slider that ranges the integers from -180 to +180, inclusive:

```js
DOM.range(-180, 180, 1)
```

This is equivalent to:

```js
{
  let input = document.createElement("input");
  input.min = -180;
  input.max = 180;
  input.step = 1;
  input.type = "range";
  return input;
}
```

Or using [html](#html):

```js
html`<input type=range min=-180 max=180 step=1>`
```

<a href="#DOM_select" name="DOM_select">#</a> DOM.<b>select</b>(<i>values</i>)

Returns a new select element with an option for each string in the specified *values* array. For example, to create a drop-down menu of three colors:

```js
DOM.select(["red", "green", "blue"])
```

This is equivalent to:

```js
{
  let select = document.createElement("select");
  let optionRed = select.appendChild(document.createElement("option"));
  optionRed.value = optionRed.textContent = "red";
  let optionGreen = select.appendChild(document.createElement("option"));
  optionGreen.value = optionGreen.textContent = "green";
  let optionBlue = select.appendChild(document.createElement("option"));
  optionBlue.value = optionBlue.textContent = "blue";
  return select;
}
```

For greater control, consider using [html](#html) instead. For example, here is an equivalent way to define the above drop-down menu:

```js
html`<select>
  <option value="red">red</option>
  <option value="green">green</option>
  <option value="blue">blue</option>
</select>`
```

<a href="#DOM_svg" name="DOM_svg">#</a> DOM.<b>svg</b>(<i>width</i>, <i>height</i>)

Returns a new SVG element with the specified *width* and *height*. For example, to create a 960×500 blank SVG:

```js
DOM.svg(960, 500)
```

This is equivalent to:

```js
{
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  set.setAttribute("viewBox", "0,0,960,500")
  svg.setAttribute("width", "960");
  svg.setAttribute("height", "500");
  return svg;
}
```

<a href="#DOM_text" name="DOM_text">#</a> DOM.<b>text</b>(<i>string</i>)

Returns a new text node with the specified *string* value. For example, to say hello:

```js
DOM.text("Hello, world!")
```

This is equivalent to:

```js
document.createTextNode("Hello, world!")
```

<a href="#DOM_uid" name="DOM_uid">#</a> DOM.<b>uid</b>([<i>name</i>])

Returns a new unique *identifier*. If *name* is specified, the *identifier*.id will be derived from the specified *name*, which may be useful for debugging. If DOM.uid is called repeatedly with the same *name*, every returned *identifier* is still unique (that is, different). Identifiers are useful in SVG: use *identifier*.href for IRI references, such as the [xlink:href](https://www.w3.org/TR/SVG/animate.html#HrefAttribute) attribute; use *identifier*.toString for functional notation, such as the [clip-path](https://www.w3.org/TR/SVG/masking.html#ClipPathProperty) presentation attribute.

For example, to clip the Mona Lisa to a circle of radius 320px:

```js
{
  const clip = uid("clip");
  return svg`<svg width="640" height="640">
  <defs>
    <clipPath id="${clip.id}">
      <circle cx="320" cy="320" r="320"></circle>
    </clipPath>
  </defs>
  <image
    clip-path="${clip}"
    width="640" height="640"
    preserveAspectRatio="xMidYMin slice"
    xlink:href="https://raw.githubusercontent.com/mbostock/9511ae067889eefa5537eedcbbf87dab/raw/98449954e2eea4ef96c177759635de49a970e8c6/mona-lisa.jpg"
  ></image>
</svg>`;
}
```

The use of DOM.uid is strongly recommended over hand-coding as it ensures that your identifiers are still unique if your code is imported into another notebook. Because *identifier*.href and *identifier*.toString return absolute rather than local IRIs, it also works well in conjunction with a notebook’s [base URL](https://developer.mozilla.org/docs/Web/HTML/Element/base).

### Files

<a href="#Files_buffer" name="Files_buffer">#</a> Files.<b>buffer</b>(<i>file</i>)

Reads the specified *file*, returning a promise of the ArrayBuffer yielded by [*fileReader*.readAsArrayBuffer](https://developer.mozilla.org/docs/Web/API/FileReader/readAsArrayBuffer). This is useful for reading binary files, such as shapefiles and ZIP archives.

<a href="#Files_text" name="Files_text">#</a> Files.<b>text</b>(<i>file</i>)

Reads the specified *file*, returning a promise of the string yielded by [*fileReader*.readAsText](https://developer.mozilla.org/docs/Web/API/FileReader/readAsText). This is useful for reading text files, such as plain text, CSV, Markdown and HTML.

<a href="#Files_url" name="Files_url">#</a> Files.<b>url</b>(<i>file</i>)

Reads the specified *file*, returning a promise of the data URL yielded by [*fileReader*.readAsDataURL](https://developer.mozilla.org/docs/Web/API/FileReader/readAsDataURL). This is useful for reading a file into memory, represented as a data URL. For example, to display a local file as an image:

```js
Files.url(file).then(url => {
  var image = new Image;
  image.src = url;
  return image;
})
```

However, note that it may be more efficient to use the synchronous [URL.createObjectURL](https://developer.mozilla.org/docs/Web/API/URL/createObjectURL) method instead, such as:

```js
{
  let image = new Image;
  image.src = URL.createObjectURL(file);
  return image;
}
```

### Generators

<a href="#Generators_filter" name="Generators_filter">#</a> Generators.<b>filter</b>(<i>iterator</i>, <i>test</i>)

…

<a href="#Generators_dispose" name="Generators_dispose">#</a> Generators.<b>dispose</b>(<i>value</i>, <i>disposer</i>)

Returns a new generator that yields the specified *value* exactly once. The [*generator*.return](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator/return) method of the generator will call the specified *disposer* function, passing in the specified *value*. When this generator is the return value of a cell, this allows resources associated with the specified *value* to be disposed automatically when a cell is re-evaluated: *generator*.return is called by the Observable runtime on invalidation.  For example, to define a cell that creates a self-disposing [Tensor](https://js.tensorflow.org/):

```js
x = Generators.dispose(tf.tensor2d([[0.0, 2.0], [4.0, 6.0]]), x => x.dispose())
```

<a href="#Generators_input" name="Generators_input">#</a> Generators.<b>input</b>(<i>input</i>)

…

<a href="#Generators_map" name="Generators_map">#</a> Generators.<b>map</b>(<i>iterator</i>, <i>transform</i>)

…

<a href="#Generators_observe" name="Generators_observe">#</a> Generators.<b>observe</b>(<i>initialize</i>)

…

<a href="#Generators_queue" name="Generators_queue">#</a> Generators.<b>queue</b>(<i>initialize</i>)

…

<a href="#Generators_range" name="Generators_range">#</a> Generators.<b>range</b>([<i>start</i>, ]<i>stop</i>[, <i>step</i>])

…

<a href="#Generators_valueAt" name="Generators_valueAt">#</a> Generators.<b>valueAt</b>(<i>iterator</i>, <i>index</i>)

…

<a href="#Generators_worker" name="Generators_worker">#</a> Generators.<b>worker</b>(<i>source</i>)

Returns a new [self-disposing generator](#Generators_dispose) that yields a [dedicated Worker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) running the specified JavaScript *source*. For example, to create a worker that echos messages sent to it:

```js
worker = Generators.worker(`
onmessage = function({data}) {
  postMessage({echo: data});
};
`)
```

The worker will be automatically [terminated](https://developer.mozilla.org/docs/Web/API/Worker/terminate) when [*generator*.return](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator/return) is called.

### Promises

<a href="#Promises_delay" name="Promises_delay">#</a> Promises.<b>delay</b>(<i>duration</i>[, <i>value</i>])

Returns a promise that resolves with the specified *value* after the specified *duration* in milliseconds.

<a href="#Promises_tick" name="Promises_tick">#</a> Promises.<b>tick</b>(<i>duration</i>[, <i>value</i>])

Returns a promise that resolves with the specified *value* at the next integer multiple of *milliseconds* since the UNIX epoch. This is much like [Promises.delay](#Promises_delay), except it allows promises to be synchronized.

<a href="#Promises_when" name="Promises_when">#</a> Promises.<b>when</b>(<i>date</i>[, <i>value</i>])

… Note: the current implementation relies on [setTimeout](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout), and thus the specified *date* must be no longer than 2,147,483,647 milliseconds (24.9 days) from now.

### Specials

<a href="#invalidation" name="invalidation">#</a> <b>invalidation</b>

A promise that resolves when the current cell is re-evaluated: when the cell’s code changes, when it is run using Shift-Enter, or when a referenced input changes. This promise is typically used to dispose of resources that were allocated by the cell. For example, to abort a fetch if the cell is invalidated:

```js
{
  const controller = new AbortController;
  invalidation.then(() => controller.abort());
  const response = await fetch(url, {signal: controller.signal});
  return response.json();
}
```

<a href="#now" name="now">#</a> <b>now</b>

The current value of [Date.now](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/now).

<a href="#width" name="width">#</a> <b>width</b>

The current width of cells.

### HTML

<a href="#html" name="html">#</a> <b>html</b>(<i>strings</i>, <i>values…</i>)

Returns the HTML element represented by the specified *strings* and *values*. This function is intended to be used as a [tagged template literal](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals_and_escape_sequences). For example, to create an H1 element whose content is “Hello, world!”:

```js
html`<h1>Hello, world!</h1>`
```

If the resulting HTML fragment is not a single HTML element or node, is it wrapped in a DIV element. For example, this expression:

```js
html`Hello, <b>world</b>!`
```

Is equivalent to this expression:

```js
html`<div>Hello, <b>world</b>!</div>`
```

If an embedded expression is a DOM element, it is embedded in generated HTML. For example, to embed [TeX](#tex) within HTML:

```js
html`I like ${tex`\KaTeX`} for math.`
```

If an embedded expression is an array, the elements of the array are embedded in the generated HTML. For example, to create a table from an array of values:

```js
html`<table>
  <tbody>${["zero", "one", "two"].map((name, i) => html`<tr>
    <td>${name}</td><td>${i}</td>
  </tr>`)}</tbody>
</table>`
```

<a href="#svg" name="svg">#</a> <b>svg</b>(<i>strings</i>, <i>values…</i>)

Returns the SVG element represented by the specified *strings* and *values*. This function is intended to be used as a [tagged template literal](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals_and_escape_sequences). For example, to create an SVG element whose content is a circle:

```js
svg`<svg width=16 height=16>
  <circle cx=8 cy=8 r=4></circle>
</svg>`
```

If the resulting SVG fragment is not a single SVG element, is it wrapped in a G element. For example, this expression:

```js
svg`
<circle cx=8 cy=4 r=4></circle>
<circle cx=8 cy=8 r=4></circle>
`
```

Is equivalent to this expression:

```js
svg`<g>
  <circle cx=8 cy=4 r=4></circle>
  <circle cx=8 cy=8 r=4></circle>
</g>`
```

If an embedded expression is a DOM element, it is embedded in generated SVG. If an embedded expression is an array, the elements of the array are embedded in the generated SVG.

### Markdown

<a href="#md" name="md">#</a> <b>md</b>(<i>strings</i>, <i>values…</i>)

```js
md`Hello, *world*!`
```

If an embedded expression is a DOM element, it is embedded in generated HTML. If an embedded expression is an array, the elements of the array are embedded in the generated HTML.

### TeX

<a href="#tex" name="tex">#</a> <b>tex</b>(<i>strings</i>, <i>values…</i>)

```js
tex`E = mc^2`
```

<a href="#tex_block" name="tex_block">#</a> tex.<b>block</b>(<i>strings</i>, <i>values…</i>)

Equivalent to [tex](#tex), but uses KaTeX’s display mode to produce a bigger block element rather than a smaller inline element.

```js
tex.block`E = mc^2`
```

### require

<a href="#require" name="require">#</a> <b>require</b>(<i>names…</i>)

Returns a promise of the [asynchronous module definition](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) (AMD) with the specified *names*, loaded from [unpkg](https://unpkg.com/). Each module *name* can be a package (or scoped package) name optionally followed by the at sign (`@`) and a semver range. For example, to load [d3-array](https://github.com/d3/d3-array):

```js
require("d3-array").then(d3 => {
  console.log(d3.range(100));
});
```

Or, to load [d3-array](https://github.com/d3/d3-array) and [d3-color](https://github.com/d3/d3-color) and merge them into a single object:

```js
require("d3-array", "d3-color").then(d3 => {
  console.log(d3.range(360).map(h => d3.hsl(h, 1, 0.5)));
});
```

Or, to load [d3-array](https://github.com/d3/d3-array) 1.1.x:

```js
require("d3-array@1.1").then(d3 => {
  console.log(d3.range(100));
});
```

See [d3-require](https://github.com/d3/d3-require) for more information.

<a href="#resolve" name="resolve">#</a> <b>resolve</b>(<i>name</i>)

Returns the resolved URL to require the module with the specified *name*.
