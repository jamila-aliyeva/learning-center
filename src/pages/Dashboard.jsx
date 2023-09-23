import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <section>
      <div
        className="dashboard-wrapper"
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
        }}>
        <Link
          to="/teachers"
          className="dashboard-card"
          style={{
            boxShadow: "0 0 6px grey",
            padding: "40px 60px",
            borderRadius: "9px",
          }}>
          <h2 style={{ color: "#FF0088", fontSize: "26px" }}>13</h2>
          <h4 style={{ color: "#3A0BE3", fontSize: "28px" }}>Total Teachers</h4>
        </Link>
        <Link
          to="/students"
          className="dashboard-card"
          style={{
            boxShadow: "0 0 6px grey",
            padding: "40px 60px",
            borderRadius: "9px",
          }}>
          <h2 style={{ color: "#FF0088", fontSize: "26px" }}>100</h2>
          <h4 style={{ color: "#3A0BE3", fontSize: "28px" }}>Total Students</h4>
        </Link>
      </div>

      <div>
        <h2>Dashboard</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
          exercitationem omnis adipisci est corporis quidem culpa soluta sunt
          quia. Inventore asperiores repellat totam ut quod est, alias natus
          explicabo praesentium fugiat et impedit quibusdam at voluptatum ex sit
          eveniet consectetur temporibus nemo, doloribus amet. Perferendis quo
          quis laudantium, et eveniet incidunt ratione autem excepturi aperiam
          consequatur debitis cum voluptates reiciendis consectetur libero
          dolorem eaque commodi laborum? Voluptate perferendis culpa eaque nobis
          repudiandae blanditiis facilis consequuntur aspernatur illum provident
          laudantium tempora porro quis, aperiam labore minima odio debitis
          facere ipsam voluptatibus quos! Inventore doloremque minima quisquam
          cum iusto deserunt alias! Repellat.
        </p>
        <br />
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
          praesentium molestiae magnam blanditiis, obcaecati consectetur aliquid
          corrupti iste, culpa, neque eveniet vero repellendus fugit iure.
          Adipisci, necessitatibus. Molestiae veniam consequatur iusto nisi.
          Dolores magni iure officia incidunt, voluptatem et provident! Quam,
          officia veritatis, magnam commodi earum velit labore sunt dignissimos
          laudantium maiores similique nobis unde ex error ea et quae. Hic vero
          earum fuga aspernatur provident pariatur mollitia nostrum, in
          recusandae! Quam labore nihil expedita obcaecati fugit atque,
          molestiae minima id. Nemo atque hic expedita aspernatur eum? Excepturi
          vero similique minus aliquam omnis, quod facilis, maxime delectus,
          obcaecati nemo ipsam?
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
