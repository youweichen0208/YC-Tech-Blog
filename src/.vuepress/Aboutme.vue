<template>
  <div class="container">
    <div class="profile section">
      <img src="/assets/images/me.jpg" alt="my photo" />
      <div class="profile-section">
        <h3><strong>Name:</strong> Youwei Chen</h3>
        <p><strong>Email:</strong> youweichen0208@gmail.com</p>
        <p><strong>Phone number:</strong> (540)998-2074</p>
      </div>
    </div>
    <div class="education section">
      <h1>Education:</h1>
      <p>
        I am a dedicated and accomplished individual with a strong academic
        foundation in <strong>Computer Science</strong>, having pursued both my
        <strong>Bachelor</strong>'s (2018-2022) and <strong>Master</strong>'s
        (2022-2023) degrees at <strong>Virginia Tech</strong> in Blacksburg, VA.
      </p>
    </div>
    <div class="experience section">
      <h1>Professional Experience:</h1>
      <section>
        <h3>
          Software Engineer Intern, Tencent Technology( May 2019 - Oct 2019 )
        </h3>
        <ul>
          <li>
            Developed a business-to-consumer shopping platform for customers to
            browse and purchase items.
          </li>
          <li>
            Used <strong>Swagger2</strong> for the web service
            <strong>RESTful API</strong>
            design to document and test the functions, increasing the team
            efﬁciency by <strong>25%</strong>.
          </li>
          <li>
            Coordinated with experienced engineers to create SQL statements to
            perform business operations.
          </li>
        </ul>
      </section>
    </div>
    <div class="projects">
      <h1>Projects:</h1>
      <section>
        <h3>Secondhand e-commerce website:</h3>
        <ul>
          <li>
            Using <strong>React.js</strong> to build E-commerce website frontend
            like sign-in form, shopping cart, and etc.
          </li>
          <li>
            <strong>MySQL</strong> and <strong>Express.js</strong> to save and
            retrieve data like products, orders, and users.
          </li>
          <li>
            Using third party API like <strong>MailGun</strong>,
            <strong>PayPal</strong> to implement website's email verification
            and transaction functionalities.
          </li>
          <li>
            Deployed web applications on cloud servers like
            <strong>Heroku</strong>.
          </li>
        </ul>
      </section>

      <section>
        <h3>Campus Jobs website:</h3>
        <ul>
          <li>
            Developed a dynamic web page to provide Virginia graduate students
            with job opportunities.
          </li>
          <li>
            Built a <strong>MySQL</strong> database to store the employers and
            students information.
          </li>
          <li>
            Created <strong>Java Servlet</strong> as the controller to handle
            the HTTP requests and responses.
          </li>
          <li>
            Deployed and hosted the website on Virginia Tech's server
            (cs.vt.edu).
          </li>
        </ul>
      </section>

      <section>
        <h3>Online Bookstore website</h3>
        <ul>
          <li>
            Developed a data-centric web application using HTML, CSS, and
            Javascript to create an online bookstore.
          </li>
          <li>
            Implemented features including user authentication and
            authorization, session handling, resource management, and user
            history using OAuth and Pinia.
          </li>
          <li>
            Used <strong>REST APIs</strong> and the
            <strong>DAO pattern</strong> to create dynamically-generated web
            content.
          </li>
          <li>
            Analyzed security issues related to web-based systems such as
            authentication, authorization, confidentiality, and data integrity.
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutMe",
  // Add your component logic here
};
</script>

<style scoped>
/* Modern, responsive design */
.container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
}

.section {
  background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.section:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.profile {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
}

.profile img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #667eea;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.profile img:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

.profile-section h3 {
  color: #2563eb;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.profile-section p {
  margin: 0.5rem 0;
  color: #475569;
  font-size: 1.05rem;
}

.education h1,
.experience h1,
.projects h1 {
  color: #1e293b;
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.education p {
  color: #475569;
  font-size: 1.1rem;
  line-height: 1.8;
}

section {
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background: white;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

section h3 {
  color: #2563eb;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

section ul {
  list-style: none;
  padding: 0;
}

section li {
  padding: 0.5rem 0;
  color: #475569;
  line-height: 1.7;
  position: relative;
  padding-left: 1.5rem;
}

section li::before {
  content: "▹";
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

section strong {
  color: #2563eb;
  font-weight: 600;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .profile {
    flex-direction: column;
    text-align: center;
  }

  .profile img {
    width: 150px;
    height: 150px;
  }

  .section {
    padding: 1.5rem;
  }

  .education h1,
  .experience h1,
  .projects h1 {
    font-size: 1.5rem;
  }
}
</style>
