const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

function calculate(a, b, operator) {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/":
      if (b === 0) throw new Error("Cannot divide by zero");
      return a / b;
    case "%": return a % b;
    case "^": return Math.pow(a, b);
    default:
      throw new Error("Unsupported operator: " + operator);
  }
}

app.post("/api/calculate", (req, res) => {
  const { a, b, operator } = req.body || {};
  const x = Number(a);
  const y = Number(b);

  if (a === undefined || b === undefined || !Number.isFinite(x) || !Number.isFinite(y)) {
    return res.status(400).json({ error: "Please send two valid numbers" });
  }

  try {
    const raw = calculate(x, y, operator);
    const result = Number(raw.toPrecision(12));
    console.log(`${x} ${operator} ${y} = ${result}`);
    res.json({ a: x, b: y, operator, result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});