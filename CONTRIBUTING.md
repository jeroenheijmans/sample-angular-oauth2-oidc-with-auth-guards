# How to contribute

Thanks for taking the time to help out with this example.
Here's some rough, basic guidance for contributing.

## General guidelines

Contributions are much welcomed!
This is only a small project (intentionally!) and as such there are only _rough_ guidelines:

- **Scope is intentionally small**: please be aware that we might not include contributions, even if they are good, if they increase scope of this repository too much.
- **Open an issue first**: if you want to fix or add something, consider opening up an issue first, so we can coodinate efforts, and prevent unneeded work (see previous point).

In short: propose your idea or bug to fix, and then we'll get it rolling.

## Where to begin?

There's little to no documentation for this project.
This is _intentional_ though: the source code _is_ the documentation here.
You're meant to go through all the files (at least the `/src` files) to learn what it's about.
So that's also what's likely needed if you want to contribute something.

Beyond that (reading the code), there's not much to it.
Typical flow for doing a fix or addition would be:

1. Read through the code
2. Open an issue to propose your fix or addition
3. Prepare the change
   1. Fork the repository
   2. Clone it on your computer
   3. Create a branch (e.g. `100-fix-bug-with-safari-cookies`)
   4. YOUR CHANGES HERE
   5. Run `ng e2e` and `ng lint`, please
   6. Manually check if things work (`ng serve`)
   7. Push your branch to your fork
4. Open a PR (e.g. from your fork's home page)

And we should be good to go!
