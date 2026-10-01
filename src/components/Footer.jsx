import FooterColumn from './FooterColumn.jsx';
import FooterBottom from './FooterBottom.jsx';

const footerColumns = [
  { title: 'SHOP', links: ['Dresses', 'Jackets', 'Skirts', 'Shoes & Bags', 'Gift Cards', 'Sales & Offers'] },
  { title: 'INFORMATION', links: ['About', 'Terms and Conditions', 'Privacy Policy', 'Delivery and Return'] },
  { title: 'CUSTOMER SUPPORT', links: ['Contact', 'Help', 'FAQ'] },
];

function Footer() {
  return (
    <footer className="mt-12 border-t bg-neutral-50">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        {footerColumns.map((column) => (
          <FooterColumn key={column.title} title={column.title} links={column.links} />
        ))}
      </div>

      <FooterBottom />
    </footer>
  );
}

export default Footer;