function FooterColumn({ title, links }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold tracking-wide">{title}</h4>
      <ul className="flex flex-col gap-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterColumn;