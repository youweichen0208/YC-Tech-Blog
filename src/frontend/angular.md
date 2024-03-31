---
icon: pen-to-square
date: 2024-03-28
category:
  - frontend
tag:
  - HTML
---

# Angular

Angular is a popular open-source web application framework developed by Google. It's used for building single-page applications (SPAs), which are web applications or websites that interact with user by dynamically rewriting the current web page with new data from the web server, instead of the default method of the browser loading entire new pages.

Angular uses TypeScript, a statically typed superset of JavaScript, as its primary language. It provides a way to organize code using components and modules, making it a good choice for large-scale applications.

## Install Angular CLI

We can install Angular CLI globally on our machine using npm:

```text
npm install -g @angular/cli
```

We can verify the installation by checking the version of Angular CLI:

```
ng --version
```

Now we are ready to create a new Angular application using the `ng new` command:

```
ng new my-angular-app --no-standalone
```

To run our Angular application, we can use the `ng serve` command in our terminal.

```
ng serve
```

## Root module - app.module.ts

The `app.module.ts` file is the root module of an Angular application. It's where we declare which components, directives, and pipes belong to the application. It's also where we specify and register which other modules to use, such as modules from the Angular library or our own custom modules.

## Component

### Create a new component in Angular using CLI

```
ng g c component_name
```

### xxx.component.ts

The TypeScript class file `xxx.component.ts` for an Angular component serve as the initialization and configuration for the component. It's where we define the component's data(properties) and behavior (methods), and it's also where we specify metadata for the component, such as its selector and the paths to its template and style files.

```ts
@Component({
  selector: "app-servers",
  styleUrl: "./servers.component.css",
})
export class ServersComponent {}
```

- `@Component({})` a decorator that marks the class as an Angular component and provides meta data about the component.
- `selector: 'app-servers'`: This is the CSS selector that Angular will use to identify this component in the templates. We can use `<app-servers></app-servers>` in our HTML to include this component.
- `styleUrl: './servers.component.css'`: Thisis the path to the CSS file that contains styles for this component.

### Register the custom components:

We should first register components before using it in other components.

```typescript
@NgModule({
  declarations: [AppComponent, ServerComponent, ServersComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**The component must be declared in an NgModule using the `declarations` array, and if we want to use it in another module, it must also be added to the `exports` array.** we register `ServerComponent` here in `app.module.ts` file.

### Using the Component

```ts
<h1>Hi I am in the App component</h1>
<hr />
<app-server></app-server>
```

After registering it, we can call Server component `<app-server> </app-server>` anywhere in the different components html file in the same module.

## Data binding:

### String Interpolation

String interpolation in Angular is a one-way data binding technique used to output data from our TypeScript code into the HTML view. We can display the data properties of a class in an Angular component's template. Angular uses double curly braces `{{}}` to bind data in one direction, from our TypeScript code to the HTML template.

```ts
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "Hello Angular";
}
```

```html
<!-- app.component.html -->
<h1>{{ title }}</h1>
```

In this example, `{{title}}` in the HTML is replaced by the value of the `title` property from the TypeScript code.

```ts
@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = "offline";

  getServerStatus() {
    return this.serverStatus;
  }
}
```

```html
<p>Server id {{ serverId }} is {{ getServerStatus() }}</p>
```

### Property Binding

Property binding in Angular is a one-way data binding technique from the component to the view. It binds a DOM property (like `value`, `disabled`, `src`) to a property defined in the component's TypeScript code.

```ts
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  isDisabled = true;
}
```

```html
<!-- app.component.html -->
<button [disabled]="isDisabled">Click me</button>
```

In this example, the `disabled` attribute of the button is bound to the `isDisabled` property in the component. The button will be disabled because `isDisabled` is `true`.

The syntax for property binding is square brackets `[ ]` around the property name on the left-hand side of an assignment. The right-hand side of the assignment is the name of the property in the component.

### Event binding

Event binding in Angular is a one-way data binding from the view to the component. It's used to respond to user actions like clicks, key presses, mouse movements, etc.

We bind a DOM event to a method defined in our component's TypeScript code. When the event is triggered, the associated method is executed.

```ts
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  clickMessage = "";

  onClickMe() {
    this.clickMessage = "You clicked the button!";
  }
}
```

```html
<!-- app.component.html -->
<button (click)="onClickMe()">Click me</button>
<p>{{ clickMessage }}</p>
```

In Angular, the `(click)` syntax is used specifically for click events. In this example, the `(click)` event on the button is bound to the `onClickMe()` method in the component. When the button is clicked, `onClickedMe()` is executed, updating `clickMessgae` which is then displayed in the view.

#### Passing and using data with event binding

In Angular, we can pass data from our view to our component when an event is triggered. This is often done by passing the event object, but we can also pass other data.

```ts
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  items = ["Item 1", "Item 2", "Item 3"];

  onClick(item: string) {
    console.log(item);
  }
}
```

```html
<!-- app.component.html -->
<div *ngFor="let item of items" (click)="onClick(item)">{{ item }}</div>
```

In this example, when an item is clicked, the `onClick` method is called with the clicked item.

## Two way binding in Angular

Two-way data binding in Angular is a mechanism to synchronize the model and the view. Changes in the model update the view, and changes in the view update the model. Angular provides the `[(ngModel)]` directive for two-way data binding. To use `[(ngModel)]`, we need to import `FormsModule` from `@angular/forms` in our module.

```ts
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  name = "";
}
```

```html
<!-- app.component.html -->
<input [(ngModel)]="name" placeholder="Enter name" />
<p>Hello {{ name }}</p>
```

In this example, the `input field` and the `p` tag are bound to the `name` property of the component. When we type in the `input` field, the `name` property is updated, and the updated `name` is displayed in the `p` tag.

## Directives

Directives are a core feature of Angular. They are classes that can manipulate the DOM by changing its layout or behavior. Directives allow us to create highly dynamic and responsive views.

- **Component Directives**: These are the most common type of directives and are essentially classes that are declared with the `@Component` decorator. Each component we create in Angular is a directive and can encapsulate its own view and logic.

- **Attribute Directives**: These directives change the appearance or behavior of a DOM element, component, or another directive.

- **Structural Directives**: These directives change the DOM layout by adding and removing DOM elements. These are responsible for HTML layout. Examples are the built-in `*ngFor` and `*ngIf` directives.

```html
<div *ngIf="showDiv">Only show if showDiv is true</div>
<div *ngFor="let item of items">{{ item }}</div>
```

### ngIf directive

The `*ngIf` directive in Angular is used to conditionally include or exclude a block of HTML from the DOM. The `*ngIf` directive is commonly used to output data conditionally based on the state of the component.

```ts
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  showDiv = true;
}
```

```html
<div *ngIf="showDiv; else elseBlock">
  This div is visible because showDiv is true
</div>
<ng-template #elseBlock
  ><div>This div is visible because showDiv is false</div></ng-template
>
```

In this example, if `showDiv` is `true`, the first `div` is displayed. If `showDiv` is `false`, the `div` inside the `ng-template` with the `#elseBlock` reference is displayed.

### ngStyle directive

The `ngStyle` directive in Angular is used to set CSS styles conditionally. It allows us to set CSS styles dynamically, based on the conditions defined in our component.

```ts
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  isSpecial = true;
}
```

```html
<!-- app.component.html -->
<div [ngStyle]="{'color': isSpecial ? 'red' : 'black'}">
  This text is red if isSpecial is true, otherwise it's black
</div>
```

In this example the color of the text in the `div` is red if `isSpecial` is `true`, and black if `isSpecial` is `false`.

### ngClass directive

The `ngClass` directive in Angular is used to dynamically add or remove CSS classes on an HTML element. It's a powerful way to apply styles conditionally.

```ts
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  isSpecial = true;
}
```

```html
<!-- app.component.html -->
<div [ngClass]="{'special': isSpecial}">
  This div has the 'special' class if isSpecial is true
</div>
```

In this example, the `div` will have the `special` class if `isSpecial` is `true`. If `isSpecial` is `false`, the `special` class will be removed. The `ngClass` directive is a good way to set classes dynamically, but for static classes, it's usually better to use the standard `class` attribute.

### ngFor directive

The `*ngFor` directive in Angular is a structural directive that is used for rendering a list of items. It's similar to a `for` loop in JavaScript.

```ts
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  items = ["Item 1", "Item 2", "Item 3"];
}
```

```html
<!-- app.component.html -->
<div *ngFor="let item of items">{{ item }}</div>
```

In this example, the `*ngFor` directive iterates over the `items` array from the component. For each item in the array, it creates a new `div` and sets the content of the `div` to the item.
