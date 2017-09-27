# Visa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2.

## Assumption

Some assumptions & information about the application:

- Prize API data is stored in localStorage to improve experience. Assuming that Nobel Prize is a yearly event, a timer can be included to fetch & refresh this data once a year.
- Laureate API data is too big to be downloaded in one go, so it's always fetched everytime user visit the laureate detail page. Turns out extra parameters can be added to the Laurete API to fetch a single user.
- Prizes are grouped by 10 years. It gives a sense of information for user, rather than just 1-2-3.. paging or lazy-loading by scrolling. Additionally, the number of laureates per year are not that many and can be displayed on both desktop & small screen devices nicely.
- Responsive design is managed by Bootstrap 4. Font-Awesome is used for the icons. For production, these libraries can be packaged together with the app assets instead of getting it from the CDN. A package management like Bower or Webpack can be used for this purpose.

## Installation

Installation steps:

1. Create a folder, say "visa", and clone the repository there: git clone https://github.com/isteven/visa.git
2. Go to that "visa" folder, open a terminal, and run "npm install"

To run it, see the **Development server** part below.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
