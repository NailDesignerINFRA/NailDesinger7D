/* Nail Designer 7D — interações leves */

(() => {
  /* -----------------------------------------------------------
     Marquee — duplica cada grupo para loop perfeito (duas faixas)
     ----------------------------------------------------------- */
  document.querySelectorAll("[data-marquee-track]").forEach((track) => {
    const group = track.querySelector(".marquee__group");
    if (group) {
      const clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    }
  });

  /* -----------------------------------------------------------
     Scroll suave para âncoras internas
     ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* -----------------------------------------------------------
     DEPOIMENTOS — botão "Exibir mais" / "Mostrar menos"
     ----------------------------------------------------------- */
  const depToggle = document.querySelector("[data-depoimentos-toggle]");
  const depList   = document.querySelector("[data-depoimentos-list]");
  if (depToggle && depList) {
    const depLabel = depToggle.querySelector(".depoimentos__more-label");
    depToggle.addEventListener("click", () => {
      const isExpanded = depList.classList.toggle("is-expanded");
      depToggle.classList.toggle("is-expanded", isExpanded);
      if (depLabel) {
        depLabel.textContent = isExpanded
          ? "Mostrar menos depoimentos"
          : "Exibir mais depoimentos";
      }
      // Re-observa novos cards revelados para a animação data-fly disparar
      if (isExpanded) {
        depList.querySelectorAll(".depoimentos__card.is-hidden[data-fly]").forEach((card) => {
          if (window.__flyObserver) window.__flyObserver.observe(card);
        });
      }
    });
  }

  /* -----------------------------------------------------------
     REVEAL scroll-driven (Benefícios closer + outros [data-reveal])
     ----------------------------------------------------------- */
  const revealLines = document.querySelectorAll("[data-reveal]");
  if (revealLines.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-revealed", entry.isIntersecting);
        });
      },
      {
        threshold: 0.45,
        rootMargin: "-10% 0px -10% 0px",
      }
    );
    revealLines.forEach((line) => io.observe(line));
  }

  /* -----------------------------------------------------------
     SCROLL REVEAL universal — [data-fly] entra/sai conforme scroll
     - data-fly="left|right|up|down|scale|zoom" define a direção
     - data-stagger no parent → filhos ganham --i automaticamente
     ----------------------------------------------------------- */
  // Atribui --i (stagger index) aos filhos diretos com data-fly
  document.querySelectorAll("[data-stagger]").forEach((parent) => {
    Array.from(parent.children).forEach((child, i) => {
      if (child.hasAttribute("data-fly")) {
        child.style.setProperty("--i", i);
      }
    });
  });

  const flyEls = document.querySelectorAll("[data-fly]");
  if (flyEls.length && "IntersectionObserver" in window) {
    const flyIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // One-way: anima ao entrar e desconecta — evita "tremor" no boundary
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            flyIO.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );
    flyEls.forEach((el) => flyIO.observe(el));
    // Exporta pro toggle dos depoimentos conseguir re-observar cards revelados
    window.__flyObserver = flyIO;
  }

  /* -----------------------------------------------------------
     HERO VIDEO — Botão "Clique para ativar o som"
     Usa postMessage da YouTube IFrame API (enablejsapi=1 na URL)
     ----------------------------------------------------------- */
  const heroIframe = document.getElementById("heroVideo");
  const unmuteBtn  = document.querySelector("[data-hero-unmute]");
  if (heroIframe && unmuteBtn) {
    const sendCmd = (func, args = "") => {
      try {
        heroIframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: func, args: args }),
          "*"
        );
      } catch (_) { /* ignore */ }
    };
    unmuteBtn.addEventListener("click", () => {
      sendCmd("unMute");
      sendCmd("setVolume", [100]);
      sendCmd("playVideo");
      unmuteBtn.classList.add("is-hidden");
      // Remove totalmente após a transição pra liberar o canto do vídeo
      setTimeout(() => unmuteBtn.remove(), 600);
    });
  }

  /* -----------------------------------------------------------
     BLOCO VSL — Notebook abre ao entrar na viewport + YouTube
     ----------------------------------------------------------- */
  const vslStage  = document.querySelector("[data-vsl-stage]");
  const vslPlay   = document.querySelector("[data-vsl-play]");
  const vslLaptop = document.querySelector("[data-vsl-laptop]");
  const vslYtEl   = document.querySelector("[data-vsl-yt]");

  if (vslStage && vslYtEl) {
    let hasOpened = false;
    let ytPlayer = null;
    let ytReady = false;
    let pendingPlay = false;

    const videoId = vslYtEl.getAttribute("data-vsl-yt");

    // Carrega a YouTube IFrame API uma vez
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const initPlayer = () => {
      ytPlayer = new YT.Player("vslPlayer", {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: 1,
          playlist: videoId,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onReady: (e) => {
            ytReady = true;
            e.target.mute();
            if (pendingPlay) {
              e.target.playVideo();
              pendingPlay = false;
            }
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) {
              vslYtEl.setAttribute("data-loaded", "true");
            }
          },
        },
      });
    };

    // A API chama essa função global quando estiver pronta
    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prevReady === "function") prevReady();
      initPlayer();
    };
    // Se já estava carregada (ex.: outro player na página)
    if (window.YT && window.YT.Player) initPlayer();

    const openLaptop = () => {
      if (hasOpened) return;
      hasOpened = true;
      vslStage.classList.add("is-open");

      // Começa o vídeo silenciado após a abertura
      setTimeout(() => {
        if (ytReady && ytPlayer && ytPlayer.playVideo) {
          ytPlayer.mute();
          ytPlayer.playVideo();
        } else {
          pendingPlay = true;
        }
      }, 1400);
    };

    // Abre quando ~40% do palco aparece na tela
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            openLaptop();
            io.disconnect();
          }
        });
      },
      { threshold: [0, 0.4, 0.6] }
    );
    io.observe(vslStage);

    // Fallback: se já estiver visível no load
    const rect = vslStage.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
      openLaptop();
      io.disconnect();
    }

    // Botão "Tocar com som" — tira o mute e reinicia do começo
    if (vslPlay) {
      vslPlay.addEventListener("click", () => {
        if (ytPlayer && ytPlayer.unMute) {
          ytPlayer.unMute();
          ytPlayer.setVolume(100);
          ytPlayer.seekTo(0, true);
          ytPlayer.playVideo();
          vslStage.classList.add("is-playing");
        }
      });
    }

    // Leve parallax/inclinação do notebook ao mover o mouse
    if (vslLaptop && window.matchMedia("(min-width: 861px)").matches) {
      let raf = null;
      vslStage.addEventListener("mousemove", (e) => {
        if (!hasOpened) return;
        const r = vslStage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          vslLaptop.style.transform = `rotateX(${y * -3}deg) rotateY(${x * 4}deg)`;
        });
      });
      vslStage.addEventListener("mouseleave", () => {
        if (raf) cancelAnimationFrame(raf);
        vslLaptop.style.transform = "";
      });
    }

    // Reduced motion → abre imediatamente
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      openLaptop();
    }
  }
})();
