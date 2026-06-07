/* @ds-bundle: {"format":3,"namespace":"TEDxAmsterdamDesignSystem_a084aa","components":[{"name":"Accordion","sourcePath":"components/core/Accordion.jsx"},{"name":"ArrowLink","sourcePath":"components/core/ArrowLink.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"MediaCard","sourcePath":"components/core/MediaCard.jsx"},{"name":"SectionHeader","sourcePath":"components/core/SectionHeader.jsx"},{"name":"SocialLink","sourcePath":"components/core/SocialLink.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Accordion.jsx":"bda0f77eea80","components/core/ArrowLink.jsx":"ce67f1e7a0c3","components/core/Button.jsx":"593e5fbe9ee7","components/core/Input.jsx":"8389cd1a9849","components/core/Logo.jsx":"ac37bbec5988","components/core/MediaCard.jsx":"bddffd5d1f1d","components/core/SectionHeader.jsx":"bdd3d323e441","components/core/SocialLink.jsx":"411a2403cc98","components/core/Stat.jsx":"68cb41b390c3","components/core/Tag.jsx":"6905493a6735","ui_kits/website/App.jsx":"c572576d30ed","ui_kits/website/BlogPage.jsx":"b681afca9cdf","ui_kits/website/EventProgram.jsx":"8804536c118b","ui_kits/website/Footer.jsx":"5048a4febd83","ui_kits/website/Header.jsx":"55d881c5d040","ui_kits/website/Home.jsx":"894dfdab1fec","ui_kits/website/HomeSections.jsx":"4c00f6a772b2","ui_kits/website/Pages.jsx":"db401691ec8d","ui_kits/website/Pages2.jsx":"3a86732e156b","ui_kits/website/SpeakerPage.jsx":"d49f0e133d8a","ui_kits/website/ui.jsx":"76ef8b4dee99"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TEDxAmsterdamDesignSystem_a084aa = window.TEDxAmsterdamDesignSystem_a084aa || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Accordion.jsx
try { (() => {
/**
 * TEDxAmsterdam — Accordion
 * FAQ-style disclosure list. Each row is an UPPERCASE question with a
 * +/− toggle; the open row's question turns red. One row open at a time.
 */
function Accordion({
  items = [],
  defaultOpen = 0,
  style
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, items.map((it, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderTop: "1px solid var(--border-hairline)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 24,
        padding: "26px 0",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "700 22px/1.2 var(--font-display)",
        letterSpacing: "-.01em",
        textTransform: "uppercase",
        color: isOpen ? "var(--tedx-red)" : "var(--tedx-white)"
      }
    }, it.q), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "none",
        width: 26,
        height: 26,
        position: "relative",
        color: isOpen ? "var(--tedx-red)" : "var(--tedx-white)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: 2,
        background: "currentColor",
        transform: "translateY(-50%)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: 2,
        background: "currentColor",
        transform: `translateX(-50%) scaleY(${isOpen ? 0 : 1})`,
        transition: "transform var(--dur) var(--ease-out)"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? 260 : 0,
        overflow: "hidden",
        transition: "max-height var(--dur-slow) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        padding: "0 0 26px",
        font: "var(--text-body)",
        color: "var(--text-secondary)",
        maxWidth: 760
      }
    }, it.a)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/core/ArrowLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TEDxAmsterdam — ArrowLink
 * Bold red text link trailed by the brand arrow. Used for
 * "Check out our past Speakers →", "View All Events →", etc.
 */
function ArrowLink({
  children,
  href = "#",
  color = "red",
  style,
  ...rest
}) {
  const c = color === "white" ? "var(--tedx-white)" : "var(--tedx-red)";
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: "var(--fs-tag)",
      lineHeight: 1.2,
      color: c,
      textDecoration: "none",
      transition: "gap var(--dur) var(--ease-out)",
      ...style
    },
    onMouseEnter: e => e.currentTarget.style.gap = "12px",
    onMouseLeave: e => e.currentTarget.style.gap = "8px"
  }, rest), children, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "9",
    viewBox: "0 0 18 9",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 4.5h15",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 1l4 3.5-4 3.5",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none"
  })));
}
Object.assign(__ds_scope, { ArrowLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ArrowLink.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TEDxAmsterdam — Button
 * Primary = TED-red fill / white bold label, 10px radius.
 * Secondary = white fill / black label. Ghost = outline.
 * Labels are short and bold; an optional arrow trails the label.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  href,
  type = "button",
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const pad = {
    sm: "12px 24px",
    md: "16px 30px",
    lg: "22px 34px"
  }[size];
  const fontSize = size === "lg" ? 16 : 14;
  const variants = {
    primary: {
      background: "var(--tedx-red)",
      color: "var(--tedx-white)",
      border: "none"
    },
    secondary: {
      background: "var(--tedx-white)",
      color: "var(--tedx-black)",
      border: "none"
    },
    ghost: {
      background: "transparent",
      color: "var(--tedx-white)",
      border: "1.5px solid var(--border-hairline)"
    }
  };
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize,
    lineHeight: 1,
    letterSpacing: "0.01em",
    padding: pad,
    borderRadius: "var(--radius-button)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    textDecoration: "none",
    transition: "background var(--dur) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), opacity var(--dur) var(--ease-standard)",
    WebkitTapHighlightColor: "transparent",
    ...variants[variant],
    ...style
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.transform = "scale(0.97)";
  };
  const onUp = e => {
    e.currentTarget.style.transform = "scale(1)";
  };
  const onEnter = e => {
    if (disabled) return;
    if (variant === "primary") e.currentTarget.style.background = "var(--accent-hover)";
    if (variant === "secondary") e.currentTarget.style.background = "#eaeaea";
    if (variant === "ghost") e.currentTarget.style.background = "rgba(255,255,255,0.08)";
  };
  const onLeave = e => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.background = variants[variant].background;
  };
  const Arrow = arrow ? /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "9",
    viewBox: "0 0 18 9",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 4.5h15",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 1l4 3.5-4 3.5",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none"
  })) : null;
  const Tag = href ? "a" : "button";
  const tagProps = href ? {
    href
  } : {
    type,
    disabled
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({}, tagProps, {
    onClick: onClick,
    style: baseStyle,
    onMouseDown: onDown,
    onMouseUp: onUp,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), children, Arrow);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TEDxAmsterdam — Input
 * Minimal underline field used in newsletter / sign-up forms.
 * No box — just a label, the value, and a hairline rule that
 * turns red on focus. Works on dark (default) or light surfaces.
 */
function Input({
  label = "Email",
  type = "email",
  placeholder = "",
  value,
  onChange,
  tone = "dark",
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const ink = tone === "dark" ? "var(--tedx-white)" : "var(--tedx-black)";
  const rule = tone === "dark" ? "var(--border-hairline)" : "rgba(0,0,0,0.3)";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body)",
      fontSize: 16,
      color: ink,
      opacity: 0.85
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      appearance: "none",
      background: "transparent",
      border: "none",
      borderBottom: `1px solid ${focused ? "var(--tedx-red)" : rule}`,
      padding: "8px 0",
      font: "var(--text-body)",
      color: ink,
      outline: "none",
      transition: "border-color var(--dur) var(--ease-standard)"
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
/**
 * TEDxAmsterdam — Logo
 * The locked-up wordmark: red "TEDx" + "Amsterdam" in the
 * surrounding ink colour (white on dark, black on light).
 * `base` resolves the asset path from any page depth.
 */
function Logo({
  tone = "light-on-dark",
  width = 230,
  base = "",
  href,
  style
}) {
  // On dark surfaces use the white-wordmark PNG; on light surfaces the
  // SVG renders TEDx red + Amsterdam black (its currentColor default).
  const src = tone === "dark-on-light" ? base + "assets/logo-tedxamsterdam.svg" : base + "assets/logo-tedxamsterdam-white.png";
  const img = /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "TEDxAmsterdam",
    style: {
      width,
      height: "auto",
      display: "block"
    }
  });
  const wrap = {
    display: "inline-flex",
    ...style
  };
  return href ? /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      ...wrap,
      textDecoration: "none"
    }
  }, img) : /*#__PURE__*/React.createElement("span", {
    style: wrap
  }, img);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/SocialLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ICONS = {
  linkedin: "assets/icon-linkedin.svg",
  instagram: "assets/icon-instagram.svg",
  youtube: "assets/icon-youtube.svg"
};

/**
 * TEDxAmsterdam — SocialLink
 * Square white icon chip + label, used in footers and speaker
 * cards. `base` lets you point at the assets folder from any
 * page depth (e.g. "../" or "../../").
 */
function SocialLink({
  network,
  label,
  href = "#",
  base = "",
  style,
  ...rest
}) {
  const src = base + (ICONS[network] || ICONS.linkedin);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      textDecoration: "none",
      font: "var(--text-body)",
      color: "var(--text-primary)",
      ...style
    },
    onMouseEnter: e => e.currentTarget.style.color = "var(--tedx-red)",
    onMouseLeave: e => e.currentTarget.style.color = "var(--text-primary)"
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      objectFit: "contain",
      filter: "brightness(0) invert(1)"
    }
  }), label || network);
}
Object.assign(__ds_scope, { SocialLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SocialLink.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
/**
 * TEDxAmsterdam — Stat
 * Oversized Helvetica-Bold figure with a small supporting label.
 * Used for the "2009 — events organised since" / "20K — people"
 * counters. Pairs well stacked with a hairline divider between.
 */
function Stat({
  value,
  label,
  size = "lg",
  style
}) {
  const fs = size === "xl" ? 140 : size === "lg" ? 80 : 56;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 28,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `700 ${fs}px/1 var(--font-display)`,
      letterSpacing: "var(--ls-display)",
      color: "var(--text-primary)"
    }
  }, value), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body)",
      color: "var(--text-secondary)",
      maxWidth: 170,
      paddingTop: size === "xl" ? 24 : 14
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TEDxAmsterdam — Tag
 * Small uppercase eyebrow label. Red by default (the most common
 * usage: section eyebrows like "SPEAKERS", "EARLY BIRD"). Use the
 * `dot` variant for list / meta labels with a leading red bullet.
 */
function Tag({
  children,
  color = "red",
  dot = false,
  style,
  ...rest
}) {
  const colors = {
    red: "var(--tedx-red)",
    white: "var(--tedx-white)",
    muted: "var(--tedx-gray-400)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: "var(--fs-tag)",
      lineHeight: 1.2,
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: colors[color],
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--tedx-red)",
      flex: "none"
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/MediaCard.jsx
try { (() => {
/**
 * TEDxAmsterdam — MediaCard
 * Blog / event card: square-cornered image with a category label
 * in the top-left corner, a bold UPPERCASE title, a muted
 * description, and a dated meta row with a red bullet.
 */
function MediaCard({
  image,
  category,
  title,
  description,
  date,
  href = "#",
  ratio = "4 / 3",
  style
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      textDecoration: "none",
      color: "var(--text-primary)",
      ...style
    },
    onMouseEnter: e => {
      const img = e.currentTarget.querySelector("[data-img]");
      if (img) img.style.transform = "scale(1.04)";
    },
    onMouseLeave: e => {
      const img = e.currentTarget.querySelector("[data-img]");
      if (img) img.style.transform = "scale(1)";
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      aspectRatio: ratio,
      background: "var(--grad-tile)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-img": true,
    style: {
      position: "absolute",
      inset: 0,
      background: image ? `url(${image}) center / cover no-repeat` : "var(--grad-tile)",
      transition: "transform var(--dur-slow) var(--ease-out)"
    }
  }), category && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 14,
      top: 14,
      font: "var(--text-tag)",
      textTransform: "uppercase",
      letterSpacing: "0.04em",
      color: "var(--tedx-white)",
      textShadow: "0 1px 6px rgba(0,0,0,0.6)"
    }
  }, category)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "700 22px/1.15 var(--font-display)",
      letterSpacing: "var(--ls-display)",
      textTransform: "uppercase"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      fontSize: 16,
      color: "var(--text-muted)"
    }
  }, description), date && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    color: "white",
    dot: true,
    style: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: 400,
      fontSize: 16
    }
  }, date));
}
Object.assign(__ds_scope, { MediaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MediaCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeader.jsx
try { (() => {
/**
 * TEDxAmsterdam — SectionHeader
 * The repeating section intro: red uppercase eyebrow, a bold
 * heading (optionally with a red-highlighted span), a body
 * description, and an optional arrow link.
 */
function SectionHeader({
  eyebrow,
  title,
  description,
  link,
  linkHref = "#",
  align = "left",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align,
      maxWidth: 540,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Tag, null, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-h2)",
      letterSpacing: "var(--ls-display)",
      color: "var(--text-primary)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "var(--text-secondary)"
    }
  }, description), link && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ArrowLink, {
    href: linkHref
  }, link)));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
/* TEDxAmsterdam — website app shell / router */
function App() {
  const [page, setPage] = useState("home");
  const go = p => {
    setPage(p);
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--tedx-black)"
    }
  }, /*#__PURE__*/React.createElement(Header, {
    page: page,
    go: go
  }), page === "home" && /*#__PURE__*/React.createElement(Home, {
    go: go
  }), page === "event" && /*#__PURE__*/React.createElement(EventProgramPage, {
    go: go
  }), page === "speakers" && /*#__PURE__*/React.createElement(SpeakersPage, {
    go: go
  }), page === "speaker" && /*#__PURE__*/React.createElement(SpeakerPage, {
    go: go
  }), page === "team" && /*#__PURE__*/React.createElement(TeamPage, {
    go: go
  }), page === "about" && /*#__PURE__*/React.createElement(AboutPage, {
    go: go
  }), page === "impact" && /*#__PURE__*/React.createElement(ImpactPage, {
    go: go
  }), page === "partners" && /*#__PURE__*/React.createElement(PartnersPage, {
    go: go
  }), page === "gallery" && /*#__PURE__*/React.createElement(GalleryPage, {
    go: go
  }), page === "blog" && /*#__PURE__*/React.createElement(BlogPage, {
    go: go
  }), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BlogPage.jsx
try { (() => {
/* TEDxAmsterdam — Blog index page */
function BlogPage({
  go
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--tedx-black)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: 900,
      background: "radial-gradient(70% 60% at 8% 12%, rgba(235,0,40,.4), rgba(0,0,0,0) 60%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      padding: "70px var(--gutter-wide) 40px"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "700 clamp(64px,8vw,120px)/0.9 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Blog")), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      padding: "40px var(--gutter-wide) 120px",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "64px 28px"
    }
  }, POSTS.map((p, i) => /*#__PURE__*/React.createElement(BlogCard, {
    key: i,
    p: p,
    onClick: () => go("speaker")
  })))));
}
function BlogCard({
  p,
  onClick
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick && onClick();
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18,
      textDecoration: "none",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      aspectRatio: "1 / 1",
      background: "var(--grad-tile)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `url(${p.img}) center/cover no-repeat`,
      transform: h ? "scale(1.04)" : "scale(1)",
      transition: "transform .4s"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 16,
      top: 16,
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".04em",
      color: "#fff",
      textShadow: "0 1px 6px rgba(0,0,0,.6)"
    }
  }, p.cat)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "700 24px/1.15 var(--font-display)",
      letterSpacing: "-.02em",
      textTransform: "uppercase"
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "var(--tedx-gray-400)"
    }
  }, p.title), /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, p.date));
}
window.BlogPage = BlogPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BlogPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/EventProgram.jsx
try { (() => {
/* TEDxAmsterdam — Event Program page (the "X-monogram" landing).
   Recreated from /work/event-page (review build, 05.09). */
function EventProgramPage({
  go
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--tedx-black)"
    }
  }, /*#__PURE__*/React.createElement(EventHero, {
    go: go
  }), /*#__PURE__*/React.createElement(EventDare, null), /*#__PURE__*/React.createElement(EventStory, null), /*#__PURE__*/React.createElement(EventUpNext, {
    go: go
  }), /*#__PURE__*/React.createElement(EventSpeakers, null));
}

/* ---- HERO with big X monogram ---- */
function EventX() {
  // Striped red "X" monogram — two crossing chevron bars filled with
  // vertical red→orange stripes (recreated from the Figma Vector tiling).
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 600 800",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      width: 760,
      height: 800,
      maxWidth: "92%",
      opacity: 0.92
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "evx",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#b3001f"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "22%",
    stopColor: "#eb0028"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "42%",
    stopColor: "#ff7919"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "55%",
    stopColor: "#ff9b19"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "70%",
    stopColor: "#eb0028"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#7a0016"
  })), /*#__PURE__*/React.createElement("pattern", {
    id: "evxstripe",
    width: "26",
    height: "800",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "26",
    height: "800",
    fill: "url(#evx)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    width: "4",
    height: "800",
    fill: "#000",
    opacity: "0.55"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "evxclip"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "60,0 300,330 540,0 600,0 600,70 360,400 600,730 600,800 540,800 300,470 60,800 0,800 0,730 240,400 0,70 0,0"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "600",
    height: "800",
    fill: "url(#evxstripe)",
    clipPath: "url(#evxclip)"
  }));
}
function EventHero({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      minHeight: 720,
      background: "var(--tedx-black)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.55)), url(${ASSET}event-hero-x.png) 78% 30% / cover no-repeat`,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement(EventX, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 60%, rgba(0,0,0,.7) 100%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.35) 34%, rgba(0,0,0,0) 56%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "120px var(--gutter-wide) 90px",
      maxWidth: 1180
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    style: {
      letterSpacing: ".06em"
    }
  }, "Past\xA0\u2014\xA0Present\xA0\u2014\xA0Future"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "20px 0 0",
      font: "700 clamp(64px,7.5vw,118px)/0.92 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Amsterdam", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--tedx-red)"
    }
  }, "Reimagined")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "26px 0 0",
      maxWidth: 430,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.9)"
    }
  }, "The future isn't written. It's imagined, one bold idea at a time."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 30,
      alignItems: "center",
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    size: "lg",
    onClick: () => go("home")
  }, "SECURE YOUR SEAT"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 280,
      font: "var(--text-body)",
      fontSize: 16,
      color: "rgba(255,255,255,.85)"
    }
  }, "Join us to hear the ideas that are shaping our future"))));
}

/* ---- WE BECOME THE CITY + event detail ---- */
function EventDare() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      padding: "100px var(--gutter-wide)"
    }
  }, /*#__PURE__*/React.createElement(EdgeGlows, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      position: "relative",
      margin: "0 0 64px",
      maxWidth: 900,
      font: "700 clamp(34px,4vw,60px)/1.05 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "We become the city we dare to imagine"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 100,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(EventRow, {
    k: "date",
    v: "OCTOBER 16, 2025"
  }), /*#__PURE__*/React.createElement(EventRow, {
    k: "time",
    v: "STARTING FROM 13:00"
  }), /*#__PURE__*/React.createElement(EventRow, {
    k: "place",
    v: "DE HALLEN STUDIO'S"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.85)",
      maxWidth: 480
    }
  }, "This year's theme is all about re-thinking the way things have always been. Amsterdam Reimagined explores culture, inclusion, innovation, and sustainability. The theme reflects on the city's past, questioning its present, and shaping its future.")));
}
function EventRow({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 24,
      borderBottom: "1px solid var(--border-hairline)",
      padding: "24px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".06em",
      color: "rgba(255,255,255,.65)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: "-.01em",
      color: "var(--tedx-red)",
      textAlign: "right"
    }
  }, v));
}

/* ---- FOR 750 YEARS + new chapter story ---- */
function EventStory() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      padding: "0 var(--gutter-wide) 110px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "0.9fr 1.1fr",
      gap: 90,
      alignItems: "start",
      marginBottom: 90
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "700 clamp(32px,3.6vw,52px)/1 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "For 750 years"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.85)",
      maxWidth: 560
    }
  }, "Amsterdam has been a city of bold beginnings. Built from water, shaped by visionaries, and fueled by a spirit that never settles.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 380,
      border: "1.5px solid var(--tedx-red)",
      borderRadius: 12,
      overflow: "hidden",
      background: `var(--img-scrim), url(${ASSET}photo-crowd.jpg) center/cover no-repeat #000`,
      marginBottom: 90
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 auto 56px",
      maxWidth: 900,
      textAlign: "center",
      font: "700 clamp(28px,3.2vw,46px)/1.1 var(--font-display)",
      letterSpacing: "-.02em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Now, TEDxAmsterdam invites you to join a new chapter: Amsterdam Reimagined."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "4 / 3",
      background: `var(--img-scrim), url(${ASSET}photo-stage.jpg) center/cover no-repeat #000`
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.85)",
      maxWidth: 520
    }
  }, "This is a story of daring to rethink everything. From how we move to how we connect, care, and create together. It's about imagining a city that's more inclusive, sustainable, and alive with possibility. On our 2025 stage, voices from every corner will come together to share ideas that challenge what's possible and inspire change that's urgent, honest, and deeply human. The future isn't written. It's imagined, one bold idea at a time.")));
}

/* ---- UP NEXT ON STAGE CTA ---- */
function EventUpNext({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      padding: "120px var(--gutter-wide)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(55% 90% at 50% 55%, rgba(255,155,25,.4), rgba(235,0,40,.5) 38%, rgba(60,0,12,.4) 66%, rgba(0,0,0,0) 84%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 26,
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "700 clamp(40px,5vw,76px)/1 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Up next on stage\u2026"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.85)",
      maxWidth: 440
    }
  }, "Amsterdam's most innovative minds and powerful stories are coming your way. Join us to hear the ideas that are reimagining Amsterdam."), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    size: "lg",
    onClick: () => go("home")
  }, "SECURE YOUR SEAT")));
}

/* ---- OUR SPEAKERS teaser (silhouettes) ---- */
function EventSpeakers() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      padding: "20px var(--gutter-wide) 120px"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    style: {
      marginBottom: 16
    }
  }, "Stay tuned as we unveil this year's speakers shortly"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 48px",
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Our Speakers"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 20
    }
  }, [0, 1, 2, 3].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      aspectRatio: "3 / 4",
      position: "relative",
      overflow: "hidden",
      background: "radial-gradient(120% 80% at 50% 120%, var(--tedx-orange-amber), var(--tedx-red) 45%, #2a0008 78%, #000 100%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
      width: "62%",
      height: "70%",
      background: "#0a0506",
      borderRadius: "50% 50% 0 0",
      filter: "blur(2px)"
    }
  })))));
}
Object.assign(window, {
  EventProgramPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/EventProgram.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* TEDxAmsterdam — site footer with red radial glow + big wordmark */
function Social({
  network,
  label
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      textDecoration: "none",
      fontFamily: "var(--font-sans)",
      fontSize: 20,
      color: h ? "var(--tedx-red)" : "#fff",
      transition: "color .2s"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ASSET + "icon-" + network + ".svg",
    alt: "",
    style: {
      width: 22,
      height: 22,
      objectFit: "contain",
      filter: "brightness(0) invert(1)"
    }
  }), label);
}
function FootCol({
  heading,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: "white"
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, children));
}
function FootLink({
  children
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 20,
      color: h ? "var(--tedx-red)" : "#fff",
      textDecoration: "none",
      transition: "color .2s"
    }
  }, children);
}
function Footer() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      paddingTop: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: -260,
      transform: "translateX(-50%)",
      width: 1700,
      height: 760,
      background: "radial-gradient(60% 70% at 50% 100%, var(--tedx-red) 0%, #8e0019 38%, rgba(0,0,0,0) 72%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "0 var(--gutter-wide) 40px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1.4fr",
      gap: 60,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(FootCol, {
    heading: "Menu"
  }, /*#__PURE__*/React.createElement(FootLink, null, "FAQ"), /*#__PURE__*/React.createElement(FootLink, null, "Contact"), /*#__PURE__*/React.createElement(FootLink, null, "Become a partner"), /*#__PURE__*/React.createElement(FootLink, null, "Become a volunteer")), /*#__PURE__*/React.createElement(FootCol, {
    heading: "Social media"
  }, /*#__PURE__*/React.createElement(Social, {
    network: "linkedin",
    label: "LinkedIn"
  }), /*#__PURE__*/React.createElement(Social, {
    network: "instagram",
    label: "Instagram"
  }), /*#__PURE__*/React.createElement(Social, {
    network: "youtube",
    label: "YouTube"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "700 36px/1.1 var(--font-display)",
      letterSpacing: "-.02em",
      color: "#fff",
      textTransform: "uppercase"
    }
  }, "Subscribe", /*#__PURE__*/React.createElement("br", null), "to newsletter"), ok ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 18,
      color: "#fff"
    }
  }, "Thanks \u2014 you're on the list.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (email) setOk(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "rgba(255,255,255,.85)"
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true,
    style: {
      background: "transparent",
      border: "none",
      borderBottom: "1px solid var(--border-hairline)",
      padding: "8px 0",
      fontFamily: "var(--font-sans)",
      fontSize: 20,
      color: "#fff",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "rgba(255,255,255,.7)",
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    style: {
      marginTop: 3,
      accentColor: "var(--tedx-red)"
    }
  }), "I agree to the processing of my personal data for the purpose of receiving emails from TEDxAmsterdam, in accordance with the Privacy Policy."), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    full: true,
    type: "submit"
  }, "SIGN UP")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "0 var(--gutter-wide)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ASSET + "logo-tedxamsterdam-white.png",
    alt: "TEDxAmsterdam",
    style: {
      width: "100%",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px 60px",
      padding: "20px 0 40px",
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      color: "rgba(255,255,255,.85)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "This independent TEDx event is operated under license from TED"), /*#__PURE__*/React.createElement("span", null, "Copyright Stichting TEDxAmsterdam, 2025"), /*#__PURE__*/React.createElement("span", null, "All Rights Reserved"), /*#__PURE__*/React.createElement("span", null, "Privacy policy"), /*#__PURE__*/React.createElement("span", null, "Design busy.studio"))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
/* TEDxAmsterdam — site header (sticky nav, responsive w/ hamburger) */
function Header({
  page,
  go
}) {
  const [open, setOpen] = useState(false);
  const ROUTE = {
    "Speakers": "speakers",
    "Event Program": "event",
    "Impact Program": "impact",
    "About Us": "about",
    "Our Team": "team",
    "Blog": "blog",
    "Gallery": "gallery",
    "Partners": "partners"
  };
  const nav = item => {
    const route = ROUTE[item] || "home";
    setOpen(false);
    go(route);
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "site-header",
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      height: "var(--header-height)",
      background: "var(--tedx-black)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 var(--gutter)",
      borderBottom: "1px solid #161616",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    width: 200,
    onClick: () => go("home")
  })), /*#__PURE__*/React.createElement("nav", {
    className: "nav-desktop",
    style: {
      display: "flex",
      gap: 26,
      alignItems: "center",
      flexWrap: "nowrap"
    }
  }, NAV.map(item => {
    const route = ROUTE[item] || "home";
    const active = route !== "home" && (route === page || route === "speakers" && page === "speaker");
    return /*#__PURE__*/React.createElement(NavItem, {
      key: item,
      label: item,
      active: active,
      onClick: () => nav(item)
    });
  })), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    "aria-label": "Menu",
    onClick: () => setOpen(o => !o),
    style: {
      display: "none",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 8,
      flex: "none",
      flexDirection: "column",
      gap: 5,
      width: 40
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 2,
      width: 26,
      background: "#fff",
      transform: open ? "translateY(7px) rotate(45deg)" : "none",
      transition: "transform .2s"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 2,
      width: 26,
      background: "#fff",
      opacity: open ? 0 : 1,
      transition: "opacity .2s"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 2,
      width: 26,
      background: "#fff",
      transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
      transition: "transform .2s"
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    className: "nav-drawer",
    style: {
      position: "fixed",
      left: 0,
      right: 0,
      top: "var(--header-height)",
      bottom: 0,
      background: "var(--tedx-black)",
      zIndex: 49,
      padding: "24px var(--gutter)",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      overflowY: "auto"
    }
  }, NAV.map(item => {
    const route = ROUTE[item] || "home";
    const active = route !== "home" && (route === page || route === "speakers" && page === "speaker");
    return /*#__PURE__*/React.createElement("a", {
      key: item,
      href: "#",
      onClick: e => {
        e.preventDefault();
        nav(item);
      },
      style: {
        font: "700 28px/1.2 var(--font-display)",
        letterSpacing: "-.02em",
        textTransform: "uppercase",
        color: active ? "var(--tedx-red)" : "#fff",
        textDecoration: "none",
        padding: "14px 0",
        borderBottom: "1px solid var(--border-hairline)"
      }
    }, item);
  })));
}
function NavItem({
  label,
  active,
  onClick
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick();
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      fontWeight: 400,
      color: active ? "var(--tedx-red)" : h ? "var(--tedx-red)" : "#fff",
      textDecoration: "none",
      transition: "color .2s",
      whiteSpace: "nowrap"
    }
  }, label);
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
/* TEDxAmsterdam — Homepage ("Amsterdam Reimagined") */
function Home({
  go
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--tedx-black)"
    }
  }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(IntroBand, null), /*#__PURE__*/React.createElement(EventDetail, null), /*#__PURE__*/React.createElement(SpeakersBand, {
    go: go
  }), /*#__PURE__*/React.createElement(Snapshots, {
    go: go
  }), /*#__PURE__*/React.createElement(Timetable, null), /*#__PURE__*/React.createElement(TicketsCTA, null), /*#__PURE__*/React.createElement(ImpactProgram, null), /*#__PURE__*/React.createElement(Newsletter, null), /*#__PURE__*/React.createElement(UpcomingEvents, {
    go: go
  }));
}

/* ---- HERO ---- */
function Hero() {
  const [done, setDone] = useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      minHeight: 620
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(70% 90% at 78% 18%, rgba(255,155,25,.55) 0%, rgba(235,0,40,.55) 34%, rgba(90,0,16,.6) 62%, rgba(0,0,0,0) 84%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement(EdgeGlows, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "120px var(--gutter-wide) 96px",
      display: "flex",
      flexDirection: "column",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Past\xA0\u2192\xA0Present\xA0\u2192\xA0Future")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "700 clamp(64px,7vw,110px)/0.95 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Amsterdam", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--tedx-red)"
    }
  }, "Reimagined"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 40,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 360,
      display: "flex",
      flexDirection: "column",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "#fff"
    }
  }, "Be the first to get notified when tickets go on sale."), done ? /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, "You're on the list") : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    size: "lg",
    onClick: () => setDone(true)
  }, "NOTIFY ME"))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 420,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.85)"
    }
  }, "How can Amsterdam's spirit of connection shape a just and meaningful future?"))));
}

/* ---- INTRO BAND ---- */
function IntroBand() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "100px var(--gutter-wide)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -200,
      top: -120,
      width: 520,
      height: 520,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,121,25,.4), rgba(235,0,40,.2) 50%, rgba(0,0,0,0) 72%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      position: "relative",
      margin: 0,
      maxWidth: 1080,
      font: "700 clamp(30px,3.4vw,52px)/1.15 var(--font-display)",
      letterSpacing: "-.02em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "\"Amsterdam Reimagined\" explores culture, inclusion, innovation, and sustainability \u2014 reflecting on the city's past, questioning its present, and shaping its future."));
}

/* ---- EVENT DETAIL ---- */
function DetailRow({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      borderBottom: "1px solid var(--border-hairline)",
      padding: "22px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "rgba(255,255,255,.7)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 24,
      fontWeight: 700,
      color: "var(--tedx-red)",
      letterSpacing: "-.01em"
    }
  }, v));
}
function EventDetail() {
  const [waiting, setWaiting] = useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "0 var(--gutter-wide) 110px",
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 120,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(EdgeGlows, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(DetailRow, {
    k: "date",
    v: "23.07"
  }), /*#__PURE__*/React.createElement(DetailRow, {
    k: "time",
    v: "10:00"
  }), /*#__PURE__*/React.createElement(DetailRow, {
    k: "place",
    v: "ANNOUNCED SOON"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, waiting ? /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, "Added to the waiting list") : /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    size: "lg",
    onClick: () => setWaiting(true)
  }, "JOIN WAITING LIST"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 28,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "About"), ["Rethinking Amsterdam's culture, identity, and future", "Exploring the city's spirit of connection and justice", "Speakers on the Past, Present, Future & Radical Future"].map(t => /*#__PURE__*/React.createElement("p", {
    key: t,
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "#fff"
    }
  }, t))));
}

/* ---- SPEAKERS BAND ---- */
function SpeakersBand({
  go
}) {
  const [i, setI] = useState(0);
  const visible = [0, 1, 2, 3].map(n => SPEAKERS[(i + n) % SPEAKERS.length]);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      padding: "20px var(--gutter-wide) 110px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60,
      alignItems: "start",
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      maxWidth: 440
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Speakers"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      color: "#fff"
    }
  }, "Our Speakers"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.8)"
    }
  }, "TEDxAmsterdam invites speakers to inspire with powerful stories. Each year, a new theme sparks inspiration and ideas."), /*#__PURE__*/React.createElement(ALink, {
    onClick: () => go("speaker")
  }, "Check out our past Speakers")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0,
      justifySelf: "end",
      minWidth: 420
    }
  }, /*#__PURE__*/React.createElement(StatRow, {
    value: "2009",
    label: "events have been organised since"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--border-hairline)"
    }
  }), /*#__PURE__*/React.createElement(StatRow, {
    value: "20K",
    label: "people over the last 3 years"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 20
    }
  }, visible.map((s, n) => /*#__PURE__*/React.createElement(SpeakerCard, {
    key: n,
    s: s,
    onClick: () => go("speaker")
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 14,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(CarouselBtn, {
    dir: "left",
    onClick: () => setI((i - 1 + SPEAKERS.length) % SPEAKERS.length)
  }), /*#__PURE__*/React.createElement(CarouselBtn, {
    dir: "right",
    onClick: () => setI((i + 1) % SPEAKERS.length)
  })));
}
function StatRow({
  value,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 24,
      padding: "10px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 80px/1 var(--font-display)",
      letterSpacing: "-.03em",
      color: "#fff"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body)",
      fontSize: 18,
      color: "rgba(255,255,255,.8)",
      maxWidth: 160,
      paddingTop: 14
    }
  }, label));
}
function SpeakerCard({
  s,
  onClick
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick();
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "3 / 4",
      background: "var(--grad-tile)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--grad-tile)",
      transform: h ? "scale(1.04)" : "scale(1)",
      transition: "transform .4s"
    }
  })), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      font: "700 16px/1.15 var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "-.01em",
      color: "#fff"
    }
  }, s.topic), /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, s.name));
}
function CarouselBtn({
  dir,
  onClick
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      border: "1.5px solid var(--border-hairline)",
      background: h ? "var(--tedx-red)" : "transparent",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background .2s",
      transform: dir === "left" ? "scaleX(-1)" : "none"
    }
  }, /*#__PURE__*/React.createElement(Arrow, {
    w: 18
  }));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeSections.jsx
try { (() => {
/* TEDxAmsterdam — Homepage lower sections */

/* ---- SNAPSHOTS (full-bleed red gallery teaser) ---- */
function Snapshots({
  go
}) {
  const imgs = [ASSET + "photo-event-1.jpg", ASSET + "photo-stage.jpg", ASSET + "photo-crowd.jpg", ASSET + "photo-audience.jpg", ASSET + "photo-event-2.jpg"];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--tedx-red)",
      padding: "90px var(--gutter-wide)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff",
      maxWidth: 620
    }
  }, "Snapshots from our past events"), /*#__PURE__*/React.createElement(ALink, {
    color: "white",
    onClick: () => go("blog")
  }, "View our gallery")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(12,1fr)",
      gridAutoRows: 150,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Snap, {
    img: imgs[0],
    c: "span 4",
    r: "span 2"
  }), /*#__PURE__*/React.createElement(Snap, {
    img: imgs[1],
    c: "span 3",
    r: "span 1",
    mt: 40
  }), /*#__PURE__*/React.createElement(Snap, {
    img: imgs[2],
    c: "span 5",
    r: "span 2"
  }), /*#__PURE__*/React.createElement(Snap, {
    img: imgs[3],
    c: "span 3",
    r: "span 1"
  }), /*#__PURE__*/React.createElement(Snap, {
    img: imgs[4],
    c: "span 4",
    r: "span 1"
  }), /*#__PURE__*/React.createElement(Snap, {
    img: imgs[1],
    c: "span 5",
    r: "span 1"
  })));
}
function Snap({
  img,
  c,
  r,
  mt = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: c,
      gridRow: r,
      marginTop: mt,
      background: `var(--img-scrim), url(${img}) center/cover no-repeat #000`
    }
  });
}

/* ---- TIMETABLE ---- */
function Timetable() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      padding: "100px var(--gutter-wide)"
    }
  }, /*#__PURE__*/React.createElement(EdgeGlows, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      position: "relative",
      margin: "0 0 48px",
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Timetable"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, TIMETABLE.map((row, idx) => /*#__PURE__*/React.createElement(TtRow, {
    key: idx,
    row: row
  }))));
}
function TtRow({
  row
}) {
  const isSession = row.kind === "session";
  const isBreak = row.kind === "break";
  if (isBreak) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 40,
        alignItems: "center",
        padding: "16px 0",
        borderTop: "1px solid var(--border-hairline)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 120,
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        color: "rgba(255,255,255,.7)"
      }
    }, row.time), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".04em",
        color: "rgba(255,255,255,.7)"
      }
    }, row.title));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "120px 1fr auto",
      gap: 40,
      alignItems: "center",
      padding: "28px 0",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "#fff"
    }
  }, row.time), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "700 28px/1.1 var(--font-display)",
      letterSpacing: "-.02em",
      textTransform: "uppercase",
      color: isSession ? "var(--tedx-red)" : "#fff"
    }
  }, row.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "rgba(255,255,255,.6)"
    }
  }, "short description")), isSession && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, [0, 1, 2, 3].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      width: 92,
      height: 92,
      background: "var(--grad-tile)"
    }
  }))));
}

/* ---- TICKETS CTA ---- */
function TicketsCTA() {
  const [done, setDone] = useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      padding: "130px var(--gutter-wide)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(60% 90% at 50% 50%, rgba(255,155,25,.45), rgba(235,0,40,.5) 38%, rgba(60,0,12,.4) 66%, rgba(0,0,0,0) 84%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 28,
      maxWidth: 720
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Early Bird"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "700 clamp(40px,5vw,72px)/1 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Be the first to get tickets"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.85)",
      maxWidth: 480
    }
  }, "Don't miss out \u2014 sign up now for early-bird access and be the first to know when tickets go on sale."), done ? /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, "You're on the list") : /*#__PURE__*/React.createElement(Btn, {
    variant: "primary",
    size: "lg",
    onClick: () => setDone(true)
  }, "JOIN WAITING LIST")));
}

/* ---- IMPACT PROGRAM ---- */
function ImpactProgram() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      padding: "20px var(--gutter-wide) 110px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Start-up Accelerator"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Impact Program"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.85)"
    }
  }, "The Impact Program is a start-up accelerator unique to TEDxAmsterdam and designed to help bring ideas into action!"), /*#__PURE__*/React.createElement(ALink, null, "Learn more about the Impact Program"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "4/3",
      background: `var(--img-scrim), url(${ASSET}photo-crowd.jpg) center/cover no-repeat #000`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "4/3",
      background: `var(--img-scrim), url(${ASSET}photo-audience.jpg) center/cover no-repeat #000`
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "#fff",
      maxWidth: 520,
      justifySelf: "end"
    }
  }, "Over eight weeks, our Impact Pioneers will engage in weekly in-person strategy sessions with expert coaching and mentorship, to develop essential skills and build their business. The program concludes with a final Impact event, where participants will pitch their ideas to a supportive audience."));
}

/* ---- NEWSLETTER ---- */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--tedx-black)",
      padding: "0 var(--gutter-wide) 110px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Join our Newsletter"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.8)"
    }
  }, "Be inspired and first to know about our events.")), ok ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "#fff"
    }
  }, "Thanks \u2014 you're subscribed.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (email) setOk(true);
    },
    style: {
      display: "flex",
      gap: 20,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "rgba(255,255,255,.85)"
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true,
    style: {
      background: "transparent",
      border: "none",
      borderBottom: "1px solid var(--border-hairline)",
      padding: "8px 0",
      fontFamily: "var(--font-sans)",
      fontSize: 20,
      color: "#fff",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    type: "submit"
  }, "Sign up")));
}

/* ---- UPCOMING EVENTS ---- */
function UpcomingEvents({
  go
}) {
  const items = POSTS.slice(0, 3);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--tedx-black)",
      padding: "0 var(--gutter-wide) 60px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Upcoming events"), /*#__PURE__*/React.createElement(ALink, {
    onClick: () => go("blog")
  }, "View All Events")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 28
    }
  }, items.map((p, i) => /*#__PURE__*/React.createElement(PostCard, {
    key: i,
    p: p,
    onClick: () => go("blog"),
    ratio: "16 / 10"
  }))));
}

/* ---- shared post card ---- */
function PostCard({
  p,
  onClick,
  ratio = "4 / 3"
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick && onClick();
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      textDecoration: "none",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      overflow: "hidden",
      aspectRatio: ratio,
      background: "var(--grad-tile)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `url(${p.img}) center/cover no-repeat`,
      transform: h ? "scale(1.04)" : "scale(1)",
      transition: "transform .4s"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 14,
      top: 14,
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".04em",
      color: "#fff",
      textShadow: "0 1px 6px rgba(0,0,0,.6)"
    }
  }, p.cat)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "700 22px/1.15 var(--font-display)",
      letterSpacing: "-.02em",
      textTransform: "uppercase"
    }
  }, p.title), /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, p.date));
}
Object.assign(window, {
  Snapshots,
  Timetable,
  TicketsCTA,
  ImpactProgram,
  Newsletter,
  UpcomingEvents,
  PostCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeSections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pages.jsx
try { (() => {
/* TEDxAmsterdam — secondary pages: Speakers grid, Team, Partners, Gallery */

/* ---- shared page hero (title + about column) ---- */
function PageHero({
  title,
  titleColor = "#fff",
  eyebrow,
  desc,
  link,
  onLink
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "70px var(--gutter-wide) 50px",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 900,
      height: 520,
      background: "radial-gradient(60% 70% at 6% 10%, rgba(235,0,40,.4), rgba(0,0,0,0) 62%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 80,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "700 clamp(56px,7vw,104px)/0.9 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: titleColor
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18,
      paddingTop: 12,
      maxWidth: 460
    }
  }, eyebrow && /*#__PURE__*/React.createElement(Tag, null, eyebrow), desc && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "rgba(255,255,255,.85)"
    }
  }, desc), link && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(ALink, {
    onClick: onLink
  }, link)))));
}

/* =================== SPEAKERS GRID =================== */
function SpeakersPage({
  go
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--tedx-black)"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    title: "Speakers",
    eyebrow: "About Speakers",
    desc: "TEDxAmsterdam invites speakers to inspire with powerful stories. Each year, a new theme sparks inspiration and ideas."
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "70px var(--gutter-wide) 40px"
    }
  }, /*#__PURE__*/React.createElement(EdgeGlows, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "48px 20px"
    }
  }, LINEUP.map((s, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("speaker");
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "1 / 1.25",
      background: "var(--grad-tile)"
    }
  }), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      font: "700 17px/1.18 var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "-.01em",
      color: "#fff"
    }
  }, s.topic), /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, s.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--tedx-gray-400)"
    }
  }, s.role))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--tedx-black)",
      padding: "70px var(--gutter-wide) 110px",
      borderTop: "1px solid var(--border-hairline)",
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 48px",
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Past Speakers"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "48px 20px"
    }
  }, PAST_SPEAKERS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "1 / 1.1",
      background: "linear-gradient(160deg, var(--tedx-gray-700), var(--tedx-gray-900))"
    }
  }), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      font: "700 17px/1.18 var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "-.01em",
      color: "#fff"
    }
  }, s.talk), /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, s.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--tedx-gray-400)"
    }
  }, s.role), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(ALink, null, "Watch the talk")))))));
}

/* =================== TEAM =================== */
function TeamPage() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? TEAM : TEAM.filter(m => m.group === filter);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--tedx-black)"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Our", /*#__PURE__*/React.createElement("br", null), "Team"),
    eyebrow: "About Team",
    desc: "Our 100% volunteer-led team brings events to life with skill and passion \u2014 from behind the scenes to showtime. Together, we push boundaries to build a better city and a better world."
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "44px var(--gutter-wide) 100px"
    }
  }, /*#__PURE__*/React.createElement(EdgeGlows, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      gap: 32,
      flexWrap: "wrap",
      marginBottom: 48
    }
  }, TEAM_GROUPS.map(g => /*#__PURE__*/React.createElement("button", {
    key: g,
    onClick: () => setFilter(g),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".06em",
      color: filter === g ? "var(--tedx-red)" : "rgba(255,255,255,.55)",
      transition: "color .2s"
    }
  }, g))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(6,1fr)",
      gap: "40px 20px"
    }
  }, shown.map((m, i) => /*#__PURE__*/React.createElement(TeamCard, {
    key: m.name + i,
    m: m
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--tedx-black)",
      padding: "20px var(--gutter-wide) 110px",
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 90,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 40px",
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Volunteer", /*#__PURE__*/React.createElement("br", null), "Opportunities"), /*#__PURE__*/React.createElement(Tag, null, "Open positions"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, OPEN_ROLES.map(r => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid var(--border-hairline)",
      padding: "20px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body)",
      color: "#fff"
    }
  }, r), /*#__PURE__*/React.createElement(ALink, null, "Join us"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 96,
      maxWidth: 440
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Volunteer"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 0",
      font: "var(--text-body)",
      color: "rgba(255,255,255,.85)"
    }
  }, "A large group of volunteers dedicate their time and energy to set up events and build our community, acting as personal ambassadors for change and innovation. With their professional skills and boundless enthusiasm, they make TEDxAmsterdam possible."))));
}
function TeamCard({
  m
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "1 / 1.12",
      background: "linear-gradient(160deg, var(--tedx-gray-700), var(--tedx-gray-900))",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(235,0,40,.85)",
      opacity: h ? 1 : 0,
      transition: "opacity .2s",
      display: "flex",
      alignItems: "flex-end",
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ASSET + "icon-linkedin.svg",
    alt: "",
    style: {
      width: 18,
      height: 18,
      filter: "brightness(0) invert(1)"
    }
  }), "LinkedIn ", /*#__PURE__*/React.createElement(Arrow, {
    w: 16
  })))), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      font: "700 14px/1.2 var(--font-sans)",
      textTransform: "uppercase",
      letterSpacing: ".02em",
      color: "#fff"
    }
  }, m.name), /*#__PURE__*/React.createElement(Tag, {
    color: "muted",
    dot: true,
    style: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: 400
    }
  }, m.role));
}

/* =================== PARTNERS =================== */
function PartnersPage() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--tedx-black)"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "How to", /*#__PURE__*/React.createElement("br", null), "become", /*#__PURE__*/React.createElement("br", null), "a partner"),
    eyebrow: "About our partners",
    desc: "Our partners believe in making a change. It's thanks to them that ideas worth sharing transcend beyond being just an idea. Our partners are part of the movement. They don't just talk about it. They ACT.",
    link: "Join us"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--tedx-red)",
      padding: "80px var(--gutter-wide)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 24px",
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#000"
    }
  }, "Become", /*#__PURE__*/React.createElement("br", null), "a partner"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "rgba(0,0,0,.82)"
    }
  }, "Become a partner for 2025 and support the TEDxAmsterdam community by reaching out to partners@tedxamsterdam.nl.")), ok ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "#000"
    }
  }, "Thanks \u2014 we'll be in touch.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (email) setOk(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 26
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "rgba(0,0,0,.7)"
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true,
    style: {
      background: "transparent",
      border: "none",
      borderBottom: "1px solid rgba(0,0,0,.45)",
      padding: "8px 0",
      fontFamily: "var(--font-sans)",
      fontSize: 20,
      color: "#000",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "rgba(0,0,0,.7)",
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    style: {
      marginTop: 3
    }
  }), "I agree to the processing of my personal data for the purpose of receiving emails from TEDxAmsterdam, in accordance with the Privacy Policy."), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    type: "submit"
  }, "SIGN UP"))), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "90px var(--gutter-wide) 120px"
    }
  }, /*#__PURE__*/React.createElement(EdgeGlows, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      position: "relative",
      margin: "0 0 56px",
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Our Partners"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "40px 24px"
    }
  }, PARTNERS.map(p => /*#__PURE__*/React.createElement("div", {
    key: p,
    style: {
      height: 92,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTop: "1px solid var(--border-hairline)",
      color: "rgba(255,255,255,.85)",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: "-.01em",
      textAlign: "center"
    }
  }, p)))));
}

/* =================== GALLERY =================== */
function GalleryPage() {
  const imgs = [ASSET + "photo-event-1.jpg", ASSET + "photo-stage.jpg", ASSET + "photo-crowd.jpg", ASSET + "photo-audience.jpg", ASSET + "photo-event-2.jpg"];
  const spans = [[5, 2], [3, 2], [4, 1], [4, 1], [3, 1], [5, 2], [4, 1], [3, 2], [5, 1]];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--tedx-black)"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    title: "Gallery",
    eyebrow: "From our past events",
    desc: "A look back at the speakers, ideas and people that made past editions of TEDxAmsterdam unforgettable."
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "60px var(--gutter-wide) 120px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(12,1fr)",
      gridAutoRows: 150,
      gap: 16
    }
  }, spans.map(([c, r], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      gridColumn: `span ${c}`,
      gridRow: `span ${r}`,
      background: `var(--img-scrim), url(${imgs[i % imgs.length]}) center/cover no-repeat #000`
    }
  })))));
}
Object.assign(window, {
  PageHero,
  SpeakersPage,
  TeamPage,
  PartnersPage,
  GalleryPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pages2.jsx
try { (() => {
/* TEDxAmsterdam — About Us + Impact Program pages (+ FAQ accordion) */

/* ---------- FAQ accordion ---------- */
function Faq({
  items
}) {
  const [open, setOpen] = useState(0);
  return /*#__PURE__*/React.createElement("div", null, items.map((it, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderTop: "1px solid var(--border-hairline)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 24,
        padding: "26px 0",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "700 22px/1.2 var(--font-display)",
        letterSpacing: "-.01em",
        textTransform: "uppercase",
        color: isOpen ? "var(--tedx-red)" : "#fff"
      }
    }, it.q), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "none",
        width: 26,
        height: 26,
        position: "relative",
        color: isOpen ? "var(--tedx-red)" : "#fff"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: 2,
        background: "currentColor",
        transform: "translateY(-50%)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: 2,
        background: "currentColor",
        transform: `translateX(-50%) scaleY(${isOpen ? 0 : 1})`,
        transition: "transform .2s"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? 240 : 0,
        overflow: "hidden",
        transition: "max-height .3s var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        padding: "0 0 26px",
        font: "var(--text-body)",
        color: "rgba(255,255,255,.8)",
        maxWidth: 760
      }
    }, it.a)));
  }));
}

/* ===================== ABOUT US ===================== */
const VALUES = [{
  t: "Truly inclusive",
  d: "Everyone is welcome — every voice matters and belongs on our stage."
}, {
  t: "Diversity always",
  d: "We seek out perspectives that challenge and broaden our own."
}, {
  t: "Planet over profit",
  d: "We make choices that put people and the planet first."
}, {
  t: "Work together",
  d: "Nothing we do happens alone — community is the method."
}];
const TONE = [{
  w: "Bold",
  red: true
}, {
  w: "Friendly",
  red: false
}, {
  w: "Inclusive",
  red: true
}, {
  w: "Future-forward",
  red: false
}, {
  w: "Authentic",
  red: true
}, {
  w: "Engaging",
  red: false
}, {
  w: "Playful",
  red: true
}];
function AboutPage() {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--tedx-black)"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "About", /*#__PURE__*/React.createElement("br", null), "Us"),
    eyebrow: "Unsung heroes, unstoppable ideas",
    desc: "TEDxAmsterdam is where bold ideas turn into action. A community that welcomes all people connected to Amsterdam and fosters an inclusive space to discuss, reflect and connect."
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "80px var(--gutter-wide)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 90
    }
  }, /*#__PURE__*/React.createElement(EdgeGlows, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Vision"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 0",
      font: "700 28px/1.3 var(--font-display)",
      letterSpacing: "-.02em",
      color: "#fff"
    }
  }, "A community that welcomes all people connected to Amsterdam and fosters an inclusive space to discuss, reflect and connect.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Mission"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 0",
      font: "700 28px/1.3 var(--font-display)",
      letterSpacing: "-.02em",
      color: "#fff"
    }
  }, "To create positive impact by sharing ideas worth spreading, and supporting unsung heroes with new ideas through our stage and impact program."))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--tedx-black)",
      padding: "40px var(--gutter-wide) 90px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 48px",
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Our Values"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 24
    }
  }, VALUES.map(v => /*#__PURE__*/React.createElement("div", {
    key: v.t,
    style: {
      border: "1px solid var(--border-hairline)",
      padding: "28px 26px 32px",
      display: "flex",
      flexDirection: "column",
      gap: 18,
      minHeight: 240
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "radial-gradient(circle at 50% 40%, var(--tedx-orange-glow), var(--tedx-orange-amber) 45%, var(--tedx-red) 78%)"
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "auto 0 0",
      font: "700 24px/1.15 var(--font-display)",
      letterSpacing: "-.02em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, v.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "rgba(255,255,255,.7)"
    }
  }, v.d))))), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      padding: "60px var(--gutter-wide) 90px",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -120,
      top: -80,
      width: 520,
      height: 520,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(235,0,40,.35), rgba(0,0,0,0) 65%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement(Tag, null, "Tone of voice"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexWrap: "wrap",
      gap: "0 40px",
      marginTop: 20
    }
  }, TONE.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: "700 clamp(40px,6vw,84px)/1.1 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: t.red ? "var(--tedx-red)" : "#fff"
    }
  }, "We are ", t.w, ".")))), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--tedx-black)",
      padding: "100px var(--gutter-wide)",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(55% 90% at 50% 50%, rgba(255,155,25,.4), rgba(235,0,40,.45) 40%, rgba(0,0,0,0) 78%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      position: "relative",
      margin: 0,
      font: "700 clamp(44px,6vw,84px)/1 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "Unsung heroes,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--tedx-red)"
    }
  }, "unstoppable ideas."))));
}

/* ===================== IMPACT PROGRAM ===================== */
const PIONEER_PROFILE = [{
  k: "Business idea",
  d: "The pioneer needs to have a concrete, actionable idea or plan to develop."
}, {
  k: "Positive impact",
  d: "A genuine ambition to have a positive impact within Amsterdam and beyond."
}, {
  k: "Unwavering commitment",
  d: "Each pioneer must demonstrate unwavering commitment to work on their idea."
}, {
  k: "3 to 8 hours a week",
  d: "Each pioneer must make a commitment to spend around 3 to 8 hours a week on the program."
}, {
  k: "Available Sept—Sept",
  d: "Available from mid-September to mid-November for a weekly in-person session."
}, {
  k: "Comfortable to speak",
  d: "The pioneer is comfortable enough to speak at our closing VIP event, the Impact event."
}];
const PIONEER_CHECK = ["Is the idea a project or a real business?", "Have a viable business model / problem / solution fit for the product or service?", "Have conducted market and competitor research?", "Am I fully committed to continue with the idea / its development?", "Have proof of concept or a Minimum Viable Product (MVP) in place of working on it?", "Have already some traction (or test deployment)?"];
const IMPACT_FAQ = [{
  q: "Who are our pioneers?",
  a: "Pioneers are individuals with new ways of thinking that move an idea into a prototype of a real-world solution, supported by our coaches and mentors."
}, {
  q: "The criteria",
  a: "A concrete, actionable idea, a genuine ambition for positive impact, and the commitment of 3–8 hours a week from September to November."
}, {
  q: "Does one have to pay a fee to participate?",
  a: "No. The Impact Program is free for the selected pioneers — it runs on the support of our mentors, coaches and partners."
}, {
  q: "How does the application process work?",
  a: "Submit your idea through the application form. Shortlisted pioneers are invited to a conversation before the final cohort is selected."
}, {
  q: "Can the idea consist of more than one founder?",
  a: "Yes — teams are welcome, though we ask one person to be the main point of contact throughout the program."
}, {
  q: "What if I am not good at public speaking?",
  a: "That's exactly what the program is for. Coaching and rehearsal time help you grow into the final Impact event stage."
}, {
  q: "Is attendance at all events mandatory?",
  a: "The weekly in-person sessions and the closing Impact event are the backbone of the program, so attendance is expected."
}];
const PIONEERS = ["Barend Koolhaas", "Sinem Tuncer", "Lara Alonso", "Valerie van Langhout", "Marta Nowak", "Pieter Bos", "Nadia Haddad", "Tomas Vidal"];
function ImpactPage() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--tedx-black)"
    }
  }, /*#__PURE__*/React.createElement(PageHero, {
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Visionary \u2014", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--tedx-red)"
      }
    }, "is that you?")),
    eyebrow: "Apply for the impact program",
    desc: "TEDxAmsterdam is always looking for visionary Amsterdammers and ideas. Each year we form bold ideas with the potential to drive positive change, and supporting unsung heroes with new ideas through our stage and impact program."
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "80px var(--gutter-wide)",
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr",
      gap: 80,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(EdgeGlows, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      position: "relative",
      margin: 0,
      font: "700 clamp(28px,3.2vw,46px)/1.18 var(--font-display)",
      letterSpacing: "-.02em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "The Impact Program is your opportunity to bring forth a prototype of a solution regarding a real-world problem."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 18,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "The journey"), ["Storytelling", "Leadership", "Customer experience", "Impact"].map(p => /*#__PURE__*/React.createElement("div", {
    key: p,
    style: {
      borderBottom: "1px solid var(--border-hairline)",
      paddingBottom: 14
    }
  }, /*#__PURE__*/React.createElement(ALink, null, p))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--tedx-black)",
      padding: "20px var(--gutter-wide) 90px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 48px",
      font: "700 clamp(28px,3.2vw,46px)/1.15 var(--font-display)",
      letterSpacing: "-.02em",
      textTransform: "uppercase",
      color: "#fff",
      maxWidth: 900
    }
  }, "The following qualities are important for the pioneer profile"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 80,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, PIONEER_PROFILE.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.k,
    style: {
      display: "grid",
      gridTemplateColumns: "200px 1fr",
      gap: 24,
      borderTop: "1px solid var(--border-hairline)",
      padding: "20px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 16px/1.3 var(--font-sans)",
      textTransform: "uppercase",
      letterSpacing: ".03em",
      color: "var(--tedx-red)"
    }
  }, r.k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "rgba(255,255,255,.82)"
    }
  }, r.d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-hairline)",
      padding: "30px 30px 34px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 22px",
      font: "700 18px/1.3 var(--font-display)",
      textTransform: "uppercase",
      letterSpacing: "-.01em",
      color: "#fff"
    }
  }, "For the idea to be suitable, you will want to keep in mind whether you\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, PIONEER_CHECK.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      marginTop: 7,
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--tedx-red)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "rgba(255,255,255,.8)"
    }
  }, c))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--tedx-red)",
      padding: "80px var(--gutter-wide)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 80,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#000"
    }
  }, "Want to be", /*#__PURE__*/React.createElement("br", null), "a pioneer too?"), ok ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "#000"
    }
  }, "Thanks \u2014 application received.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (email) setOk(true);
    },
    style: {
      display: "flex",
      gap: 20,
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "rgba(0,0,0,.7)"
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true,
    style: {
      background: "transparent",
      border: "none",
      borderBottom: "1px solid rgba(0,0,0,.45)",
      padding: "8px 0",
      fontFamily: "var(--font-sans)",
      fontSize: 20,
      color: "#000",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    type: "submit"
  }, "SIGN UP"))), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "90px var(--gutter-wide) 40px"
    }
  }, /*#__PURE__*/React.createElement(EdgeGlows, null), /*#__PURE__*/React.createElement("h2", {
    style: {
      position: "relative",
      margin: "0 0 48px",
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "The Pioneers of 2025"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "40px 20px"
    }
  }, PIONEERS.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "1 / 1.05",
      background: "linear-gradient(160deg, var(--tedx-gray-700), var(--tedx-gray-900))"
    }
  }), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      font: "700 14px/1.2 var(--font-sans)",
      textTransform: "uppercase",
      letterSpacing: ".02em",
      color: "#fff"
    }
  }, n), /*#__PURE__*/React.createElement(Tag, {
    color: "muted",
    dot: true,
    style: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: 400
    }
  }, "Impact Pioneer 2025"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--tedx-black)",
      padding: "70px var(--gutter-wide) 120px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 24px",
      font: "var(--text-h2)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, "FAQ"), /*#__PURE__*/React.createElement(Faq, {
    items: IMPACT_FAQ
  })));
}
Object.assign(window, {
  Faq,
  AboutPage,
  ImpactPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pages2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SpeakerPage.jsx
try { (() => {
/* TEDxAmsterdam — Speaker detail page */
function SpeakerPage({
  go
}) {
  const [idx, setIdx] = useState(0);
  const s = SPEAKERS[idx];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: "var(--tedx-black)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(50% 50% at 18% 30%, rgba(235,0,40,.35), rgba(0,0,0,0) 60%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      padding: "80px var(--gutter-wide) 110px",
      display: "grid",
      gridTemplateColumns: "1.05fr 0.95fr",
      gap: 90,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Topic"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "700 clamp(48px,5.5vw,84px)/0.95 var(--font-display)",
      letterSpacing: "-.03em",
      textTransform: "uppercase",
      color: "var(--tedx-red)"
    }
  }, s.topic), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, s.date), /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, s.place)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "#fff",
      maxWidth: 640
    }
  }, s.bio), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--border-hairline)",
      margin: "20px 0"
    }
  }), /*#__PURE__*/React.createElement(Tag, null, "About"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--text-h2)",
      letterSpacing: "-.02em",
      textTransform: "uppercase",
      color: "#fff"
    }
  }, s.name), /*#__PURE__*/React.createElement(Tag, {
    color: "white",
    dot: true
  }, s.role)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22,
      position: "sticky",
      top: 110
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "3 / 4",
      background: "var(--grad-tile)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      bottom: 22,
      background: "var(--tedx-black)",
      color: "#fff",
      padding: "12px 22px",
      font: "700 18px/1 var(--font-sans)",
      textTransform: "uppercase",
      letterSpacing: ".02em"
    }
  }, s.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(SpkSocial, {
    network: "linkedin",
    label: "LinkedIn"
  }), /*#__PURE__*/React.createElement(SpkSocial, {
    network: "instagram",
    label: "Instagram"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(CarouselBtn, {
    dir: "left",
    onClick: () => setIdx((idx - 1 + SPEAKERS.length) % SPEAKERS.length)
  }), /*#__PURE__*/React.createElement(CarouselBtn, {
    dir: "right",
    onClick: () => setIdx((idx + 1) % SPEAKERS.length)
  })))));
}
function SpkSocial({
  network,
  label
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      textDecoration: "none",
      fontFamily: "var(--font-sans)",
      fontSize: 18,
      color: h ? "var(--tedx-red)" : "#fff",
      transition: "color .2s"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ASSET + "icon-" + network + ".svg",
    alt: "",
    style: {
      width: 20,
      height: 20,
      filter: "brightness(0) invert(1)"
    }
  }), label);
}
window.SpeakerPage = SpeakerPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SpeakerPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ui.jsx
try { (() => {
/* TEDxAmsterdam website UI kit — shared primitives (in-browser Babel).
   No import/export: uses window.React, ends with window assignment. */
const {
  useState
} = React;
const NAV = ["Speakers", "Event Program", "Impact Program", "About Us", "Our Team", "Blog", "Gallery", "Partners"];
const ASSET = "../../assets/";

/* ---- Arrow glyph ---- */
function Arrow({
  w = 18
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: w,
    height: w * 0.5,
    viewBox: "0 0 18 9",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 4.5h15",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 1l4 3.5-4 3.5",
    stroke: "currentColor",
    strokeWidth: "1.6",
    fill: "none"
  }));
}

/* ---- Button ---- */
function Btn({
  children,
  variant = "primary",
  size = "md",
  arrow,
  onClick,
  type = "button",
  full
}) {
  const [h, setH] = useState(false);
  const [p, setP] = useState(false);
  const pad = {
    sm: "12px 24px",
    md: "16px 30px",
    lg: "20px 34px"
  }[size];
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: size === "lg" ? 16 : 14,
    lineHeight: 1,
    letterSpacing: "0.01em",
    padding: pad,
    borderRadius: "var(--radius-button)",
    border: "none",
    cursor: "pointer",
    width: full ? "100%" : "auto",
    transform: p ? "scale(0.97)" : "scale(1)",
    transition: "background .2s, transform .12s"
  };
  const v = {
    primary: {
      background: h ? "var(--accent-hover)" : "var(--tedx-red)",
      color: "#fff"
    },
    secondary: {
      background: h ? "#eaeaea" : "#fff",
      color: "#000"
    },
    ghost: {
      background: h ? "rgba(255,255,255,.08)" : "transparent",
      color: "#fff",
      border: "1.5px solid var(--border-hairline)"
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    onClick: onClick,
    style: {
      ...base,
      ...v
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }, children, arrow && /*#__PURE__*/React.createElement(Arrow, null));
}

/* ---- Eyebrow tag ---- */
function Tag({
  children,
  color = "red",
  dot
}) {
  const c = {
    red: "var(--tedx-red)",
    white: "#fff",
    muted: "var(--tedx-gray-400)"
  }[color];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 1.2,
      textTransform: "uppercase",
      letterSpacing: ".04em",
      color: c
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--tedx-red)"
    }
  }), children);
}

/* ---- Arrow link ---- */
function ALink({
  children,
  color = "red",
  onClick
}) {
  const [h, setH] = useState(false);
  const c = color === "white" ? "#fff" : "var(--tedx-red)";
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick && onClick();
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: h ? 12 : 8,
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 14,
      color: c,
      textDecoration: "none",
      transition: "gap .2s"
    }
  }, children, /*#__PURE__*/React.createElement(Arrow, null));
}

/* ---- Logo ---- */
function Logo({
  width = 225,
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick && onClick();
    },
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ASSET + "logo-tedxamsterdam-white.png",
    alt: "TEDxAmsterdam",
    style: {
      width,
      height: "auto",
      display: "block"
    }
  }));
}

/* ---- Heat backdrops ---- */
function EdgeGlows() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -110,
      top: 0,
      bottom: 0,
      width: 220,
      background: "var(--glow-edge)",
      pointerEvents: "none",
      opacity: .9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -110,
      top: 0,
      bottom: 0,
      width: 220,
      background: "var(--glow-edge)",
      pointerEvents: "none",
      opacity: .9
    }
  }));
}

/* ---- Data ---- */
const SPEAKERS = [{
  name: "Sofia Alvarez",
  topic: "Growing back ice, in the Arctic?",
  role: "Designer, researcher, author and the founder of Human Material Loop",
  date: "29 Nov 2025",
  place: "Muziekgebouw aan 't IJ",
  bio: "In Europe alone, 150 million kg of human hair waste ends up in landfills or in incinerators, while human hair is the same keratin protein fiber as wool. Human Material Loop has developed a technology to utilise waste keratin protein fiber and develop high-performance products for the textile industry."
}, {
  name: "David Ramirez",
  topic: "The architecture of belonging",
  role: "Urbanist and community organiser",
  date: "29 Nov 2025",
  place: "Muziekgebouw aan 't IJ",
  bio: "Cities are built twice — once in concrete, once in the habits of the people who live in them. David explores how small civic rituals quietly decide who feels at home."
}, {
  name: "Carlos Mendes",
  topic: "Repairing what we throw away",
  role: "Circular-economy engineer",
  date: "29 Nov 2025",
  place: "Muziekgebouw aan 't IJ",
  bio: "What if the most radical climate technology is simply repair? Carlos makes the case for a maintenance culture over a disposable one."
}, {
  name: "Julia Stein",
  topic: "The quiet power of slow data",
  role: "Data ethicist",
  date: "29 Nov 2025",
  place: "Muziekgebouw aan 't IJ",
  bio: "Faster isn't always wiser. Julia argues for data we can actually live with — patient, consented, and human-scaled."
}];
const POSTS = [{
  cat: "News",
  title: "The power of ideas: 5 talks that changed Amsterdam",
  img: ASSET + "photo-audience.jpg",
  date: "24 Jun 2025"
}, {
  cat: "Podcast",
  title: "One day, a hundred stories: volunteering at TEDxAmsterdam",
  img: ASSET + "photo-stage.jpg",
  date: "24 Jun 2025"
}, {
  cat: "News",
  title: "The future of cities: what our speakers are saying",
  img: ASSET + "photo-event-1.jpg",
  date: "24 Jun 2025"
}, {
  cat: "Podcast",
  title: "Speaker spotlight: where are they now?",
  img: ASSET + "photo-crowd.jpg",
  date: "24 Jun 2025"
}, {
  cat: "News",
  title: "How to pitch your idea to TEDxAmsterdam",
  img: ASSET + "photo-event-2.jpg",
  date: "24 Jun 2025"
}, {
  cat: "News",
  title: "Why we're still 100% volunteer-driven — and proud of it",
  img: ASSET + "photo-audience.jpg",
  date: "24 Jun 2025"
}];
const TIMETABLE = [{
  time: "10:30",
  title: "Opening Performance",
  kind: "head"
}, {
  time: "10:50",
  title: "Session 1",
  kind: "session"
}, {
  time: "12:00–13:00",
  title: "Lunch",
  kind: "break"
}, {
  time: "13:30",
  title: "Session 2",
  kind: "session"
}, {
  time: "15:00–15:40",
  title: "Break",
  kind: "break"
}, {
  time: "15:40",
  title: "Session 3",
  kind: "session"
}, {
  time: "17:30",
  title: "Ends",
  kind: "break"
}];

/* ---- Upcoming speaker line-up (grid) ---- */
const LINEUP = [{
  topic: "Growing back ice, in the Arctic?",
  name: "David Karimov",
  role: "Computational artist"
}, {
  topic: "How technology is changing the way we experience art",
  name: "Carlos Mendes",
  role: "Media researcher"
}, {
  topic: "The architecture of belonging",
  name: "Julia Stein",
  role: "Student, AI justice advocate and changemaker"
}, {
  topic: "Repairing what we throw away",
  name: "Sofia Alvarez",
  role: "Circular-economy engineer"
}, {
  topic: "The quiet power of slow data",
  name: "Eva Renia",
  role: "Data ethicist"
}, {
  topic: "Cities that listen",
  name: "Manuel Toscano",
  role: "Urbanist"
}, {
  topic: "What the canals remember",
  name: "Lisa Xiu",
  role: "Historian"
}, {
  topic: "Designing for the radical future",
  name: "Stephen Akinremi",
  role: "Speculative designer"
}];

/* ---- Past speakers ---- */
const PAST_SPEAKERS = [{
  talk: "How technology is changing the way we experience art",
  name: "Friendred Peng",
  role: "Computational artist"
}, {
  talk: "Redefining poverty: towards a better understanding of inequality",
  name: "Milio Van De Kamp",
  role: "Sociologist and writer"
}, {
  talk: "Growing back ice, in the Arctic?",
  name: "Fonger Ypma",
  role: "Founder & CEO"
}, {
  talk: "Error 404: human face not found",
  name: "Robin Pocornie",
  role: "Student, AI justice advocate and changemaker"
}, {
  talk: "The reality of living the fantasy",
  name: "Ma'Ma Queen",
  role: "Professional drag artist"
}, {
  talk: "All the sea we do not see",
  name: "Lisa Becking",
  role: "Marine biologist"
}, {
  talk: "Layco medical devices",
  name: "Thom Weustink",
  role: "Co-founder of Layco Medical Devices"
}, {
  talk: "Human Material Loop",
  name: "Zsofia Kollar",
  role: "Designer, researcher, founder of Human Material Loop"
}];

/* ---- Team ---- */
const TEAM = [{
  name: "Angela Bos",
  role: "Team lead communications",
  group: "Communications"
}, {
  name: "Jillian Vorce",
  role: "Team lead",
  group: "Exec"
}, {
  name: "Robin Masereeuw",
  role: "Programme curator",
  group: "Production"
}, {
  name: "Lisa Xiu",
  role: "Teamlead web development",
  group: "Internal"
}, {
  name: "Alejandra Villacis",
  role: "Co-lead impact program",
  group: "Impact"
}, {
  name: "Manuel Toscano",
  role: "Co-lead impact program",
  group: "Impact"
}, {
  name: "Eva Renia",
  role: "Speakers project manager",
  group: "Production"
}, {
  name: "Fabrizia Sant'Elia",
  role: "Partnerships lead",
  group: "Partnerships"
}, {
  name: "Aleksandra Graca",
  role: "Communications",
  group: "Communications"
}, {
  name: "Stephen Akinremi",
  role: "Compliance, fact-checking",
  group: "Internal"
}, {
  name: "Veerle de Cock",
  role: "Team lead",
  group: "Exec"
}, {
  name: "David Karimov",
  role: "Production assistant",
  group: "Production"
}];
const TEAM_GROUPS = ["All", "Exec", "Communications", "Internal", "Partnerships", "Impact", "Production"];
const OPEN_ROLES = ["front-end developer / webmaster", "back-end web developers", "graphic designer", "social media manager"];

/* ---- Partners ---- */
const PARTNERS = ["Veriteer", "A'DAM&Co.", "Skoll Foundation", "Bill & Melinda Gates", "Infosys", "Logitech", "Greenpeace", "Adyen", "KLM", "Heineken", "Rituals", "Booking.com"];
Object.assign(window, {
  useState,
  NAV,
  ASSET,
  Arrow,
  Btn,
  Tag,
  ALink,
  Logo,
  EdgeGlows,
  SPEAKERS,
  POSTS,
  TIMETABLE,
  LINEUP,
  PAST_SPEAKERS,
  TEAM,
  TEAM_GROUPS,
  OPEN_ROLES,
  PARTNERS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ui.jsx", error: String((e && e.message) || e) }); }


// components/core/Badge.jsx
try { (() => {
function Badge({ label, color = "red", size = "md", style }) {
  const colors = {
    red: { background: "var(--tedx-red)", color: "var(--tedx-white)" },
    white: { background: "var(--tedx-white)", color: "var(--tedx-black)" },
    muted: { background: "rgba(255,255,255,0.12)", color: "var(--text-secondary)" }
  };
  const fontSize = size === "sm" ? 10 : 12;
  const padding = size === "sm" ? "2px 8px" : "4px 10px";
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      style: {
        display: "inline-block",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-bold)",
        fontSize,
        lineHeight: 1.4,
        letterSpacing: "var(--ls-wide)",
        padding,
        borderRadius: "var(--radius-full)",
        ...colors[color],
        ...style
      }
    },
    label
  );
}
__ds_scope.Badge = Badge;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Breadcrumb.jsx
try { (() => {
function Breadcrumb({ items = [], ariaLabel = "Breadcrumb", style }) {
  return /* @__PURE__ */ React.createElement("nav", { "aria-label": ariaLabel, style }, /* @__PURE__ */ React.createElement(
    "ol",
    {
      style: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "var(--space-2)",
        listStyle: "none",
        margin: 0,
        padding: 0,
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-bold)",
        fontSize: "var(--fs-tag)",
        letterSpacing: "var(--ls-wide)",
        textTransform: "uppercase"
      }
    },
    items.map((item, i) => {
      const isCurrent = i === items.length - 1;
      return /* @__PURE__ */ React.createElement("li", { key: i, style: { display: "flex", alignItems: "center", gap: "var(--space-2)" } }, !isCurrent && item.href ? /* @__PURE__ */ React.createElement(
        "a",
        {
          href: item.href,
          style: { color: "var(--text-secondary)", textDecoration: "none" }
        },
        item.label
      ) : /* @__PURE__ */ React.createElement(
        "span",
        {
          "aria-current": isCurrent ? "page" : void 0,
          style: { color: isCurrent ? "var(--text-primary)" : "var(--text-secondary)" }
        },
        item.label
      ), !isCurrent && /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", style: { color: "var(--text-muted)" } }, "\u203A"));
    })
  ));
}
__ds_scope.Breadcrumb = Breadcrumb;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/core/Checkbox.jsx
try { (() => {
function Checkbox({ label, checked, onChange, disabled = false, id, style }) {
  const checkId = id || `checkbox-${String(label).toLowerCase().replace(/\s+/g, "-")}`;
  return /* @__PURE__ */ React.createElement(
    "label",
    {
      htmlFor: checkId,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style
      }
    },
    /* @__PURE__ */ React.createElement(
      "span",
      {
        style: {
          position: "relative",
          width: 18,
          height: 18,
          flex: "none",
          border: `1.5px solid ${checked ? "var(--tedx-red)" : "var(--border-hairline)"}`,
          borderRadius: 2,
          background: checked ? "var(--tedx-red)" : "transparent",
          transition: "background var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)"
        }
      },
      checked && /* @__PURE__ */ React.createElement(
        "svg",
        {
          "aria-hidden": "true",
          width: "10",
          height: "8",
          viewBox: "0 0 10 8",
          fill: "none",
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }
        },
        /* @__PURE__ */ React.createElement(
          "path",
          {
            d: "M1 4l2.5 2.5L9 1",
            stroke: "white",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ),
      /* @__PURE__ */ React.createElement(
        "input",
        {
          id: checkId,
          type: "checkbox",
          checked,
          onChange: (e) => onChange?.(e.target.checked),
          disabled,
          style: {
            position: "absolute",
            opacity: 0,
            width: "100%",
            height: "100%",
            margin: 0,
            cursor: "inherit"
          }
        }
      )
    ),
    /* @__PURE__ */ React.createElement("span", { style: { font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)" } }, label)
  );
}
__ds_scope.Checkbox = Checkbox;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/core/FormField.jsx
try { (() => {
function FormField({ label, htmlFor, hint, error, required = false, children, style }) {
  const errorId = error && htmlFor ? `${htmlFor}-formfield-error` : void 0;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-1)", ...style } }, label && /* @__PURE__ */ React.createElement(
    "label",
    {
      htmlFor,
      style: { font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", opacity: 0.85 }
    },
    label,
    required && /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", style: { color: "var(--tedx-red)", marginLeft: 2 } }, "*")
  ), hint && /* @__PURE__ */ React.createElement("span", { style: { font: "var(--text-tag)", color: "var(--text-muted)" } }, hint), children, error && /* @__PURE__ */ React.createElement("span", { id: errorId, role: "alert", style: { font: "var(--text-tag)", color: "var(--tedx-red)" } }, error));
}
__ds_scope.FormField = FormField;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FormField.jsx", error: String((e && e.message) || e) }); }

// components/core/Modal.jsx
try { (() => {
function Modal({ isOpen, onClose, title, children, size = "md", hideCloseButton = false, style }) {
  const dialogRef = React.useRef(null);
  const titleId = `modal-title-${React.useId()}`;
  const maxWidths = { sm: 480, md: 640, lg: 800 };
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);
  React.useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const getFirst = () => dialogRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )[0];
    getFirst()?.focus();
    const trap = (e) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen]);
  if (!isOpen) return null;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: onClose,
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-6)",
        zIndex: 1e3
      }
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: dialogRef,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": title ? titleId : void 0,
        onClick: (e) => e.stopPropagation(),
        style: {
          background: "var(--bg-elevated)",
          borderTop: "2px solid var(--tedx-red)",
          borderRadius: "var(--radius-card)",
          width: "100%",
          maxWidth: maxWidths[size],
          padding: "var(--space-8)",
          position: "relative",
          boxShadow: "var(--shadow-card)",
          ...style
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "var(--space-6)"
          }
        },
        title && /* @__PURE__ */ React.createElement(
          "h2",
          {
            id: titleId,
            style: {
              margin: 0,
              font: "var(--text-h3)",
              color: "var(--text-primary)",
              textTransform: "uppercase",
              letterSpacing: "var(--ls-display)"
            }
          },
          title
        ),
        !hideCloseButton && /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: onClose,
            "aria-label": "Close dialog",
            style: {
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
              fontSize: 24,
              lineHeight: 1,
              padding: "var(--space-1)",
              marginLeft: "var(--space-4)",
              flex: "none"
            }
          },
          "\xD7"
        )
      ),
      /* @__PURE__ */ React.createElement("div", { style: { color: "var(--text-secondary)", font: "var(--text-body)", fontSize: 16 } }, children)
    )
  );
}
__ds_scope.Modal = Modal;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Modal.jsx", error: String((e && e.message) || e) }); }

// components/core/NavigationBar.jsx
try { (() => {
function NavigationBar({ links = [], ctaLabel, ctaHref, logoHref = "/", activePath, base = "", style }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const uid = React.useId();
  const menuId = `nav-mobile-menu-${uid}`;
  const hamburgerRef = React.useRef(null);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  const logoSrc = base + "assets/logo-tedxamsterdam-white.png";
  const linkStyle = (href) => ({
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-bold)",
    fontSize: "var(--fs-tag)",
    letterSpacing: "var(--ls-wide)",
    textTransform: "uppercase",
    color: activePath === href ? "var(--text-accent)" : "var(--text-primary)",
    textDecoration: "none"
  });
  const ctaStyle = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-bold)",
    fontSize: 14,
    padding: "12px 24px",
    background: "var(--tedx-red)",
    color: "var(--tedx-white)",
    borderRadius: "var(--radius-button)",
    textDecoration: "none",
    flex: "none",
    lineHeight: 1
  };
  return /* @__PURE__ */ React.createElement(
    "header",
    {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        background: "var(--bg-base)",
        borderBottom: "1px solid var(--border-hairline)",
        boxSizing: "border-box",
        ...style
      }
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          height: "var(--header-height)",
          display: "flex",
          alignItems: "center",
          padding: "0 var(--gutter)",
          gap: "var(--space-8)"
        }
      },
      /* @__PURE__ */ React.createElement("a", { href: logoHref, style: { display: "inline-flex", textDecoration: "none", flex: "none" } }, /* @__PURE__ */ React.createElement("img", { src: logoSrc, alt: "TEDxAmsterdam", style: { width: 160, height: "auto", display: "block" } })),
      !isMobile && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("nav", { "aria-label": "Main navigation", style: { display: "flex", alignItems: "center", gap: "var(--space-8)", marginLeft: "auto" } }, links.map((link) => /* @__PURE__ */ React.createElement("a", { key: link.href, href: link.href, "aria-current": activePath === link.href ? "page" : void 0, style: linkStyle(link.href) }, link.label))), ctaHref && ctaLabel && /* @__PURE__ */ React.createElement("a", { href: ctaHref, style: ctaStyle }, ctaLabel)),
      isMobile && /* @__PURE__ */ React.createElement(
        "button",
        {
          ref: hamburgerRef,
          type: "button",
          "aria-expanded": menuOpen,
          "aria-controls": menuId,
          "aria-label": menuOpen ? "Close menu" : "Open menu",
          onClick: () => setMenuOpen(!menuOpen),
          style: {
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
            padding: "var(--space-2)",
            display: "flex",
            alignItems: "center"
          }
        },
        /* @__PURE__ */ React.createElement("svg", { "aria-hidden": "true", width: "24", height: "18", viewBox: "0 0 24 18", fill: "none" }, menuOpen ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "2", y1: "2", x2: "22", y2: "16", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "22", y1: "2", x2: "2", y2: "16", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "0", y1: "2", x2: "24", y2: "2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "0", y1: "9", x2: "24", y2: "9", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }), /* @__PURE__ */ React.createElement("line", { x1: "0", y1: "16", x2: "24", y2: "16", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })))
      )
    ),
    isMobile && menuOpen && /* @__PURE__ */ React.createElement(
      "div",
      {
        id: menuId,
        style: {
          background: "var(--bg-base)",
          borderBottom: "1px solid var(--border-hairline)",
          padding: "var(--space-6) var(--gutter)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)"
        }
      },
      /* @__PURE__ */ React.createElement("nav", { "aria-label": "Main navigation" }, links.map((link) => /* @__PURE__ */ React.createElement(
        "a",
        {
          key: link.href,
          href: link.href,
          onClick: () => setMenuOpen(false),
          "aria-current": activePath === link.href ? "page" : void 0,
          style: { ...linkStyle(link.href), display: "block", padding: "var(--space-2) 0" }
        },
        link.label
      ))),
      ctaHref && ctaLabel && /* @__PURE__ */ React.createElement("a", { href: ctaHref, onClick: () => setMenuOpen(false), style: { ...ctaStyle, alignSelf: "flex-start" } }, ctaLabel)
    )
  );
}
__ds_scope.NavigationBar = NavigationBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/NavigationBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Radio.jsx
try { (() => {
function Radio({ legend, options = [], value, onChange, name, disabled = false, style }) {
  return /* @__PURE__ */ React.createElement(
    "fieldset",
    {
      style: {
        border: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        ...style
      }
    },
    legend && /* @__PURE__ */ React.createElement(
      "legend",
      {
        style: {
          font: "var(--text-body)",
          fontSize: 16,
          color: "var(--text-primary)",
          opacity: 0.85,
          padding: 0,
          marginBottom: "var(--space-2)"
        }
      },
      legend
    ),
    options.map((opt) => {
      const isSelected = value === opt.value;
      const radioId = `${name}-${opt.value}`;
      return /* @__PURE__ */ React.createElement(
        "label",
        {
          key: opt.value,
          htmlFor: radioId,
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-3)",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.45 : 1
          }
        },
        /* @__PURE__ */ React.createElement(
          "span",
          {
            style: {
              position: "relative",
              width: 18,
              height: 18,
              flex: "none",
              border: `1.5px solid ${isSelected ? "var(--tedx-red)" : "var(--border-hairline)"}`,
              borderRadius: "var(--radius-full)",
              background: "transparent",
              transition: "border-color var(--dur) var(--ease-standard)"
            }
          },
          isSelected && /* @__PURE__ */ React.createElement(
            "span",
            {
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 8,
                height: 8,
                borderRadius: "var(--radius-full)",
                background: "var(--tedx-red)"
              }
            }
          ),
          /* @__PURE__ */ React.createElement(
            "input",
            {
              id: radioId,
              type: "radio",
              name,
              value: opt.value,
              checked: isSelected,
              onChange: () => onChange?.(opt.value),
              disabled,
              style: {
                position: "absolute",
                opacity: 0,
                width: "100%",
                height: "100%",
                margin: 0,
                cursor: "inherit"
              }
            }
          )
        ),
        /* @__PURE__ */ React.createElement("span", { style: { font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)" } }, opt.label)
      );
    })
  );
}
__ds_scope.Radio = Radio;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Radio.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select\u2026",
  disabled = false,
  error,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const selectId = id || `select-${String(label).toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = error ? `${selectId}-error` : void 0;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style } }, label && /* @__PURE__ */ React.createElement(
    "label",
    {
      htmlFor: selectId,
      style: { font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", opacity: 0.85 }
    },
    label
  ), /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
    "select",
    {
      id: selectId,
      value: value ?? "",
      onChange: (e) => onChange?.(e.target.value),
      disabled,
      "aria-invalid": !!error,
      "aria-describedby": errorId,
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      style: {
        appearance: "none",
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${error ? "var(--tedx-red)" : focused ? "var(--tedx-red)" : "var(--border-hairline)"}`,
        paddingTop: "var(--space-2)",
        paddingBottom: "var(--space-2)",
        paddingRight: "var(--space-8)",
        paddingLeft: 0,
        font: "var(--text-body)",
        fontSize: 16,
        color: value ? "var(--text-primary)" : "var(--text-secondary)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        outline: focused ? "2px solid var(--focus-ring)" : "none",
        outlineOffset: "2px",
        transition: "border-color var(--dur) var(--ease-standard)"
      },
      ...rest
    },
    placeholder && /* @__PURE__ */ React.createElement("option", { value: "", disabled: true, hidden: true }, placeholder),
    options.map((opt) => /* @__PURE__ */ React.createElement("option", { key: opt.value, value: opt.value }, opt.label))
  ), /* @__PURE__ */ React.createElement(
    "svg",
    {
      "aria-hidden": "true",
      width: "12",
      height: "7",
      viewBox: "0 0 12 7",
      fill: "none",
      style: {
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        color: "var(--text-secondary)"
      }
    },
    /* @__PURE__ */ React.createElement("path", { d: "M1 1l5 5 5-5", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })
  )), error && /* @__PURE__ */ React.createElement("span", { id: errorId, style: { font: "var(--text-tag)", color: "var(--tedx-red)" } }, error));
}
__ds_scope.Select = Select;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function Tabs({ tabs = [], defaultIndex = 0, style }) {
  const [active, setActive] = React.useState(defaultIndex);
  const uid = React.useId();
  const tabRefs = React.useRef([]);
  const onKeyDown = (e, i) => {
    if (e.key === "ArrowRight") {
      const next = (i + 1) % tabs.length;
      setActive(next);
      tabRefs.current[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      const prev = (i - 1 + tabs.length) % tabs.length;
      setActive(prev);
      tabRefs.current[prev]?.focus();
    }
  };
  return /* @__PURE__ */ React.createElement("div", { style }, /* @__PURE__ */ React.createElement(
    "div",
    {
      role: "tablist",
      style: {
        display: "flex",
        borderBottom: "1px solid var(--border-hairline)",
        marginBottom: "var(--space-6)"
      }
    },
    tabs.map((tab, i) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: i,
        ref: (el) => tabRefs.current[i] = el,
        role: "tab",
        "aria-selected": active === i,
        "aria-controls": `tabpanel-${uid}-${i}`,
        id: `tab-btn-${uid}-${i}`,
        tabIndex: active === i ? 0 : -1,
        onClick: () => setActive(i),
        onKeyDown: (e) => onKeyDown(e, i),
        style: {
          background: "none",
          border: "none",
          borderBottom: `2px solid ${active === i ? "var(--tedx-red)" : "transparent"}`,
          marginBottom: -1,
          /* overlap the tablist hairline border */
          cursor: "pointer",
          padding: "var(--space-3) var(--space-6)",
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--weight-bold)",
          fontSize: "var(--fs-tag)",
          letterSpacing: "var(--ls-wide)",
          textTransform: "uppercase",
          color: active === i ? "var(--text-primary)" : "var(--text-secondary)",
          transition: "color var(--dur) var(--ease-standard), border-color var(--dur) var(--ease-standard)"
        }
      },
      tab.label
    ))
  ), tabs.map((tab, i) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: i,
      id: `tabpanel-${uid}-${i}`,
      role: "tabpanel",
      "aria-labelledby": `tab-btn-${uid}-${i}`,
      style: { display: active === i ? "block" : "none" }
    },
    tab.content
  )));
}
__ds_scope.Tabs = Tabs;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/Textarea.jsx
try { (() => {
function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  error,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const taId = id || `textarea-${String(label).toLowerCase().replace(/\s+/g, "-")}`;
  const errorId = error ? `${taId}-error` : void 0;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style } }, label && /* @__PURE__ */ React.createElement(
    "label",
    {
      htmlFor: taId,
      style: { font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", opacity: 0.85 }
    },
    label
  ), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      id: taId,
      value,
      onChange: (e) => onChange?.(e.target.value),
      placeholder,
      rows,
      disabled,
      "aria-invalid": !!error,
      "aria-describedby": errorId,
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      style: {
        appearance: "none",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${error ? "var(--tedx-red)" : focused ? "var(--tedx-red)" : "var(--border-hairline)"}`,
        padding: "var(--space-2) 0",
        font: "var(--text-body)",
        fontSize: 16,
        color: "var(--text-primary)",
        resize: "vertical",
        cursor: disabled ? "not-allowed" : "auto",
        opacity: disabled ? 0.45 : 1,
        outline: focused ? "2px solid var(--focus-ring)" : "none",
        outlineOffset: "2px",
        transition: "border-color var(--dur) var(--ease-standard)",
        fontFamily: "var(--font-sans)"
      },
      ...rest
    }
  ), error && /* @__PURE__ */ React.createElement("span", { id: errorId, style: { font: "var(--text-tag)", color: "var(--tedx-red)" } }, error));
}
__ds_scope.Textarea = Textarea;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/core/Toast.jsx
try { (() => {
function Toast({ message, type = "info", duration = 4e3, onDismiss, style }) {
  const [visible, setVisible] = React.useState(false);
  const onDismissRef = React.useRef(onDismiss);
  React.useEffect(() => {
    onDismissRef.current = onDismiss;
  });
  React.useEffect(() => {
    const enter = setTimeout(() => setVisible(true), 16);
    if (duration > 0) {
      const dismiss = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onDismissRef.current?.(), 300);
      }, duration);
      return () => {
        clearTimeout(enter);
        clearTimeout(dismiss);
      };
    }
    return () => clearTimeout(enter);
  }, [duration]);
  const isUrgent = type === "error" || type === "warning";
  const accentColor = isUrgent ? "var(--tedx-red)" : "var(--tedx-white)";
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      role: isUrgent ? "alert" : "status",
      "aria-live": isUrgent ? "assertive" : "polite",
      style: {
        position: "fixed",
        bottom: "var(--space-6)",
        right: "var(--space-6)",
        maxWidth: 360,
        background: "var(--bg-elevated)",
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: "var(--radius-card)",
        padding: "var(--space-4) var(--space-6)",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-4)",
        zIndex: 1100,
        transform: visible ? "translateX(0)" : "translateX(calc(100% + var(--space-6)))",
        opacity: visible ? 1 : 0,
        transition: "transform var(--dur-slow) var(--ease-out), opacity var(--dur) var(--ease-standard)",
        ...style
      }
    },
    /* @__PURE__ */ React.createElement("p", { style: { margin: 0, font: "var(--text-body)", fontSize: 16, color: "var(--text-primary)", flex: 1 } }, message),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => {
          setVisible(false);
          setTimeout(() => onDismissRef.current?.(), 300);
        },
        "aria-label": "Dismiss notification",
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          fontSize: 18,
          lineHeight: 1,
          padding: 0,
          flex: "none"
        }
      },
      "\xD7"
    )
  );
}
__ds_scope.Toast = Toast;
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toast.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.FormField = __ds_scope.FormField;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.NavigationBar = __ds_scope.NavigationBar;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Toast = __ds_scope.Toast;
__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.ArrowLink = __ds_scope.ArrowLink;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.MediaCard = __ds_scope.MediaCard;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.SocialLink = __ds_scope.SocialLink;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

})();
