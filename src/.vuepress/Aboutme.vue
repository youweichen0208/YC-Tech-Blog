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
/* Add your component styles here */
.section {
  border-bottom: 1px solid lightgrey;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.container {
  display: flex;
  flex-direction: column;
}

.profile {
  display: flex;
  flex-direction: row;
  gap: 3vw;
}

.profile img {
  width: 20vw;
}
</style>
