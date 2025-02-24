import FooterColumn from "./FooterColoumn";
import FooterBottomSection from "./FooterBottomSection";

const productItems = [
  { text: "Pricing", link: "#" },
  { text: "Overview", link: "#" },
  { text: "Browse", link: "#" },
];

const resourcesItems = [
  { text: "Help Center", link: "mailto:helpcenter@gmail.com?subject=Need%20Help&body=Hello,%20I%20need%20assistance%20with..." },
];

const supportItems = [
  { text: "Contact Us", link: "https://wa.me/919876543210" },
];

const companyItems = [
  { text: "About", link: "/about" },
  {
    text: "Request Demo",
    link: "#",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff2580a220922f3f63a2439b0c80c65a4bf6619d5c2b997d245427d942cb773e?placeholderIfAbsent=true&apiKey=acdba41aa2944c3882a28ccbc21fcf8a",
  },
];

function Footer() {
  return (
    <footer className="flex flex-col justify-center px-20 w-full bg-slate-900 max-md:px-5 max-md:max-w-full" role="contentinfo">
      <div className="flex flex-wrap gap-10 items-start py-12 w-full border-b border-solid border-b-slate-700 max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink text-3xl font-bold leading-none text-white whitespace-nowrap basis-0">
          <div className="flex flex-col w-full">
            <div className="gap-0.5 self-stretch w-full">Learn&Grow</div>
          </div>
        </div>
        <FooterColumn title="Product" items={productItems} />
        <FooterColumn title="Resources" items={resourcesItems} />
        <FooterColumn title="Support" items={supportItems} />
        <FooterColumn title="Company" items={companyItems} />
      </div>
      <FooterBottomSection />
    </footer>
  );
}

export default Footer;
