# 🧵 Stickwerk-Studio
**Fäden, die Marken sichtbar machen.**

Stickwerk-Studio is a professional, modern platform dedicated to high-quality machine embroidery, custom patches, and textile branding for the DACH region. This project combines a seamless customer experience with a powerful administrative backend to streamline the production of custom textiles.

---

## ✨ Key Features

### 🎨 For Customers
- **Interactive Patch Calculator**: A non-technical, user-friendly tool for instant pricing estimates based on size, complexity, and quantity.
- **Custom Design Upload**: Easy interface for submitting logos and design specifications.
- **Modern UX/UI**: A clean, professional aesthetic reflecting the craftsmanship of the studio.

### 🛠 For Administration
- **Lead Management Pipeline**: A structured workflow to track custom requests from initial inquiry to final production.
- **Order Orchestration**: Centralized management of production queues and customer communications.
- **GDPR Compliant**: Built with privacy by design to ensure data security within the EU.

---

## 🚀 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) | React framework with App Router for optimal performance. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Static typing for scalable and maintainable code. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS for a modern, responsive design. |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Robust relational database for order and lead storage. |
| **ORM** | [Prisma](https://www.prisma.io/) | Type-safe database client for efficient queries. |
| **Infrastructure** | [Docker](https://www.docker.com/) | Containerized environment for consistent deployment. |

---

## 🛠 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/tolgaguensal-lab/stickwerk-studio.git
   cd stickwerk-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   Create a `.env` file based on the project requirements:
   - `DATABASE_URL`: PostgreSQL connection string.
   - `NEXTAUTH_SECRET`: Random string for session encryption.

4. **Spin up the infrastructure:**
   ```bash
   docker-compose up -d
   ```

5. **Run migrations:**
   ```bash
   npx prisma migrate dev
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 📅 Roadmap
- [ ] Finalize the Patch Calculator algorithm.
- [ ] Implement the Lead Management dashboard.
- [ ] Integrate automated email notifications for new leads.
- [ ] Full GDPR audit and compliance documentation.

---

© 2026 Stickwerk-Studio. All rights reserved.
