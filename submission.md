# Project Submission Report

## 1. Student Details

- **Full Name:** Ian Chomba
- **GitHub Username:** ianchomba1
- **Email:** ianchomba88@gmail.com

---

## 2. Deployed Project Link

- **Live GitHub Pages URL:** https://is-project-2026.github.io/onlineshop-168865/

---

## 3. Reflection — Grounded in Your Git History

### A. Your Best Commit

- **Commit URL:** https://github.com/IS-PROJECT-2026/onlineshop-168865/commit/63336efc0a4f122490d9f9daf41c00079e20d411
- **Why this one?** This commit strictly adheres to conventional commit standards with a concise scope tag `feat(products)`, detailing the 9 artisanal product objects across 6 categories added to the catalog dataset without introducing scope creep.

### B. A Mistake or Struggle

- **Link to the evidence:** https://github.com/IS-PROJECT-2026/onlineshop-168865/pull/3
- **What happened and how did you recover?** Attempting a direct push to `main` was blocked by GitHub repository branch protection rules. I recovered by creating an issue-linked feature branch (`feat/3-render-product-grid`), staging the grid rendering changes, opening a Pull Request, and resolving the branch protection requirement through the PR workflow.

### C. A Pull Request You're Proud Of

- **PR URL:** https://github.com/IS-PROJECT-2026/onlineshop-168865/pull/6
- **What did you check before merging?** Before merging, I verified that the in-memory cart state logic in `js/cart.js` strictly addressed issue #6, tested that `addToCart()` correctly updated the header cart badge counter across DOM elements, and ensured no unneeded styling or HTML changes were included.

### D. One Thing You Would Do Differently

- **What would you change?** I would establish strict branch naming guidelines in the project board before starting development, ensuring branch names and issue numbers strictly align across all features to prevent duplicate branch names during rapid iteration.
- **Link to the evidence of the original decision:** https://github.com/IS-PROJECT-2026/onlineshop-168865/branches

---

## 4. Screenshots of Key GitHub Features

### A. Milestones and Issues
*Provide a screenshot showing your active milestone(s) and the granular tracking issues linked directly to them.*

![Milestones and Issues Screenshot](./evidence/milestones.png)


* **Caption:** GitHub Milestones tracking Phase 1, Phase 2, and Phase 3 development issues.

### B. Project Board
*Provide a screenshot of your GitHub Project Board with your issues organized dynamically across columns (To Do, In Progress, Done).*

![Project Board Screenshot](./evidence/project_board.png)

* **Caption:** Kanban Project Board managing issue progression across To Do, In Progress, and Done columns.

### C. Branching Architecture
*Provide a screenshot showing your local or remote Git branch list, highlighting your use of conventional, issue-linked naming patterns (e.g., `feat/`, `fix/`, `style/`).*

![Branching Architecture Screenshot](./evidence/branch_list.png)

* **Caption:** Branch architecture demonstrating `feat/`, `style/`, and `fix/` issue-linked conventions.

### D. Pull Requests & Traceability
*Provide a screenshot of a completed or open Pull Request (PR) on GitHub that clearly shows it is linked to a related development issue.*

![Pull Request Traceability Screenshot](./evidence/pull_request.png)

* **Caption:** Pull Request demonstrating issue linkage and automated closing of linked milestones.

---

## 5. Merge Conflict Evidence

---

### Conflict 1 — Full Chronology

**What cause did you use?** Concurrent line modification 

#### Step 1: Generating the Clash
*Screenshot showing the merge attempt and the conflict warning.*

![Attempted Merge Warning](./evidence/conflict_evidence_1_merge.png)

* **Caption:** Merging branch `main` (containing font-size: 2.8rem) into branch `conflict-b` (containing font-size: 3.2rem) resulted in an immediate content merge conflict in `css/style.css`.

#### Step 2: Inside the Code Editor (Conflict Markers)
*Screenshot showing the raw, unresolved conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) in your editor.*

![Raw Conflict Markers](./evidence/conflict_evidence_1.png)

* **Caption:** The raw conflict markers in `css/style.css` show the clash between HEAD (`font-size: 3.2rem`) and main (`font-size: 2.8rem`).

#### Step 3: Resolution & Clean Merge
*Screenshot of your clean Git history or completed PR showing the conflict was resolved and merged.*

![Clean Resolution](./evidence/conflict_evidence_1_resolved.png)

* **Caption:** The conflict was resolved by picking `font-size: 3rem;`, removing all conflict markers, committing the fix, and merging into `main`.

---

### Conflict 2 — Different Cause

**What cause did you use?** Concurrent conflicting updates on renamed file path

**Why does this cause trigger a conflict?** When a file is renamed and modified with conflicting values on two separate branches, Git's merge engine flags a content conflict because the state on both branches cannot be auto-merged.

![Conflict 2 Markers](./evidence/conflict_evidence_2.png)

* **Caption:** Merge conflict in `js/cart_store.js` caused by conflicting `STORAGE_KEY` values (`v3` vs `v2`) across renamed branches.

---

### Conflict 3 — Different Cause

**What cause did you use?** Delete vs. Modify conflict

**Why does this cause trigger a conflict?** One branch deleted `about.html` while another branch modified content inside `about.html`. Git cannot determine whether to preserve the modified file or delete it, forcing a manual resolution.

![Conflict 3 Markers](./evidence/conflict_evidence_3.png)

* **Caption:** Delete/Modify conflict on `about.html` where `conflict-e` deleted the file while `conflict-f` modified .

---


