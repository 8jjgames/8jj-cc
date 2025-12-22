import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">

        <a className="brand logo-left" href="/">
          <img
            className="brand-logo"
            src="/images/8JJ LOGO.png"
            alt="8JJ Logo"
          />
        </a>

        <div className="actions-right">
          <a className="brand" href="#">
            <img
              className="small-icon"
              src="/images/Download.png"
              alt="Download"
            />
          </a>

          <button className="brand icon-button">
            <img
              className="small-icon"
              src="/images/Share.png"
              alt="Share"
            />
          </button>
        </div>

      </div>
    </header>
  );
}
