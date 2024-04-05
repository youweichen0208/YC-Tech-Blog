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

A component controls a patch of screen called a view. It consists of a TypeScript class, an HTML template, and a CSS style sheet. The TypeScript class defines the interaction of the HTML template and the rendered DOM structure, while the style sheet describes its appearance.

### Component metadata

The `@Component` decorator identifies the class immediately below it as a component class, and specifies its metadata. The typescript class is not a component until we mark it as one with the `@Component` decorator. The metadata associates a template (html code) with the component. Together, the component and its template describe a view.

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

## Directives

Directives are a core feature of Angular. They are classes that add additional behavior to elements in our Angular applications. Directives allow us to create highly dynamic and responsive views. Use Angular's built-in directives to manage forms, lists, styles, and what users can see.

### **Component Directives**:

These are the most common type of directives and are essentially classes that are declared with the `@Component` decorator. Each component we create in Angular is a directive and can encapsulate its own view and logic.

### **Attribute Directives**:

Attribute directives listen to and modify the behavior of other HTML elements, attributes, properties, and components.

The most common attribute directives are as follows:

- **NgClass**
  Add or removes a set of CSS classes.

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

- **NgStyle**:
  Add or removes a set of HTML styles.

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

- **NgModel**:
  Adds two-way data binding to an HTML form element

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

- **Structural Directives**: These directives change the DOM layout by adding and removing DOM elements. These are responsible for HTML layout. Examples are the built-in `*ngFor` and `*ngIf` directives.

```html
<div *ngIf="showDiv">Only show if showDiv is true</div>
<div *ngFor="let item of items">{{ item }}</div>
```

### Structural directives:

Structural directives change the DOM layout by adding or removing DOM elements.

- **ngIf directive**

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

-- **ngFor directive**

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

## Services and Dependency Injection:

A service is typically a class with a narrow, well-defined purpose. It should so something specific and do it well.

Ideally, a component's job is to enable only the user experience. A component should present properties and methods for data binding to mediate between the view and the application logic.

A component should use services for tasks that don't involve the view or application logic. Services are good for tasks such as fetching data from the server, validating user input, or logging directly to the console. By defining such processing tasks in an **injectable service class**, we make those tasks available to any component.

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MyService {
  data = "Hello World";

  getData() {
    return this.data;
  }
}
```

```ts
import { Component } from "@angular/core";
import { MyService } from "./my.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  data: string;

  constructor(private myService: MyService) {
    this.data = myService.getData();
  }
}
```

## Dependency Injection:

Dependency injection is the part of the Angular framework that provides components with access to services and other resources. Angular provides the ability for us to inject a service into a component to give that component access to the service.

Add the `@Injectable()` decorator to a service class so that Angular can inject it into a component as a dependency.

```ts
@Injectable({providedIn: 'root'})
export class HeroService {
```

The `providedIn` property is part of the `@Injectable` decorator in Angular. It's used to specify where the service should be provided and instantiated.

## template variables

Templates variables help us use data from one part of a template in another part of the template. In the template, we use the hash symbol, `#`, to declare a template variable.

```html
<input #phone placeholder="phone number" />
```

```ts
<input #phone placeholder="phone number" />

<!-- lots of other elements -->

<!-- phone refers to the input element; pass its `value` to an event handler -->
<button type="button" (click)="callPhone(phone.value)">Call</button>
```

The template variable, `#phone`, declares a `phone` variable with the `<input>` element as its value.

## Angular Forms

Angular provides two different approaches to handling user input through forms: reactice and template-driven. Both capture user input events from the view, validate the user input, create a form model and data model to update, and provide a way to track changes.

### Template-driven Forms:

Template-driven forms are forms where we write the logic, validations, controls etc, for the form in the template part of the code (html code). The template is responsible for setting up the form, the validation, control, group etc. These forms rely on directives in the template to create and manipulate the underlying object model. They are useful for adding a smple form to an app, such as email list signup form, where the form is going to be static and does not require any change due to interaction.

### Reactive Forms:

Reactive forms on the other hand are forms where we define the structure of the form as well as logic, validation, controls, etc in the component class.

1. **Import ReactiveFormsModule:** First, we need to import `ReactiveFormsModule` in our module file (usually `app.module.ts`) and add it to the `imports` array:

```ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations: [AppComponent, SignupComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. **Create a `FormGroup` instance**:
   Create a `FormGroup` property in the component class and set the property to a new form group instance. To initialize the form group, provide the constructor with an object of named keys mapped to their control.

```ts
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern("^[a-zA-Z0-9]*$"),
    ]),
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    phone: new FormControl(""),
  });

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }
  onSubmit() {
    console.log(this.form.value);
  }
}
```

- Above code is the Reactive form validator example. To see the specific Angular Validator API, go to https://angular.io/api/forms/Validators

- To print the error msg if the validation fails, below is the code snippet of how to handle it in HTML.

```html
<div
  *ngIf="
        password?.errors?.['required'] && form.controls.password.touched
      "
  class="error-message"
>
  Password is required.
</div>
<div
  *ngIf="(form.controls.password.errors?.['minlength'] || form.controls.password.errors?.['maxlength'] || form.controls.password.errors?.['pattern'])&& form.controls.password.touched"
  class="error-message"
>
  Password needs to be 6-20 alphabet or numeric.
</div>
```

- In Angular, the `touched` property of a form control is a boolean that indicates whether the user has interacted with the control.

- In Angular's Reactive Forms, `form.controls` is a property that returns an object containing all the `FormControl` instances in the `FormGroup`.

- **Notice: In the `Validators` class in Angular, the methods for minimum and maximum length validation are `minLength` and `maxLenth`, respectively. However, when accessing these validation errors in the `errors` object of a form control, they are all lowercase: `minlength` and `maxlength`. When checking for these validation errors, we should use `form.controls.password.errors?.['minlength']` and `form.controls.password.errors?.['maxlength']`**

3. **Associate the `FormGroup` model and view**:
   A form group tracks the status and changes for each of its controls, so if one of the controls changes, the parent control also emits a new status or value change. The model for the group is maintained from its members. After we define the model, we must update the template to reflect the model in the view.

```ts
<form [formGroup]="profileForm">

  <label for="first-name">First Name: </label>
  <input id="first-name" type="text" formControlName="firstName">

  <label for="last-name">Last Name: </label>
  <input id="last-name" type="text" formControlName="lastName">

</form>
```

Just as a form group contains a group of controls, the profileForm `FormGroup` is bound to the `form` element with the `FormGroup` directive, creating a communication layer between the model and the form containing the inputs.

4. **Save from data**:
   The `ProfileEditor` component accepts input from the user, but in a real scenario we want to capture the form value and make it available for further processing outside the component. The `FormGroup` directive listens for the `submit` event emitted by the `form` element and emits an `ngSubmit` event that we can bind to a callback function. Add an `ngSubmit` event listener to the `form` tag with the `onSubmit()` callback method.

```ts
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
```

    The `onSubmit()` method in the `ProfileEditor` component captures the current value of `profileForm`. The following example uses `console.warn` to log a message to the browser console.

```ts
onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.profileForm.value);
}
```

## Routing in Angular

Routing in Angular is a mechanism to navigate between different views or components based on the browser's URL or user actions.

```ts
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ProductsComponent } from "./products/products.component";
const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "products/:category", component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

1. First, we need to import the `RouterModule` and `Routes` from `@angular/router`
2. Define the routes. Each route is an object with a `path` and a `component`
3. Call `RouterModule.forRoot()` and include the result in our application module's `imports` array.
4. Use the `<router-outlet>` directive to indicate where the router should display the components for each route.

```html
<a [routerLink]="['/first-component']">Go to First Component</a>
<a [routerLink]="['/second-component']">Go to Second Component</a>
```

5. To navigate to a route, use the `[routerLink]` directive

## HttpClient

The `HttpClient` is a built-in service in Angular for making HTTP requests. It's part of the `HttpClientModule`.

1. **Import the `HttpClientModule` in our `app.module.ts`**

```ts
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    // other imports...
    HttpClientModule,
  ],
})
export class AppModule {}
```

2. Inject the `HttpClient` in our service:

```ts
@Injectable({
  providedIn: "root",
})
export class AccountService {
  private url = "https://localhost:7257";
  constructor(private http: HttpClient) {}
  signup(user: any) {
    return this.http.post(`${this.url}/signup`, user);
  }
}
```

- `@Injectable` means the service is injectable that it can be injected into other classes (like components or other services).
- The `constructor` of the class injects Angular's `HttpClient` service, which is used to make HTTP requests.
- The `signup` method takes a `user` object as a parameter and sends a POST request to the `/signup` endpoint on the backend server.

3. Inject the Service class in the Component class:

```ts
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  constructor(private accountService: AccountService) {}

  onSubmit() {
    if (this.form.valid) {
      let firstName: string = this.form.value.firstname as string;
      let lastName: string = this.form.value.lastname as string;

      // Capitalize first letter of first name
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

      // Capitalize first letter of last name
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      let user: User = {
        name: firstName + " " + lastName,
        email: this.form.value.email as string,
        password: this.form.value.password as string,
        phone: this.form.value.phone as string,
      };

      this.accountService.signup(user).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(this.form.value);
    }
  }
}
```
