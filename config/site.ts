export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Brownyrollz CDN",
  description: "Make beautiful websites to coppy cdn your website",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    }
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/brownyrollz/cdn",
    docs: "https://wiki.brownyrollz.in.th/cdn",
    discord: "https://brownyrollz.in.th/discord",
    sponsor: "https://brownyrollz.in.th/sponsor",
  },
};
