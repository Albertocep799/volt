# Blueprint: Volt Landing Page

## Overview

This document outlines the structure, design, and components of the Volt landing page, a modern and visually appealing single-page application built with React.

## Design and Style

- **Theme:** The design uses a bold and energetic theme with a primary color palette of black and yellow (`#FCBE03`), symbolizing electricity and power.
- **Typography:** A clean and modern sans-serif font is used for readability. Headings are larger and bolder to create a clear visual hierarchy.
- **Layout:** The layout is clean, with ample white space to improve readability and focus. Each section is clearly defined and separated.
- **Styling:** The project uses SCSS for styling, with each component having its own dedicated `.scss` file for a modular and maintainable structure.

## Project Structure

```
src/
|-- assets/
|-- components/
|   |-- Footer/
|   |   |-- Footer.scss
|   |   `-- Footer.tsx
|   `-- Header/
|       |-- Header.scss
|       `-- Header.tsx
|-- pages/
|   |-- FAQ/
|   |   |-- FAQ.scss
|   |   `-- FAQ.tsx
|   |-- Features/
|   |   |-- Features.scss
|   |   `-- Features.tsx
|   |-- Home/
|   |   |-- Home.scss
|   |   `-- Home.tsx
|   |-- HowItWorks/
|   |   |-- HowItWorks.scss
|   |   `-- HowItWorks.tsx
|   `-- Testimonials/
|       |-- Testimonials.scss
|       `-- Testimonials.tsx
|-- App.scss
|-- App.tsx
|-- main.tsx
```

## Components

### Header

- **File:** `src/components/Header/Header.tsx`
- **Description:** A sticky navigation bar at the top of the page.
- **Features:**
    - Displays the Volt logo.
    - Contains navigation links to different sections of the page (Home, Features, How It Works, Testimonials, FAQ).
    - Smooth scrolling to sections.

### Footer

- **File:** `src/components/Footer/Footer.tsx`
- **Description:** The footer at the bottom of the page.
- **Features:**
    - Copyright information.
    - Links to social media profiles.

## Pages (Sections)

### Home

- **File:** `src/pages/Home/Home.tsx`
- **Description:** The main hero section of the landing page.
- **Content:**
    - A compelling headline: "The Future of Energy is Volt".
    - A brief introductory paragraph.
    - A "Get Started" call-to-action button.

### Features

- **File:** `src/pages/Features/Features.tsx`
- **Description:** Highlights the key features of Volt.
- **Content:**
    - A section title.
    - A list of features, each with an image placeholder, title, and description.

### How It Works

- **File:** `src/pages/HowItWorks/HowItWorks.tsx`
- **Description:** Explains the process of using Volt in simple steps.
- **Content:**
    - A section title.
    - A series of steps, each with a number, title, and description.

### Testimonials

- **File:** `src/pages/Testimonials/Testimonials.tsx`
- **Description:** Showcases positive feedback from users.
- **Content:**
    - A section title.
    - A list of testimonials, each with a quote and the user's name.

### FAQ

- **File:** `src/pages/FAQ/FAQ.tsx`
- **Description:** Provides answers to frequently asked questions.
- **Content:**
    - A section title.
    - A list of questions and answers.
