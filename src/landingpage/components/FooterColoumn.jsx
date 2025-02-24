import { Link } from "react-router-dom";

function FooterColumn({ title, items }) {
  return (
    <div className="flex flex-col gap-2 text-white">
      <h4 className="text-lg font-bold">{title}</h4>
      {items.map((item, index) => {
        if (item.link.startsWith("mailto:")) {
          return (
            <a key={index} href={item.link} className="text-gray-300 hover:text-white">
              {item.text}
            </a>
          );
        } else if (item.link.startsWith("http")) {
          return (
            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              {item.text}
            </a>
          );
        } else {
          return (
            <Link key={index} to={item.link} className="text-gray-300 hover:text-white">
              {item.text}
            </Link>
          );
        }
      })}
    </div>
  );
}

export default FooterColumn;
