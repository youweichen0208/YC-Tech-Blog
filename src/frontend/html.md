---
icon: pen-to-square
date: 2024-03-04
category:
  - frontend
tag:
  - HTML
---

# HTML

## What is HTML

HTML stands for HyperText Markup Language. It's the standard markup language for creating web pages and web applications.

## Lists:

### Lists (Unordered list):

- An unordered list starts with the `<ul>` tag. Each list item starts with the `<li>` tag.

```html
<ul style="list-style-type: circle">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

### Lists (ordered list):

- The type attribute of the `<ol>` tag, defines the type of the list item marker

```html
<ol type="A">
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ol>
```

### Break

- Line breaks `<br/>` allow us to decide where the text will break on a line or continue to the end of the window.
- A `<br/>` is an empty element, meaning it may contain attributes but it does not contain content.
- The `<br/>` element does not have a closing tag.

```html
<p>
  This is a test page to check if the server is running.
  <br />
  If you see this page, it means that the server is running.
</p>
```

### Horizontal Rule

- The `<hr/>` element causes the browser to display a horizontal line in our document
- `<hr/>` is an empty element and does not use a closing tag.

```html
<p>
      This is a test page to check if the server is running.
      <hr />
      If you see this page, it means that the server is running.
</p>
```

## Span

- `<span>...</span>` is a inline tag.
- It is used to format small chunks of data within another element.
- Combining `<span>` tag with CSS allow us to create custom tags.

```html
<p>
  <strong>Inline Element</strong>
  <em>Inline Element</em>
  <span>Inline Element</span>
</p>
```

### More Inline Element

```html
<p>
  <strong>Inline Element</strong>
  <em>Inline Element</em>
  <span>Inline Element</span>
</p>
```

## Tables

- The `<table> </table>` element has four sub-elements
- Table Row `<tr></tr>`
- Table Header `<th></th>`
- Table Data `<td></td>`
- The table row elements usually contain table header elements or table data elements

```html
<table border="1" width="50%">
  <caption>
    <h1>Square Parts</h1>
  </caption>
  <tr>
    <th>Stock Number</th>
    <th>Description</th>
    <th>List Price</th>
  </tr>
  <tr>
    <td bgcolor="red">3476-AB</td>
    <td>76mm Socket</td>
    <td>45.00</td>
  </tr>
  <tr>
    <td>3478-AB</td>
    <td style="color: blue">78mm Socket</td>
    <td>47.50</td>
  </tr>

  <tr>
    <td>3480-AB</td>
    <td>80mm Socket</td>
    <td>50.00</td>
  </tr>
</table>
```

- The `border` attribute sets the border thickness, and the `width` attribute sets the width of the table.
- `<caption>`: this tag defines the title of the table.
- `<td>`: this tag defines a table data cell. The `bgcolor` attribute is used to set the background color of a cell.

## Form

- Form elements have properties: text boxes, password boxes, checkboxes, radio buttons, submit, reset, file, hidden and image.
- The properties are specified in the TYPE attribute of the HTML element `<input></input>`

### Form Element's attributes:

- `ACTION`: the `URL` of the web application that is going to accept the data from the form, process it, and send a response back to the browser.
- `METHOD`: `GET` or `POST` specifies which HTTP method will be used to send the form's contents to the web server. The web application should be written to accept the data from either method.
- `NAME`: a form name used by VBScript or JavaScripts.
- `TARGET`: the target frame where the response page will show up.

### `<input>` element properties

- `type`: type of INPUT entry field
  - `type=text`: used to provide input fields for text, phone numbers, dates, etc.
  - `type=password`: used to allow entry of passwords
  - `type=hidden`: used to send data to the web application that we don't want the web surfer to see, change, or have to enter but is necessary for the application to process the form correctly.
  - `type=checkbox`: check boxes allow the users to select more than one option.
  - `type=radio`: radio buttons allow the users to select only one option.
  - `type=button`: type button would be always used with JavaScript to cause an action to take place.
  - `type=submit`: type submit causes the browswer to send the names and values of the other elements to the web Application specified by the ACTION attribute of the FORM element.
  - `type=reset`: it allows the user to clear all the input in the form.
  - `type=file`: we can use a file upload to allow the user to upload files to our web server.
- `name`: variable name passed to web application
- `value`: the data associated with the variable name to be passed to the web application
- `checked`: button/box checked
- `size`: number of visible characters in text field
- `maxlength`: maximum number of characters accepted

### Difference between `input=submit` and `input=button`:

- **Submit button** is added for a form. When submit is clicked it triggers to the address written in the `action` attribute of form element.

- **Button** can be used anywhere as a general purpose. It can be used to redirect to any link and not restricted to a form action.
