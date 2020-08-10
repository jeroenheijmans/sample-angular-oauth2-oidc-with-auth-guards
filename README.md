# Example angular-oauth2-oidc with AuthGuard

This repository shows a basic Angular CLI application with [the `angular-oauth2-oidc` library](https://github.com/manfredsteyer/angular-oauth2-oidc) and Angular AuthGuards.

[![Lint-Build-Test GitHub Actions Status](https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/workflows/Lint-Build-Test/badge.svg)](https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/actions)

## ⚠ Third-party Cookies

Browser vendors are implementing increasingly strict rules around cookies.
This is increasingly problematic for SPA's with their Identity Server on a third-party domain.
Most notably **problems occur if the "silent refresh via an iframe" technique is used**.

This repository uses that technique currently, [starting with a `silentRefresh()`](https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/blob/36316ee1971a8a8160033f55ba7eabe14f7d3add/src/app/core/auth.service.ts#L106-L109).
This will fire up an iframe to load an IDS page with `noprompt`, hoping cookies get sent along to so the IDS can see if a user is logged in.

[Safari will block cookies from being sent](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/), prompting a leading OAuth/OpenID community member to write "[SPAs are dead!?](https://leastprivilege.com/2020/03/31/spas-are-dead/)".
In fact, if you fire up this sample repository on `localhost`, which talks to `demo.identityserver.io` (another domain!), and use it in Safari: you will notice that the silent refresh technique already fails!

For further thoughts, see [issue #40](https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/issues/40).

## Features

⚠ To see **the Implicit Flow** refer to [the `implicit-flow` branch](https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/tree/implicit-flow) (which might be getting outdated, since Code Flow is now the recommended flow).

This demonstrates:

- Use of **the Code+PKCE Flow** (so no JWKS validation)
- Modules (core, shared, and two feature modules)
- An auth guard that forces you to login when navigating to protected routes
- An auth guard that just prevents you from navigating to protected routes
- Asynchronous loading of login information (and thus async auth guards)
- Using `localStorage` for storing tokens (use at your own risk!)
- Loading IDS details from its discovery document
- Trying refresh on app startup before potientially starting a login flow
- OpenID's external logout features

Most interesting features can be found in [the core module](./src/app/core).

## Implicit Flow

If you need an example of the _Implicit Flow_ check out [the last commit with that flow](https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/commit/3c95d8891b4c086d5cd109d05cdd66171ef4b960) or even earlier versions.
For new applications Code+PKCE flow is recommended for JavaScript clients, and this example repository now demonstrates this as the main use case.

## Usage

This repository has been scaffolded with the Angular 5 CLI, then later upgraded to newer versions of the Angular CLI.
To use the repository:

1. Clone this repository
1. Run `npm install` to get the dependencies
1. Run `ng serve --open` to get it running on [http://localhost:4200](http://localhost:4200)

This connects to the [demo IdentityServer4 instance](https://demo.identityserver.io/) also used in the library's examples.
The **credentials** and ways of logging in are disclosed on the login page itself (as it's only a demo server).

You could also connect to your own IdentityServer by changing `auth-config.ts`.
Note that your server must whitelist both `http://localhost:4200/index.html` and `http://localhost:4200/silent-refresh.html` for this to work.

## Example

The application is supposed to look somewhat like this:

![Application Screenshot](screenshot-001.png)
