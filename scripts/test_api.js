async function test() {
  const res = await fetch('http://localhost:3000/api/generate-career', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'Blockchain Engineer' })
  });
  const data = await res.json();
  console.log(JSON.stringify(data.time_to_first_payment, null, 2));
}
test();
