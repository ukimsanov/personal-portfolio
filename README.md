# Personal Portfolio

A modern, responsive personal portfolio website built with Next.js, featuring a dark theme, smooth animations, and a contact form with database integration.

## 🚀 Features

- **Modern Dark Design** - Clean, professional dark theme with subtle neon accents
- **Responsive Layout** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - Powered by Framer Motion with reduced motion support
- **Interactive Contact Form** - With form validation, Turnstile captcha, and database storage
- **Skills Showcase** - Dynamic skill badges with subtle neon glow effects
- **Project Gallery** - Showcase of featured projects with live links
- **Performance Optimized** - Fast loading with Next.js optimizations
- **Accessibility First** - ARIA labels, keyboard navigation, and screen reader support

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Geist Font](https://vercel.com/font)** - Modern typography

### Backend & Database
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Serverless backend
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)** - SQLite database
- **[Turnstile](https://developers.cloudflare.com/turnstile/)** - CAPTCHA protection

### Deployment
- **[OpenNext](https://opennext.js.org/)** - Cloudflare deployment adapter
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - Cloudflare CLI

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   │   └── contact/    # Contact form handler
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── ContactForm.tsx # Contact form with validation
│   ├── Header.tsx     # Navigation header
│   ├── Hero.tsx       # Hero section
│   ├── Projects.tsx   # Projects showcase
│   ├── Skills.tsx     # Skills with neon badges
│   └── ...
├── data/              # Data and content
│   └── resume.ts      # Portfolio data
├── lib/               # Utilities
│   └── utils.ts       # Helper functions
└── types/             # TypeScript definitions
```


## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for FCP, LCP, and CLS
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Images**: Next.js Image component with lazy loading

## 🛡️ Security Features

- **CAPTCHA Protection**: Turnstile integration for contact form
- **Input Validation**: Server-side validation for all form inputs
- **Rate Limiting**: Built-in protection against spam
- **SQL Injection Protection**: Parameterized queries with D1

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
