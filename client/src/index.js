const query = `
  query {
    totalDays
  }
`;

console.log("querying the count");
fetch("http://localhost:4000", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
})
  .then(res => res.json())
  .then(({ data }) => `totalDays: ${data.totalDays}`)
  .then(console.log)
  .catch(console.error);
