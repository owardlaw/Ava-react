import "./Modal.css";
import Button from '@mui/material/Button';

function Modal() {
  function closeModal() {
    document.querySelector(".Modal-container").style.display = "none";
  }

  return (
    <div className="Modal-container">
      <div className="Modal-overlay"></div>

      <div className="Modal">
        <div className="intro">
          <h1>GPT Clone</h1>
          <p>
            This is a clone of the OpenAI GPT-3.5 Playground. It is a web app
            that uses the OpenAI API to generate text based on user input.
          </p>
        </div>
        <div className="stack">
          <div className="stack-line">
            <h3>Frontend</h3>
            <ul>
              <li>React</li>
              <li>Redux</li>
              <li>Axios</li>
            </ul>
          </div>

          <div className="stack-line">
            <h3>Backend</h3>
            <ul>
              <li>HTTPS Nginx Web Server</li>
              <li>GPT-3.5 Turbo Model</li>
              <li>AWS EC2</li>
              <li>Flask</li>
              <li>Gunicorn WSGI</li>
              <li>IP Binding</li>
              <li>Route 53</li>
              <li>OpenAI API</li>
            </ul>
          </div>
        </div>

        <Button variant="contained" className="Modal-close" onClick={closeModal}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Modal;
