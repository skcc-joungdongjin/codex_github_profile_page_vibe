const projects = [
  {
    title: "TaskFlow Dashboard",
    category: "web",
    description:
      "업무 우선순위와 진행 상태를 한눈에 볼 수 있는 대시보드. 시각적 계층과 빠른 탐색에 집중했습니다.",
    tags: ["React", "Charts", "State"],
    link: "#contact",
  },
  {
    title: "Nova Design System",
    category: "design",
    description:
      "반복되는 UI 패턴을 정리한 디자인 시스템. 일관된 토큰과 컴포넌트 규칙을 제공합니다.",
    tags: ["Tokens", "Components", "Docs"],
    link: "#contact",
  },
  {
    title: "Developer Landing",
    category: "landing",
    description:
      "짧은 소개와 강한 CTA를 중심으로 구성한 런딩 페이지. 전환 흐름을 우선해 설계했습니다.",
    tags: ["Responsive", "Motion", "SEO"],
    link: "#contact",
  },
  {
    title: "Portfolio OS",
    category: "web",
    description:
      "프로젝트와 경험을 카드 중심으로 정리한 포트폴리오 사이트. GitHub Pages 배포에 최적화했습니다.",
    tags: ["GitHub Pages", "Accessibility", "Performance"],
    link: "#contact",
  },
];

const projectGrid = document.getElementById("project-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const revealElements = document.querySelectorAll(".reveal");
const nav = document.querySelector(".site-nav");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".site-nav a");
const year = document.getElementById("year");
let revealObserver = null;

year.textContent = new Date().getFullYear();

function renderProjects(filter = "all") {
  projectGrid.innerHTML = projects
    .filter((project) => filter === "all" || project.category === filter)
    .map(
      (project) => `
        <article class="project-card reveal" data-category="${project.category}">
          <div class="project-card__body">
            <p class="eyebrow">${project.category}</p>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
          <div class="project-card__footer">
            <div class="project-card__meta">
              ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <a class="project-card__link" href="${project.link}">문의하기</a>
          </div>
        </article>
      `
    )
    .join("");
}

function setActiveFilter(button) {
  filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    setActiveFilter(button);
    renderProjects(filter);
    observeRevealElements();
  });
});

menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("is-open", !expanded);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

function observeRevealElements() {
  const elements = document.querySelectorAll(".reveal:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver?.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -5% 0px",
    }
  );

  elements.forEach((element) => revealObserver.observe(element));
}

function syncActiveSection() {
  const sections = [...document.querySelectorAll("main section[id]")];

  if (!sections.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const id = visible.target.id;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", active);
      });
    },
    {
      threshold: 0.35,
      rootMargin: "-15% 0px -55% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

renderProjects();
observeRevealElements();
syncActiveSection();
