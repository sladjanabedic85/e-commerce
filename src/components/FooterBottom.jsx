import SocialIcons from './SocialIcons.jsx';

function FooterBottom() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 border-t px-4 py-4 text-sm text-muted-foreground md:flex-row">
      <span className="flex items-center gap-2">
        Designed and developed by:
        <a href="#"><img className="h-6" src="/images/ITAcademy.png" alt="IT Academy" /></a>
      </span>
      <SocialIcons />
    </div>
  );
}

export default FooterBottom;