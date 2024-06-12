import { PieChart } from "@mui/x-charts/PieChart";

function Home() {
  return (
    <div>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Sneakers" },
              { id: 1, value: 15, label: "Running" },
              { id: 2, value: 20, label: "Formals" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}

export default Home;
