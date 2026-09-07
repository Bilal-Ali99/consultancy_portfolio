export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);

  if (!target) {
    return;
  }

  const headerOffset = 96;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({
    top: Math.max(targetPosition, 0),
    behavior: "smooth",
  });
}

export function navigateToHomeSection(sectionId: string) {
  const isHomePage = window.location.pathname === "/";

  if (isHomePage) {
    scrollToSection(sectionId);
    return;
  }

  try {
    window.sessionStorage.setItem("hbsols:home-section", sectionId);
    window.location.assign("/");
  } catch {
    window.location.assign(`/?section=${encodeURIComponent(sectionId)}`);
  }
}

export function scrollToRequestedHomeSection(onComplete?: () => void) {
  const currentUrl = new URL(window.location.href);
  const querySection = currentUrl.searchParams.get("section");
  const storedSection = window.sessionStorage.getItem("hbsols:home-section");
  const requestedSection = querySection ?? storedSection;

  if (!requestedSection) return undefined;

  let attempts = 0;
  let retryTimer: number | undefined;

  const scrollWhenReady = () => {
    const target = document.getElementById(requestedSection);

    if (!target && attempts < 20) {
      attempts += 1;
      retryTimer = window.setTimeout(scrollWhenReady, 100);
      return;
    }

    if (!target) return;

    scrollToSection(requestedSection);
    window.sessionStorage.removeItem("hbsols:home-section");

    if (querySection && onComplete) {
      onComplete();
    } else if (querySection) {
      currentUrl.searchParams.delete("section");
      const cleanUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
      window.history.replaceState({}, "", cleanUrl);
    }
  };

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(scrollWhenReady);
  });

  return () => {
    if (retryTimer) window.clearTimeout(retryTimer);
  };
}
