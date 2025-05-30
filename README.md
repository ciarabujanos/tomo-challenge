# Spice Blend Challenge

## Overview

This challenge involved building a responsive, accessible frontend UI to manage "spices" and "blends" with support for nested relationships, search, adding a new blend, and detail pages. The project is implemented using React, TypeScript, Tailwind CSS, and React Router.

It showcases scalable frontend architecture, thoughtful UX, reusable component design, and a recursive algorithm for handling nested blends.

## Demo Video

👉 [Watch the demo walkthrough](https://drive.google.com/file/d/1IqvB2nDcNYkV5K3oZjlA4EwE2RCgygsd/view?usp=sharing)

## UI/UX

- Tabbed interface to toggle between Spices and Blends
- Responsive grid layout for all screen sizes
- Multi-select dropdowns for blend creation using react-select
- Modal for creating new blends
- Loader and error handling for async fetches
- No-results feedback message when search yields nothing

## Data Handling

- Recursive utility function getAllSpicesFromBlend() to gather all direct and nested spices in a blend
- Filters out duplicates and handles arbitrarily nested blend structures
- Uses React Router location.state to share state between pages and avoid redundant API calls
- Ability to add and view a new blend

## Accessibility

- Semantic HTML with proper heading levels
- Added aria-label, role="alert", and keyboard-friendly interactions
- Focus states and visible labels
- Accessible modal and error banner components

## Developer Experience

- Fully typed with TypeScript
- Modular component-based file structure
- Custom reusable components: CatalogCard, MultiSelect, ErrorBanner, DetailsCard, SpinnerLoader
- Unit tests using Vitest and React Testing Library

## Folder Structure

```
  /src
  /assets
  /components
    AddBlendsForm/
    CatalogCard/
    DetailsCard/
    ErrorBanner/
    MultiSelect/
    SpinnerLoader/
  /containers
    SpiceCatalogContainer/
  /mocks
    data/
  /pages
    Blends/
    Home/
    Spices/
  /types
    index.ts
  App.tsx
```

## Installation & Setup

```
git clone https://github.com/ciarabujanos/tomo-challenge.git
cd tomo-challenge
npm install
npm run dev
```

## Running tests

`npm run test`

## Author

Ciara Bujanos
