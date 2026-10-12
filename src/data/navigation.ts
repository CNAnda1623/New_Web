import { internalLinks, sungrowUrl } from "@/lib/links";

export interface NavLink {
  label: string;
  href: string;
  isLocal?: boolean;
}

export interface MegaMenuColumn {
  title: string;
  links: NavLink[];
}

export interface MegaMenuItem {
  id: string;
  label: string;
  href?: string;
  isDirectLink?: boolean;
  columns?: MegaMenuColumn[];
}

export const navigationItems: MegaMenuItem[] = [
  {
    id: "for-home",
    label: "For Home",
    columns: [
      {
        title: "Solutions & Cases",
        links: [
          {
            label: "Residential PV+ESS+EV Charging Solution",
            href: internalLinks.residentialSolution,
            isLocal: true,
          },
          {
            label: "Residential PV Solution",
            href: sungrowUrl("solutions-residential"),
          },
          {
            label: "Cases & Stories",
            href: sungrowUrl("cases-homeowners"),
          },
        ],
      },
      {
        title: "How to Buy",
        links: [
          {
            label: "Home Energy Estimator",
            href: sungrowUrl("energy-estimator"),
          },
          {
            label: "Find a Distributor",
            href: sungrowUrl("find-a-distributor"),
          },
        ],
      },
      {
        title: "Support",
        links: [
          {
            label: "For Home Support",
            href: sungrowUrl("support/home"),
          },
          {
            label: "Product Documentation",
            href: sungrowUrl("support/documentation"),
          },
          {
            label: "iSolarCloud",
            href: sungrowUrl("isolarcloud"),
          },
          {
            label: "iEnergyCharge",
            href: sungrowUrl("ienergycharge"),
          },
          {
            label: "FAQs",
            href: sungrowUrl("faqs"),
          },
          {
            label: "Warranty",
            href: sungrowUrl("warranty"),
          },
        ],
      },
    ],
  },
  {
    id: "for-business",
    label: "For Business",
    columns: [
      {
        title: "Solutions & Cases",
        links: [
          {
            label: "C&I PV Solution",
            href: internalLinks.ciPvSolution,
            isLocal: true,
          },
          {
            label: "C&I PV+ESS+EV Charging Solution",
            href: sungrowUrl("solution/ci-pv-ess-ev-charging"),
          },
          {
            label: "Cases & Stories",
            href: sungrowUrl("cases-business"),
          },
        ],
      },
      {
        title: "How to Buy",
        links: [
          {
            label: "Find a Distributor",
            href: sungrowUrl("find-a-distributor"),
          },
        ],
      },
      {
        title: "Support",
        links: [
          {
            label: "For Business Support",
            href: sungrowUrl("support/business"),
          },
          {
            label: "Product Documentation",
            href: sungrowUrl("support/documentation"),
          },
          {
            label: "iSolarCloud",
            href: sungrowUrl("isolarcloud"),
          },
          {
            label: "FAQs",
            href: sungrowUrl("faqs"),
          },
          {
            label: "Warranty",
            href: sungrowUrl("warranty"),
          },
        ],
      },
    ],
  },
  {
    id: "for-utility",
    label: "For Utility",
    columns: [
      {
        title: "Business Area",
        links: [
          {
            label: "PV System",
            href: sungrowUrl("utility/pv-system"),
          },
          {
            label: "Energy Storage System",
            href: sungrowUrl("utility/storage-system"),
          },
          {
            label: "Floating PV System",
            href: sungrowUrl("utility/floating-pv"),
          },
          {
            label: "Wind",
            href: sungrowUrl("utility/wind"),
          },
          {
            label: "Hydrogen",
            href: sungrowUrl("utility/hydrogen"),
          },
        ],
      },
      {
        title: "Support",
        links: [
          {
            label: "Product Documentation",
            href: sungrowUrl("support/documentation"),
          },
          {
            label: "FAQs",
            href: sungrowUrl("faqs"),
          },
        ],
      },
      {
        title: "Success Stories",
        links: [
          {
            label: "Cases & Stories",
            href: sungrowUrl("cases-utility"),
          },
        ],
      },
    ],
  },
  {
    id: "partners",
    label: "Partners",
    columns: [
      {
        title: "Installers",
        links: [
          {
            label: "Sungrow for Installers",
            href: sungrowUrl("partners/installers"),
          },
          {
            label: "Become an Installer",
            href: sungrowUrl("partners/become-installer"),
          },
          {
            label: "Solutions for Home/Business",
            href: internalLinks.residentialSolution,
            isLocal: true,
          },
          {
            label: "Cases",
            href: sungrowUrl("cases-installers"),
          },
        ],
      },
      {
        title: "Distributors",
        links: [
          {
            label: "Find a Distributor",
            href: sungrowUrl("find-a-distributor"),
          },
          {
            label: "Become a Distributor",
            href: sungrowUrl("partners/become-distributor"),
          },
        ],
      },
      {
        title: "Support & Resources",
        links: [
          {
            label: "Installer Support",
            href: sungrowUrl("support/installer"),
          },
          {
            label: "Installation Videos",
            href: sungrowUrl("installation-videos"),
          },
          {
            label: "Product Documentation",
            href: sungrowUrl("support/documentation"),
          },
          {
            label: "iSolarCloud",
            href: sungrowUrl("isolarcloud"),
          },
          {
            label: "Warranty",
            href: sungrowUrl("warranty"),
          },
        ],
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    columns: [
      {
        title: "PV Inverter",
        links: [
          {
            label: "String Inverter",
            href: sungrowUrl("products/string-inverter"),
          },
          {
            label: "Modular Inverter",
            href: sungrowUrl("products/modular-inverter"),
          },
          {
            label: "MLPE",
            href: sungrowUrl("products/mlpe"),
          },
          {
            label: "Accessory",
            href: sungrowUrl("products/accessory"),
          },
        ],
      },
      {
        title: "Energy Storage System",
        links: [
          {
            label: "Commercial & Industrial ESS",
            href: sungrowUrl("products/ci-ess"),
          },
          {
            label: "Utility ESS",
            href: sungrowUrl("products/utility-ess"),
          },
        ],
      },
      {
        title: "Smart Energy Products",
        links: [
          {
            label: "iSolarCloud Platform",
            href: sungrowUrl("products/isolarcloud"),
          },
          {
            label: "EV Charger",
            href: sungrowUrl("products/ev-charger"),
          },
        ],
      },
    ],
  },
  {
    id: "service-support",
    label: "Service & Support",
    columns: [
      {
        title: "Sungrow Service",
        links: [
          {
            label: "Service Brand",
            href: sungrowUrl("service-brand"),
          },
          {
            label: "Service Stories",
            href: sungrowUrl("service-stories"),
          },
        ],
      },
      {
        title: "Support for You",
        links: [
          {
            label: "Installers Support",
            href: sungrowUrl("support/installer"),
          },
          {
            label: "Homeowners Support",
            href: sungrowUrl("support/home"),
          },
          {
            label: "Business Owners Support",
            href: sungrowUrl("support/business"),
          },
        ],
      },
      {
        title: "Resources",
        links: [
          {
            label: "Product Documentation",
            href: sungrowUrl("support/documentation"),
          },
          {
            label: "FAQs",
            href: sungrowUrl("faqs"),
          },
          {
            label: "Warranty",
            href: sungrowUrl("warranty"),
          },
        ],
      },
    ],
  },
  {
    id: "sustainability",
    label: "Sustainability",
    href: internalLinks.sustainability,
    isDirectLink: true,
  },
  {
    id: "about-us",
    label: "About Us",
    columns: [
      {
        title: "About Sungrow",
        links: [
          {
            label: "Brand Story",
            href: internalLinks.brandStory,
            isLocal: true,
          },
          {
            label: "Contact Sungrow",
            href: sungrowUrl("about-us/contact-us"),
          },
        ],
      },
      {
        title: "News and Media",
        links: [
          {
            label: "News",
            href: sungrowUrl("news"),
          },
          {
            label: "Events",
            href: sungrowUrl("events"),
          },
          {
            label: "Sungrow Campaign",
            href: sungrowUrl("campaign"),
          },
          {
            label: "White Paper",
            href: sungrowUrl("white-paper"),
          },
        ],
      },
      {
        title: "Investors & Corporate",
        links: [
          {
            label: "Overview",
            href: sungrowUrl("investors/overview"),
          },
          {
            label: "Corporate Governance",
            href: sungrowUrl("investors/governance"),
          },
          {
            label: "Financial Reports",
            href: sungrowUrl("investors/reports"),
          },
          {
            label: "Career",
            href: sungrowUrl("about/career"),
          },
          {
            label: "Sungrow Foundation",
            href: sungrowUrl("foundation"),
          },
        ],
      },
    ],
  },
];
