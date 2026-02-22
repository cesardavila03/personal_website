export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>© {new Date().getFullYear()} Cesar Davila</p>
        <div className="footer-links">
          <a href="https://github.com/cesardavila03" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/cesardavila03" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
