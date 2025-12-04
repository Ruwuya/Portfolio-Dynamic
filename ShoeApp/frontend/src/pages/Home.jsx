export default function Home() {
  return (
    <div className="page home-page">
      <div className="home-content">
        <h1>Home</h1>
        <p>
          Welcome to my Shoe Web App. The purpose of this project is to show the
          frequency of each shoe size based on the users stored in the
          database. The website can collect a user's name, email, age, and shoe
          size. For demonstration purposes, the database has been seeded
          with around 100 dummy users.
        </p>
        <p>
          <strong>Home</strong> — This page displays general information and
          documentation about the project.<br />
          <strong>Users</strong> — The page contains two panels: a list of all
          users on the left, and a form to add new users on the right.<br />
          <strong>Chart</strong> — This page displays a bar chart generated with
          Google Charts using data retrieved from the database.
        </p>
        <p>
          The frontend is built using the <strong>React</strong> framework.
          The backend is written in <strong>PHP</strong> and the database is
          powered by <strong>MySQL</strong>.
        </p>
        <ul className="custom-list">
          <li>addUsers.php - Handles user insertion.</li>
          <li>getUsers.php - Loads users from the database.</li>
          <li>getShoeSizes.php - Loads shoe sizes from lookup table.</li>
          <li>getChartData.php - Returns aggregated data for charts.</li>
        </ul>

        <p>
          The colour palette was selected using{" "}
          <a href="https://colorhunt.co" target="_blank">
            ColorHunt
          </a>, and the diagrams were created using{" "}
          <a href="https://app.diagrams.net" target="_blank">
            Draw.io
          </a>.
        </p>
      </div>
    </div>
  );
}