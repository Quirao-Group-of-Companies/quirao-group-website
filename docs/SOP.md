# Standard Operating Procedures

This document contains the standard operating procedures for the development team of this website. The SOP followed is currently for under developmnent. SOP for maintenance and feature addition may change in the future.

## Pipeline

Every piece of work on this website follows a fixed pipeline. Each stage depends on the one before it, so skipping ahead creates rework and misalignment down the line.

```
Content  →  Design  →  Design Approval  →  CMS Components Generation  →  Frontend Development
```

### 1. Content
**What it is:** Finalizing all copy, page structure, and messaging before any design work begins.

**Why it matters:** Design should frame the content — not the other way around. Starting design without settled content leads to layouts that break when the real words go in.

**Example:** Before designing a "Services" page, the team agrees on how many services are listed, what each headline and description says, and whether there's a CTA button. Only then does the designer start.

---

### 2. Design
**What it is:** Creating the visual layout and component designs based on the finalized content.

**Why it matters:** This is where all decisions about look, feel, spacing, and structure are made. Changes are cheap at this stage — they get expensive once developers are involved.

**Example:** The designer builds out the Services page in Figma, showing exactly how the service cards look on desktop and mobile.

---

### 3. Design Approval
**What it is:** A required review and sign-off before any development begins.

**Why it matters:** This is the gate between planning and building. It ensures everyone is aligned and nothing moves forward that hasn't been approved. No CMS work or frontend code starts until this step is done.

**Example:** The Services page design is shared with Norbs. Feedback is addressed, and explicit approval is given before developers begin.

> [!NOTE]
> Mr. Norberto S. Pingoy is the contact person for design approval under the development stage.

---

### 4. CMS Components Generation
**What it is:** Building out the CMS schema and components that content editors will use to manage the page.

**Why it matters:** The CMS structure must match both the content model from Step 1 and the design from Step 2. Getting this right means content editors can update the site independently without needing a developer.

**Example:** A "Service Card" component is created in the CMS with fields for title, description, icon, and CTA link — matching exactly what the design requires.

---

### 5. Frontend Dev
**What it is:** Implementing the approved design in code, connected to the CMS components.

**Why it matters:** Frontend is the execution phase. The design is the source of truth — the job here is to build it accurately, not to reinterpret it.

**Example:** The developer builds the Services page using the CMS Service Card component, matching the Figma design pixel-for-pixel across desktop, tablet, and mobile.

---

## Coding Principles

### DRY — Don't Repeat Yourself

> If something is written more than once, it should be a shared component or utility instead.

**What it means:** When the same piece of content, logic, or styling appears in multiple places, any future change has to be made in every single one of those places. That's slow, error-prone, and easy to miss. DRY means centralizing things so a change only ever needs to happen once.

**Example:** Instead of building a "card" layout separately for the Blog page, the Services page, and the Team page — one shared Card component is built and reused across all three. If the card design changes, it's updated in one place and reflected everywhere automatically.

> [!TIP]
> When developing visual components, we recommend making variant components to further reinforce the DRY principle.

---

### SRP — Single Responsibility Principle

> Each component or piece of code should do one job and do it well.

**What it means:** When something tries to do too many things at once, it becomes hard to understand, hard to change, and easy to break. Keeping responsibilities small and focused means each piece of the site is easier to work with.

**Example:** A `HeroSection` component should handle displaying the hero — headline, subtext, background image, and CTA. It should not also be responsible for fetching blog posts or deciding what page the user is on. Those are separate jobs for separate components.

---

### Completeness with Design

> The finished website must match the approved design — not roughly, exactly.

**What it means:** The design file is the agreed-upon outcome. A page isn't done just because it's "close." Spacing, font sizes, colors, button styles, hover effects, and edge cases (like what a card looks like with a very long title) all matter and all need to be checked.

**Example:** If the design shows a section with 48px of padding above the heading and a specific shade of blue for the CTA button, those details are implemented as specified — not approximated. If something in the design is unclear or seems impractical to build, it gets flagged and discussed rather than quietly skipped.

---

### Responsiveness

> Every page must look and work correctly on mobile, tablet, and desktop.

**What it means:** Most website visitors are on mobile. A page that only works on desktop is an incomplete page. Responsiveness is treated as a core requirement, not an optional extra added at the end.

**Example:** The Services page is tested at three sizes — mobile (375px), tablet (768px), and desktop (1280px). On mobile, the service cards stack vertically and the text remains readable without zooming. Images resize properly and nothing overflows the screen.

---

## Summary

| Principle | What it means in one line |
|-----------|--------------------------|
| Development Structure | Content → Design → Norbs approval → CMS → Frontend, always in this order |
| DRY | Don't build the same thing twice — make it reusable |
| SRP | Each component does one job, not many |
| Design Completeness | Build what was approved, flag anything unclear |
| Responsiveness | Works correctly on all screen sizes, every time |